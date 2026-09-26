import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import AIAssistant from '@/components/AIAssistant'
import './globals.css'

// Self-hosted so no network fetch is needed at build/runtime (proxy-safe).
const instrumentSerif = localFont({
  src: [
    { path: './fonts/InstrumentSerif-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/InstrumentSerif-Regular.ttf', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hamzabeizig.com'),
  title: 'Hamza Beizig | Software Engineer & Full-Stack Developer',
  description:
    'Portfolio of Hamza Beizig, a Software Engineer with 3+ years of international experience (Tunisia, France, Luxembourg, Switzerland). Full-stack development with LLMs and AI agents wired in where they matter.',
  keywords: [
    'Hamza Beizig',
    'Software Engineer',
    'Full-Stack Developer',
    'AI Integration',
    'Prompt Engineering',
    'LLMs',
    'OpenAI',
    'Claude',
    'DeepSeek',
    'Java',
    'Spring Boot',
    'TypeScript',
    'React',
    'Angular',
    'Next.js',
  ],
  authors: [{ name: 'Hamza Beizig' }],
  creator: 'Hamza Beizig',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hamzabeizig.com',
    title: 'Hamza Beizig | Full-stack engineer, building with an AI edge',
    description:
      'Full-Stack Software Engineer building scalable applications and advanced AI/LLM solutions. 3+ years across Tunisia, France, Luxembourg and Switzerland.',
    siteName: 'Hamza Beizig Portfolio',
    images: [{ url: '/logo-hb.png', width: 1200, height: 630, alt: 'Hamza Beizig — Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamza Beizig | Software Engineer',
    description: 'Full-Stack Software Engineer & AI integrator with 3+ years of international experience.',
    images: ['/logo-hb.png'],
  },
  icons: { icon: '/logo-hb.png', shortcut: '/logo-hb.png', apple: '/apple-icon.png' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <AIAssistant />
        <Analytics />
      </body>
    </html>
  )
}
