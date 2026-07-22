'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import Countdown from '@/components/Countdown'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function hasAccess() {
  if (typeof document === 'undefined') return true
  return document.cookie.split(';').some(c => c.trim().startsWith('forged_access=1'))
}

function ProductCard({ product, index }) {
  const soldOut = product.stock === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.05, ease: [0.19,1,0.22,1] }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden zoom-in-hover">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 flex gap-2">
            {soldOut && <span className="font-mono-ui text-[10px] uppercase tracking-widest bg-white text-black px-2 py-1">Sold Out</span>}
            {!soldOut && product.stock <= 10 && <span className="font-mono-ui text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur border border-white/20 px-2 py-1">{product.stock} left</span>}
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-block bg-white text-black px-4 py-2 font-mono-ui text-[10px] uppercase tracking-widest">View Product →</span>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div className="font-display text-lg leading-tight">{product.name}</div>
            <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest mt-1">{product.subtitle} · {product.category}</div>
          </div>
          <div className="font-mono-ui text-sm tabular-nums">{formatPrice(product.price)}</div>
        </div>
      </Link>
    </motion.div>
  )
}

function Shop() {
  const router = useRouter()
  useEffect(() => {
    if (!hasAccess()) router.replace('/gate')
  }, [router])

  const groups = [
    { id: 'hoodies', name: 'Hoodies', items: PRODUCTS.filter(p => p.category === 'Hoodies') },
    { id: 'tshirts', name: 'T-Shirts', items: PRODUCTS.filter(p => p.category === 'T-Shirts') },
    { id: 'bottoms', name: 'Bottoms', items: PRODUCTS.filter(p => p.category === 'Bottoms') },
  ]

  return (
    <main className="min-h-screen bg-black text-white grain">
      <Navbar />
      <CartDrawer />

      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div>
            <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Drop 001 · Vault Series</div>
            <h1 className="font-display text-6xl md:text-8xl leading-none">The First<br/>Forged.</h1>
            <p className="mt-6 max-w-lg font-mono-ui text-xs uppercase text-white/50 tracking-widest">Eight silhouettes. Numbered runs. Once these are gone, they are gone.</p>
          </div>
          <div className="md:text-right">
            <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest mb-2">Public release</div>
            <Countdown compact />
          </div>
        </motion.div>
      </section>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="px-6 md:px-10 mb-20 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline justify-between mb-8 border-t border-white/10 pt-6">
              <h2 className="font-display text-3xl md:text-4xl">{group.name}</h2>
              <span className="font-mono-ui text-[10px] uppercase text-white/40 tracking-widest">{String(group.items.length).padStart(2,'0')} pieces</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {group.items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  )
}

export default Shop
