'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Countdown from '@/components/Countdown'
import { ArrowRight } from 'lucide-react'

function Landing() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden grain">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-0 inset-x-0 px-6 md:px-10 py-6 flex items-center justify-between z-10"
      >
        <span className="font-mono-ui text-[10px] md:text-xs uppercase text-white/60 tracking-widest">FORGED · EST. 2026</span>
        <span className="font-mono-ui text-[10px] md:text-xs uppercase text-white/60 tracking-widest hidden sm:block">Access by invitation</span>
        <span className="font-mono-ui text-[10px] md:text-xs uppercase text-white/60 tracking-widest">EU / WORLDWIDE</span>
      </motion.div>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.06), transparent 70%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 text-center"
        >
          <div className="font-mono-ui text-[10px] md:text-xs uppercase text-white/40 tracking-mega mb-6 md:mb-10">First Drop</div>
          <h1 className="forged-mark text-[22vw] md:text-[16vw] lg:text-[14rem] leading-none">
            FORGED
          </h1>
          <div className="mt-6 md:mt-10 flex flex-col items-center gap-2">
            <div className="font-mono-ui text-[10px] md:text-xs uppercase text-white/40 tracking-mega">Drop 001</div>
            <div className="font-display text-2xl md:text-4xl">09.09.2026</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.19,1,0.22,1] }}
          className="mt-12 md:mt-20 relative z-10"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-14 md:mt-20 relative z-10"
        >
          <Link
            href="/gate"
            className="group inline-flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 border border-white/40 hover:border-white hover:bg-white hover:text-black transition-all duration-500 font-mono-ui text-xs uppercase tracking-widest"
          >
            <span>Enter Drop</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.6 }}
        className="absolute bottom-0 inset-x-0 px-6 md:px-10 py-6 flex items-center justify-between font-mono-ui text-[10px] md:text-xs uppercase text-white/40 tracking-widest"
      >
        <span>© FORGED 2026</span>
        <span className="hidden sm:block">Limited to 120 units per silhouette</span>
        <span>Made in Silence</span>
      </motion.div>

      {/* Ambient marquee */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-32 pointer-events-none overflow-hidden opacity-40">
        <div className="flex whitespace-nowrap animate-marquee font-display text-lg md:text-2xl text-white/10">
          {Array.from({length:12}).map((_,i)=>(
            <span key={i} className="mx-8">FIRST DROP · 09.09.2026 · FORGED · </span>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Landing
