// FORGED product catalog. Prices in EUR (cents for Stripe).
export const PRODUCTS = [
  {
    slug: 'vault-hoodie-obsidian',
    name: 'Vault Hoodie',
    subtitle: 'Obsidian',
    price: 180,
    stock: 12,
    category: 'Hoodies',
    description: 'Heavyweight 500gsm brushed loopback cotton. Boxed silhouette. Reinforced double-layer hood. Custom FORGED hardware. Cut and sewn in Portugal in a run of 120 units.',
    details: ['500gsm heavyweight loopback', 'Boxed oversized fit', 'Ribbed cuffs and hem', 'Made in Portugal', 'Limited to 120 units'],
    images: [
      'https://images.unsplash.com/photo-1720229080713-d035c7290a5f?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.unsplash.com/photo-1622866654030-fb0958200023?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.unsplash.com/photo-1581655353466-d5ad6765dd37?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85'
    ]
  },
  {
    slug: 'shadow-hoodie',
    name: 'Shadow Hoodie',
    subtitle: 'Charcoal',
    price: 195,
    stock: 8,
    category: 'Hoodies',
    description: 'Garment-dyed heavyweight fleece with hand-stitched FORGED emblem. Dropped shoulders and elongated sleeves for a modern architectural fit.',
    details: ['Garment-dyed cotton fleece', 'Hand-stitched emblem', 'Elongated sleeves', 'Made in Italy', 'Numbered edition'],
    images: [
      'https://images.unsplash.com/photo-1558749181-3626d6a2d564?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.unsplash.com/photo-1720229080713-d035c7290a5f?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.pexels.com/photos/34582210/pexels-photo-34582210.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  },
  {
    slug: 'monolith-zip',
    name: 'Monolith Zip',
    subtitle: 'Ash',
    price: 210,
    stock: 0,
    category: 'Hoodies',
    description: 'Full-zip technical hoodie with concealed YKK Excella zipper and bonded seams. Water repellent finish. A silhouette carved from stone.',
    details: ['Bonded seams', 'YKK Excella hardware', 'Water repellent finish', 'Made in Japan', 'Sold out — restock TBA'],
    images: [
      'https://images.unsplash.com/photo-1581655353466-d5ad6765dd37?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.unsplash.com/photo-1558749181-3626d6a2d564?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.pexels.com/photos/28701960/pexels-photo-28701960.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  },
  {
    slug: 'ghost-overhead',
    name: 'Ghost Overhead',
    subtitle: 'Bone',
    price: 175,
    stock: 15,
    category: 'Hoodies',
    description: 'Featherweight pullover in raw undyed cotton. Minimal silhouette, maximal presence. Every unit is unique in tone.',
    details: ['Undyed raw cotton', 'Featherweight construction', 'Unique tonal variation', 'Made in Portugal'],
    images: [
      'https://images.unsplash.com/photo-1622866654030-fb0958200023?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.unsplash.com/photo-1720229080713-d035c7290a5f?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.pexels.com/photos/34582210/pexels-photo-34582210.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  },
  {
    slug: 'concrete-tee',
    name: 'Concrete Tee',
    subtitle: 'Bone',
    price: 95,
    stock: 42,
    category: 'T-Shirts',
    description: 'Boxy heavyweight 280gsm jersey with a mineral-washed finish. Feels lived-in from day one.',
    details: ['280gsm heavyweight jersey', 'Mineral wash', 'Boxed fit', 'Made in Portugal'],
    images: [
      'https://images.pexels.com/photos/34582210/pexels-photo-34582210.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/28701960/pexels-photo-28701960.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.unsplash.com/photo-1622866654030-fb0958200023?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85'
    ]
  },
  {
    slug: 'iron-tee',
    name: 'Iron Tee',
    subtitle: 'Onyx',
    price: 90,
    stock: 30,
    category: 'T-Shirts',
    description: 'Deep-dyed heavyweight t-shirt in a pigment black so dense it reads as void. Reinforced neckline.',
    details: ['Pigment-dyed black', 'Reinforced neckline', 'Heavyweight jersey', 'Made in Portugal'],
    images: [
      'https://images.pexels.com/photos/28701960/pexels-photo-28701960.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/34582210/pexels-photo-34582210.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.unsplash.com/photo-1558749181-3626d6a2d564?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85'
    ]
  },
  {
    slug: 'reinforced-cargo',
    name: 'Reinforced Cargo',
    subtitle: 'Graphite',
    price: 220,
    stock: 6,
    category: 'Bottoms',
    description: 'Utility trouser in double-weave cotton canvas with mil-spec hardware and 8-pocket construction. Built for the long walk home.',
    details: ['Double-weave cotton canvas', 'Mil-spec hardware', '8-pocket construction', 'Made in Japan'],
    images: [
      'https://images.unsplash.com/photo-1584302052097-421d15fc2dfa?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.pexels.com/photos/11716436/pexels-photo-11716436.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.unsplash.com/photo-1581655353466-d5ad6765dd37?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85'
    ]
  },
  {
    slug: 'utility-cargo',
    name: 'Utility Cargo',
    subtitle: 'Slate',
    price: 200,
    stock: 10,
    category: 'Bottoms',
    description: 'Relaxed straight-leg trouser with articulated knees and a hidden coin pocket. Fits over boots, unbothered.',
    details: ['Articulated knees', 'Hidden coin pocket', 'Relaxed straight leg', 'Made in Portugal'],
    images: [
      'https://images.pexels.com/photos/11716436/pexels-photo-11716436.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.unsplash.com/photo-1584302052097-421d15fc2dfa?crop=entropy&cs=srgb&fm=jpg&w=1400&q=85',
      'https://images.pexels.com/photos/28701960/pexels-photo-28701960.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  }
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null
}

export const DROP_DATE_ISO = '2026-09-09T00:00:00Z'
