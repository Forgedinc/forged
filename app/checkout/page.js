'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'
import { Lock } from 'lucide-react'

function Checkout() {
  const router = useRouter()
  const { items, subtotal, hydrated, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '',
    city: '', province: '', postal: '', country: 'ES'
  })

  useEffect(() => {
    if (hydrated && items.length === 0) {
      // don't force redirect — show empty state
    }
  }, [hydrated, items.length])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const shipping = subtotal >= 200 ? 0 : 15
  const tax = Math.round(subtotal * 0.21)
  const total = subtotal + shipping + tax

  const submit = async (e) => {
    e.preventDefault()
    if (items.length === 0) { toast.error('Your cart is empty'); return }
    for (const key of ['firstName','lastName','email','address','city','province','postal','country']) {
      if (!form[key]) { toast.error('Complete all fields'); return }
    }
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: form })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) {
        window.location.href = data.url
      } else {
        clear()
        router.push(`/success?order=${data.orderId}`)
      }
    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white grain">
      <Navbar />
      <div className="pt-28 md:pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Secure Checkout</div>
            <h1 className="font-display text-5xl md:text-7xl leading-none">Checkout.</h1>
          </motion.div>

          {items.length === 0 && hydrated ? (
            <div className="mt-16 text-center">
              <div className="font-mono-ui text-xs uppercase text-white/40 mb-6">Your bag is empty.</div>
              <Link href="/shop" className="inline-block px-6 py-3 border border-white/40 hover:bg-white hover:text-black transition font-mono-ui text-xs uppercase tracking-widest">Return to shop</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-12 grid md:grid-cols-5 gap-10">
              {/* Form */}
              <div className="md:col-span-3 space-y-8">
                <section>
                  <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Contact</div>
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                </section>

                <section>
                  <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Shipping</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
                    <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
                  </div>
                  <Field label="Address" name="address" value={form.address} onChange={handleChange} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" name="city" value={form.city} onChange={handleChange} />
                    <Field label="Province / State" name="province" value={form.province} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Postal code" name="postal" value={form.postal} onChange={handleChange} />
                    <div className="pt-4">
                      <label className="block font-mono-ui text-[10px] uppercase text-white/40 tracking-widest mb-2">Country</label>
                      <select name="country" value={form.country} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm">
                        {['ES','PT','FR','IT','DE','NL','BE','GB','US','CA','JP','AU'].map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                      </select>
                    </div>
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-white text-black hover:bg-white/90 disabled:opacity-50 transition font-mono-ui text-xs uppercase tracking-mega flex items-center justify-center gap-3"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {loading ? 'Processing…' : `Pay Now · ${formatPrice(total)}`}
                </button>
                <p className="text-center font-mono-ui text-[10px] uppercase text-white/30 tracking-widest">Secured by Stripe · SSL encrypted</p>
              </div>

              {/* Summary */}
              <aside className="md:col-span-2">
                <div className="border border-white/10 p-6 sticky top-28">
                  <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Order · {items.length} item{items.length !== 1 ? 's' : ''}</div>
                  <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {items.map(it => (
                      <li key={it.key} className="flex gap-3">
                        <div className="relative w-16 h-20 bg-white/5 shrink-0 overflow-hidden">
                          <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-[10px] font-mono-ui flex items-center justify-center">{it.quantity}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-sm truncate">{it.name}</div>
                          <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">Size {it.size}</div>
                        </div>
                        <div className="font-mono-ui text-sm tabular-nums">{formatPrice(it.price * it.quantity)}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 mt-6 pt-4 space-y-2 text-sm">
                    <Row label="Subtotal" value={formatPrice(subtotal)} />
                    <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
                    <Row label="Tax (21%)" value={formatPrice(tax)} />
                  </div>
                  <div className="border-t border-white/10 mt-4 pt-4 flex items-baseline justify-between">
                    <span className="font-mono-ui text-xs uppercase tracking-widest">Total</span>
                    <span className="font-display text-3xl tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>
              </aside>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

function Field({ label, name, type='text', value, onChange }) {
  return (
    <div className="pt-4">
      <label className="block font-mono-ui text-[10px] uppercase text-white/40 tracking-widest mb-2">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm placeholder:text-white/20 transition"
      />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">{label}</span>
      <span className="font-mono-ui tabular-nums">{value}</span>
    </div>
  )
}

export default Checkout
