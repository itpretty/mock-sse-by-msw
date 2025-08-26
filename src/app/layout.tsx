import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mock SSE by MSW',
  description: 'Mock Server-Sent Events using Mock Service Worker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}