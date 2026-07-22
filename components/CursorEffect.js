'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    const over = (e) => {
      const t = e.target
      if (!t || !t.closest) return
      setHover(!!t.closest('a, button, [role="button"], input, select, textarea, [data-cursor="hover"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9999] hidden md:block"
        animate={{ x: pos.x - (hover ? 20 : 4), y: pos.y - (hover ? 20 : 4), scale: hover ? 1 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.3 }}
      >
        <div className={`transition-all duration-200 ${hover ? 'w-10 h-10 border border-white/70 bg-transparent' : 'w-2 h-2 bg-white'}`} style={{ borderRadius: 0 }} />
      </motion.div>
    </>
  )
}
