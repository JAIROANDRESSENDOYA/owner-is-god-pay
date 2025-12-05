import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'
import { AuthListener } from '@/components/auth/auth-listener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CrediRápido',
  description: 'Su solución de crédito al instante.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthListener />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}