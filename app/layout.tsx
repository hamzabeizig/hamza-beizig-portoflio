import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AnimatedBackground } from '@/components/animated-background'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Hamza Beizig | Software Engineer & Full-Stack Developer',
  description: "Portfolio of Hamza Beizig, a Software Engineer with 3+ years of international experience (France, Luxembourg, Switzerland). I build scalable applications and integrate advanced AI/LLM solutions using React, Angular, Spring Boot, Node.js, and more.",
  keywords: [
    "Hamza Beizig", "Software Engineer", "Full-Stack Developer", "AI Integration", "Prompt Engineering",
    "LLMs", "OpenAI", "Claude", "DeepSeek", "Java", "Spring Boot", "TypeScript", "React", "Angular", 
    "Node.js", "PostgreSQL", "Solidity", "Web Development", "France", "Luxembourg", "Switzerland"
  ],
  authors: [{ name: 'Hamza Beizig' }],
  creator: 'Hamza Beizig',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hamza Beizig | Software Engineer & AI Integrator',
    description: 'Full-Stack Software Engineer building scalable applications and advanced AI/LLM solutions. 3+ years international experience in France, Luxembourg, and Switzerland.',
    siteName: 'Hamza Beizig Portfolio',
    images: [
      {
        url: '/logo-hb.png',
        width: 1200,
        height: 630,
        alt: 'Hamza Beizig - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamza Beizig | Software Engineer',
    description: 'Full-Stack Software Engineer & AI enthusiast with 3+ years of international experience.',
    images: ['/logo-hb.png'],
  },
  icons: {
    icon: '/logo-hb.png',
    shortcut: '/logo-hb.png',
    apple: '/logo-hb.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="cursor-none">
      <body className={`${poppins.className} font-sans antialiased relative z-10 transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          <AnimatedBackground />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
