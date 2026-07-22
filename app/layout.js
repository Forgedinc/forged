import './globals.css'
import { Providers } from './providers'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['400','500','600','700'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://forged-drop.preview.emergentagent.com'),
  title: {
    default: 'FORGED — First Drop 09.09.2026',
    template: '%s · FORGED'
  },
  description: 'FORGED. Premium streetwear. First Drop 09.09.2026. Access by invitation.',
  keywords: ['FORGED', 'streetwear', 'luxury', 'drop', 'exclusive', 'apparel'],
  openGraph: {
    title: 'FORGED — First Drop 09.09.2026',
    description: 'Access by invitation. First Drop 09.09.2026.',
    type: 'website',
    siteName: 'FORGED',
    images: [{ url: 'https://images.unsplash.com/photo-1720229080713-d035c7290a5f?w=1200&q=80', width: 1200, height: 630, alt: 'FORGED' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORGED — First Drop 09.09.2026',
    description: 'Access by invitation. First Drop 09.09.2026.'
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' }
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} dark`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
