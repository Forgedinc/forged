'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const PASSWORD = 'forged001'

function GatePage() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setChecking(true)
    setError(false)
    setTimeout(() => {
      if (value.trim().toLowerCase() === PASSWORD) {
        try { document.cookie = 'forged_access=1; path=/; max-age=86400' } catch {}
        router.push('/shop')
      } else {
        setError(true)
        setChecking(false)
      }
    }, 500)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 grain">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-center"
      >
        <Link href="/" className="font-mono-ui text-[10px] uppercase tracking-mega text-white/40 hover:text-white/70 transition">← Back</Link>
        <div className="mt-10 mb-2 font-mono-ui text-[10px] uppercase tracking-mega text-white/40">Restricted</div>
        <h1 className="font-display text-5xl md:text-6xl mb-3">Enter</h1>
        <p className="font-mono-ui text-xs uppercase text-white/50 mb-12">Access by invitation only</p>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <input
              autoFocus
              type="password"
              value={value}
              onChange={(e)=>{setValue(e.target.value); setError(false)}}
              placeholder="Passphrase"
              className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-4 text-center font-mono-ui text-lg uppercase tracking-widest placeholder:text-white/20 transition"
            />
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono-ui text-xs uppercase tracking-widest text-red-400"
              >
                Access Denied
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={checking || !value}
            className="w-full py-4 border border-white/40 hover:border-white hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-500 font-mono-ui text-xs uppercase tracking-widest"
          >
            {checking ? 'Verifying…' : 'Submit'}
          </button>
        </form>

        <div className="mt-16 font-mono-ui text-[10px] uppercase text-white/20 tracking-widest">Drop 001 · 09.09.2026</div>
      </motion.div>
    </main>
  )
}

export default GatePage
