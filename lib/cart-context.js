'use client'
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'forged_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items, hydrated])

  const addItem = useCallback((product, size, quantity = 1) => {
    setItems((prev) => {
      const key = `${product.slug}-${size}`
      const found = prev.find((it) => it.key === key)
      if (found) {
        return prev.map((it) => it.key === key ? { ...it, quantity: Math.min(it.quantity + quantity, product.stock) } : it)
      }
      return [...prev, {
        key,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        quantity: Math.min(quantity, product.stock),
        stock: product.stock,
      }]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((it) => it.key !== key))
  }, [])

  const updateQty = useCallback((key, quantity) => {
    setItems((prev) => prev.map((it) => it.key === key ? { ...it, quantity: Math.max(1, Math.min(quantity, it.stock)) } : it))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])
  const count = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items])

  const value = { items, addItem, removeItem, updateQty, clear, subtotal, count, open, setOpen, hydrated }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
