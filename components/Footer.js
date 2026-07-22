import Link from 'next/link'
import Countdown from './Countdown'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="overflow-hidden border-b border-white/10 py-8">
        <div className="flex whitespace-nowrap animate-marquee font-display text-6xl md:text-8xl text-white/10">
          {Array.from({length: 8}).map((_,i)=>(
            <span key={i} className="mx-6">FORGED · FIRST DROP · 09.09.2026 · </span>
          ))}
        </div>
      </div>
      <div className="px-6 md:px-10 py-12 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">FORGED</div>
          <p className="font-mono-ui text-xs uppercase text-white/40 mt-3 max-w-xs">A study in restraint. Made in small runs. Sold once.</p>
        </div>
        <div>
          <div className="font-mono-ui text-[10px] uppercase text-white/40 mb-4">Drop</div>
          <Countdown compact />
        </div>
        <div className="flex flex-col gap-2 font-mono-ui text-xs uppercase text-white/60">
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <Link href="/#" className="hover:text-white">Instagram</Link>
          <Link href="/#" className="hover:text-white">Contact</Link>
          <Link href="/#" className="hover:text-white">Terms</Link>
        </div>
      </div>
      <div className="px-6 md:px-10 py-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-ui uppercase text-white/30">
        <span>© 2026 FORGED · All rights reserved</span>
        <span>Made in silence</span>
      </div>
    </footer>
  )
}
