'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 grain">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
        <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-4">Payment Cancelled</div>
        <h1 className="font-display text-6xl md:text-7xl">No harm done.</h1>
        <p className="mt-6 font-mono-ui text-xs uppercase text-white/50 tracking-widest">Your bag has been preserved.</p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link href="/checkout" className="px-6 py-3 bg-white text-black font-mono-ui text-xs uppercase tracking-widest">Retry</Link>
          <Link href="/shop" className="px-6 py-3 border border-white/40 hover:bg-white hover:text-black transition font-mono-ui text-xs uppercase tracking-widest">Back to shop</Link>
        </div>
      </motion.div>
    </main>
  )
}

export default CancelPage
