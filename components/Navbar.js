'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { motion } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19,1,0.22,1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/60"
    >
      <div className="px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/shop" className="font-display text-xl md:text-2xl font-bold tracking-tight">FORGED</Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono-ui uppercase text-white/60">
            <Link href="/shop" className="hover:text-white transition">Drop 001</Link>
            <Link href="/shop#hoodies" className="hover:text-white transition">Hoodies</Link>
            <Link href="/shop#tshirts" className="hover:text-white transition">T-Shirts</Link>
            <Link href="/shop#bottoms" className="hover:text-white transition">Bottoms</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-mono-ui text-[10px] uppercase text-white/40">First Drop · 09.09.2026</span>
          <button onClick={() => setOpen(true)} aria-label="Open cart" className="relative flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-white transition text-xs font-mono-ui uppercase">
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            <span className="tabular-nums">[{String(count).padStart(2,'0')}]</span>
          </button>
          <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </div>
      {menu && (
        <div className="md:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-mono-ui uppercase text-white/70 bg-black">
          <Link href="/shop" onClick={()=>setMenu(false)}>Drop 001</Link>
          <Link href="/shop#hoodies" onClick={()=>setMenu(false)}>Hoodies</Link>
          <Link href="/shop#tshirts" onClick={()=>setMenu(false)}>T-Shirts</Link>
          <Link href="/shop#bottoms" onClick={()=>setMenu(false)}>Bottoms</Link>
        </div>
      )}
    </motion.header>
  )
}
