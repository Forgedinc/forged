'use client'
import { CartProvider } from '@/lib/cart-context'
import { Toaster } from 'sonner'
import CursorEffect from '@/components/CursorEffect'

export function Providers({ children }) {
  return (
    <CartProvider>
      <CursorEffect />
      {children}
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#0a0a0a', border: '1px solid #1f1f1f', color: '#fff', borderRadius: 0 } }} />
    </CartProvider>
  )
}
