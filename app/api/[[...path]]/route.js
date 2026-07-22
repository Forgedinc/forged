import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { PRODUCTS, getProductBySlug } from '@/lib/products'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'forged'

let cachedClient = null
async function getDb() {
  if (!MONGO_URL) return null
  if (!cachedClient) {
    try {
      cachedClient = new MongoClient(MONGO_URL, { serverSelectionTimeoutMS: 2000 })
      await cachedClient.connect()
    } catch (e) {
      cachedClient = null
      return null
    }
  }
  return cachedClient.db(DB_NAME)
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function json(data, init = {}) {
  return NextResponse.json(data, { ...init, headers: { ...(init.headers || {}), ...cors } })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors })
}

export async function GET(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')

  if (route === '' || route === 'root') {
    return json({ ok: true, name: 'FORGED API', drop: '2026-09-09' })
  }

  if (route === 'products') {
    return json({ products: PRODUCTS })
  }

  if (p[0] === 'products' && p[1]) {
    const product = getProductBySlug(p[1])
    if (!product) return json({ error: 'Not found' }, { status: 404 })
    return json({ product })
  }

  if (route === 'countdown') {
    const target = new Date('2026-09-09T00:00:00Z').getTime()
    return json({ target, now: Date.now() })
  }

  return json({ error: 'Route not found' }, { status: 404 })
}

export async function POST(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')

  if (route === 'gate') {
    const body = await request.json().catch(() => ({}))
    const ok = (body.password || '').trim().toLowerCase() === 'forged001'
    return json({ ok })
  }

  if (route === 'checkout') {
    const body = await request.json().catch(() => ({}))
    const items = Array.isArray(body.items) ? body.items : []
    const customer = body.customer || {}
    if (items.length === 0) return json({ error: 'Cart is empty' }, { status: 400 })

    // Validate items exist and are in stock
    const validated = []
    for (const it of items) {
      const prod = getProductBySlug(it.slug)
      if (!prod) return json({ error: `Unknown product: ${it.slug}` }, { status: 400 })
      if (prod.stock === 0) return json({ error: `${prod.name} is sold out` }, { status: 400 })
      const qty = Math.max(1, Math.min(parseInt(it.quantity) || 1, prod.stock))
      validated.push({ slug: prod.slug, name: prod.name, price: prod.price, size: it.size, quantity: qty })
    }
    const subtotal = validated.reduce((s, it) => s + it.price * it.quantity, 0)
    const shipping = subtotal >= 200 ? 0 : 15
    const tax = Math.round(subtotal * 0.21)
    const total = subtotal + shipping + tax

    const orderId = `FRG-${uuidv4().slice(0, 8).toUpperCase()}`

    // Save order (best-effort)
    try {
      const db = await getDb()
      if (db) {
        await db.collection('orders').insertOne({
          orderId, items: validated, customer, subtotal, shipping, tax, total,
          status: 'pending', createdAt: new Date()
        })
      }
    } catch (e) { /* non-blocking */ }

    // Stripe Checkout integration
    const STRIPE_KEY = process.env.STRIPE_SECRET_KEY
    if (STRIPE_KEY && STRIPE_KEY.startsWith('sk_')) {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || `${new URL(request.url).origin}`
        const line_items = validated.map(it => ({
          quantity: it.quantity,
          price_data: {
            currency: 'eur',
            unit_amount: it.price * 100,
            product_data: { name: `${it.name} · ${it.size}` }
          }
        }))
        if (shipping > 0) {
          line_items.push({ quantity: 1, price_data: { currency: 'eur', unit_amount: shipping * 100, product_data: { name: 'Shipping' } } })
        }
        const form = new URLSearchParams()
        form.append('mode', 'payment')
        form.append('success_url', `${base}/success?session_id={CHECKOUT_SESSION_ID}&order=${orderId}`)
        form.append('cancel_url', `${base}/cancel`)
        form.append('customer_email', customer.email || '')
        form.append('metadata[orderId]', orderId)
        line_items.forEach((li, i) => {
          form.append(`line_items[${i}][quantity]`, String(li.quantity))
          form.append(`line_items[${i}][price_data][currency]`, li.price_data.currency)
          form.append(`line_items[${i}][price_data][unit_amount]`, String(li.price_data.unit_amount))
          form.append(`line_items[${i}][price_data][product_data][name]`, li.price_data.product_data.name)
        })
        const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${STRIPE_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString()
        })
        const data = await r.json()
        if (!r.ok) return json({ error: data.error?.message || 'Stripe error' }, { status: 500 })
        return json({ url: data.url, orderId })
      } catch (e) {
        return json({ error: 'Stripe checkout failed: ' + e.message }, { status: 500 })
      }
    }

    // Fallback: mock success (no Stripe key configured)
    return json({ orderId, total, mock: true })
  }

  return json({ error: 'Route not found' }, { status: 404 })
}
