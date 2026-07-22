'use client'
import { useCart } from '@/lib/cart-context'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { open, setOpen, items, removeItem, updateQty, subtotal } = useCart()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-black border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="font-display text-xl">Your Bag</div>
                <div className="font-mono-ui text-[10px] uppercase text-white/40 mt-1">Drop 001 · FORGED</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/5" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-8 text-center">
                  <div className="font-display text-3xl mb-3">Empty.</div>
                  <div className="font-mono-ui text-xs uppercase text-white/40 mb-8">The forge awaits.</div>
                  <Link href="/shop" onClick={()=>setOpen(false)} className="inline-block px-6 py-3 border border-white/40 hover:border-white hover:bg-white hover:text-black transition text-xs font-mono-ui uppercase tracking-widest">Enter Drop</Link>
                </div>
              ) : (
                <ul className="divide-y divide-white/10">
                  {items.map(it => (
                    <li key={it.key} className="p-5 flex gap-4">
                      <div className="w-24 h-32 bg-white/5 overflow-hidden shrink-0">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-display text-base leading-tight">{it.name}</div>
                            <div className="font-mono-ui text-[10px] uppercase text-white/40 mt-1">Size {it.size}</div>
                          </div>
                          <button onClick={() => removeItem(it.key)} className="text-white/40 hover:text-white p-1" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center border border-white/20">
                            <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5" onClick={() => updateQty(it.key, it.quantity - 1)}><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center text-sm tabular-nums">{it.quantity}</span>
                            <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5" onClick={() => updateQty(it.key, it.quantity + 1)}><Plus className="w-3 h-3" /></button>
                          </div>
                          <div className="font-mono-ui text-sm tabular-nums">{formatPrice(it.price * it.quantity)}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono-ui uppercase text-white/60 text-xs">Subtotal</span>
                  <span className="font-display text-2xl tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="text-[10px] font-mono-ui uppercase text-white/40">Taxes and shipping calculated at checkout.</div>
                <Link href="/checkout" onClick={()=>setOpen(false)} className="block w-full text-center py-4 bg-white text-black font-mono-ui uppercase tracking-widest text-xs hover:bg-white/90 transition">Checkout →</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
