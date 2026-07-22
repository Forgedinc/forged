'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessInner() {
  const params = useSearchParams()
  const order = params.get('order') || params.get('session_id') || 'FORGED-ORDER'
  const { clear } = useCart()
  useEffect(() => { clear() }, [clear])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 grain">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.19,1,0.22,1] }}
        className="text-center max-w-lg"
      >
        <div className="font-mono-ui text-[10px] uppercase text-white/40 tracking-mega mb-6">Order Confirmed</div>
        <h1 className="font-display text-6xl md:text-8xl leading-none">Thank you.</h1>
        <p className="mt-6 font-mono-ui text-xs uppercase text-white/50 tracking-widest">You have entered the Vault. Your piece is being prepared.</p>
        <div className="mt-10 font-mono-ui text-[10px] uppercase text-white/30 tracking-widest">Reference · {order.slice(0,20)}</div>
        <div className="mt-12">
          <Link href="/shop" className="inline-block px-8 py-4 border border-white/40 hover:bg-white hover:text-black transition font-mono-ui text-xs uppercase tracking-widest">Continue →</Link>
        </div>
      </motion.div>
    </main>
  )
}

function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SuccessInner />
    </Suspense>
  )
}

export default SuccessPage
