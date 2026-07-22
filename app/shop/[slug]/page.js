'use client'
import { useState, useMemo, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { getProductBySlug, PRODUCTS, SIZES } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Minus, Plus, ZoomIn } from 'lucide-react'

function hasAccess() {
  if (typeof document === 'undefined') return true
  return document.cookie.split(';').some(c => c.trim().startsWith('forged_access=1'))
}

function ProductPage() {
  const { slug } = useParams()
  const router = useRouter()
  const product = useMemo(() => getProductBySlug(slug), [slug])
  const { addItem } = useCart()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (!hasAccess()) router.replace('/gate')
  }, [router])

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <div className="font-display text-4xl">Not found</div>
        <Link href="/shop" className="mt-4 font-mono-ui text-xs uppercase text-white/60 hover:text-white">← Back to shop</Link>
      </main>
    )
  }

  const soldOut = product.stock === 0
  const related = PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category).slice(0, 3)

  const handleAdd = () => {
    if (soldOut) { toast.error('Sold out'); return }
    if (!size) { toast.error('Select a size'); return }
    addItem(product, size, qty)
    toast.success(`${product.name} added · Size ${size}`)
  }

  const next = () => setActiveImg((activeImg + 1) % product.images.length)
  const prev = () => setActiveImg((activeImg - 1 + product.images.length) % product.images.length)

  return (
    <main className="min-h-screen bg-black text-white grain">
      <Navbar />
      <CartDrawer />

      <div className="pt-24 md:pt-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest mb-6">
            <Link href="/shop" className="hover:text-white">Shop</Link> / {product.category} / <span className="text-white/70">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={product.images[activeImg]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-full h-full object-cover ${zoom ? 'scale-150' : ''} transition-transform duration-500`}
                    onClick={() => setZoom(!zoom)}
                  />
                </AnimatePresence>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white hover:text-black transition"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white hover:text-black transition"><ChevronRight className="w-4 h-4" /></button>
                <button onClick={() => setZoom(!zoom)} className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white hover:text-black transition"><ZoomIn className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square overflow-hidden border ${i === activeImg ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'} transition`}>
                    <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:sticky md:top-28 md:self-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega">{product.category}</div>
                <h1 className="font-display text-5xl md:text-6xl mt-2 leading-none">{product.name}</h1>
                <div className="font-mono-ui text-xs uppercase text-white/50 tracking-widest mt-2">{product.subtitle}</div>
                <div className="font-display text-3xl mt-6 tabular-nums">{formatPrice(product.price)}</div>

                <p className="mt-8 text-sm text-white/70 leading-relaxed max-w-md">{product.description}</p>
                <ul className="mt-6 space-y-1 font-mono-ui text-[11px] uppercase text-white/40 tracking-widest">
                  {product.details.map((d,i)=>(<li key={i}>— {d}</li>))}
                </ul>

                {/* Size */}
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">Size</span>
                    <span className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">Fits true to size</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map(s => (
                      <button
                        key={s}
                        onClick={()=>setSize(s)}
                        disabled={soldOut}
                        className={`py-3 font-mono-ui text-xs uppercase tracking-widest border transition disabled:opacity-30 disabled:cursor-not-allowed ${size === s ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white'}`}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                {/* Qty */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">Qty</span>
                  <div className="inline-flex items-center border border-white/20">
                    <button className="w-9 h-9 flex items-center justify-center hover:bg-white/5 disabled:opacity-30" disabled={soldOut} onClick={() => setQty(Math.max(1, qty-1))}><Minus className="w-3 h-3" /></button>
                    <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                    <button className="w-9 h-9 flex items-center justify-center hover:bg-white/5 disabled:opacity-30" disabled={soldOut} onClick={() => setQty(Math.min(product.stock, qty+1))}><Plus className="w-3 h-3" /></button>
                  </div>
                  {!soldOut && <span className="font-mono-ui text-[10px] uppercase text-white/30 tracking-widest">Stock: {product.stock}</span>}
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAdd}
                  disabled={soldOut}
                  className={`mt-8 w-full py-5 font-mono-ui text-xs uppercase tracking-mega transition-all duration-500 ${soldOut ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white text-black hover:bg-transparent hover:text-white border border-white'}`}
                >
                  {soldOut ? 'Sold Out' : 'Add to Cart'}
                </button>

                <div className="mt-6 font-mono-ui text-[10px] uppercase text-white/30 tracking-widest leading-relaxed">
                  Shipped in FORGED-embossed archival packaging. Ships worldwide. Final sale.
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-32">
              <div className="border-t border-white/10 pt-6 mb-8 flex items-baseline justify-between">
                <h2 className="font-display text-3xl">More from the Drop</h2>
                <Link href="/shop" className="font-mono-ui text-xs uppercase text-white/60 hover:text-white tracking-widest">View all →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/shop/${p.slug}`} className="group block">
                    <div className="aspect-[3/4] bg-neutral-950 overflow-hidden zoom-in-hover">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="font-display text-base">{p.name}</div>
                      <div className="font-mono-ui text-xs tabular-nums">{formatPrice(p.price)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default ProductPage
