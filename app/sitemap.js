import { PRODUCTS } from '@/lib/products'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://forged-drop.preview.emergentagent.com'
  const products = PRODUCTS.map(p => ({ url: `${base}/shop/${p.slug}`, lastModified: new Date() }))
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/gate`, lastModified: new Date() },
    { url: `${base}/shop`, lastModified: new Date(), priority: 0.9 },
    ...products,
  ]
}
