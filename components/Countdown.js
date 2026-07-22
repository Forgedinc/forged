'use client'
import { useEffect, useState } from 'react'
import { DROP_DATE_ISO } from '@/lib/products'

function diff(target) {
  const now = Date.now()
  let d = Math.max(0, target - now)
  const days = Math.floor(d / 86400000); d -= days * 86400000
  const hours = Math.floor(d / 3600000); d -= hours * 3600000
  const minutes = Math.floor(d / 60000); d -= minutes * 60000
  const seconds = Math.floor(d / 1000)
  return { days, hours, minutes, seconds }
}

export default function Countdown({ compact = false }) {
  const target = new Date(DROP_DATE_ISO).getTime()
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setT(diff(target))
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!mounted) return null

  const box = (label, value) => (
    <div className="flex flex-col items-center">
      <div className={`font-display font-semibold tabular-nums ${compact ? 'text-xl md:text-2xl' : 'text-4xl md:text-6xl'}`}>{String(value).padStart(2, '0')}</div>
      <div className={`font-mono-ui uppercase text-white/40 mt-1 ${compact ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}>{label}</div>
    </div>
  )

  return (
    <div className={`flex items-start ${compact ? 'gap-4' : 'gap-6 md:gap-10'}`}>
      {box('Days', t.days)}
      <div className={`font-display text-white/20 ${compact ? 'text-xl' : 'text-4xl md:text-6xl'}`}>:</div>
      {box('Hours', t.hours)}
      <div className={`font-display text-white/20 ${compact ? 'text-xl' : 'text-4xl md:text-6xl'}`}>:</div>
      {box('Minutes', t.minutes)}
      <div className={`font-display text-white/20 ${compact ? 'text-xl' : 'text-4xl md:text-6xl'}`}>:</div>
      {box('Seconds', t.seconds)}
    </div>
  )
}
