import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rental Listings - Stan Makov',
  description: 'Tesk Task from Luxe Quality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      if(typeof window !== 'undefined') {
        <body className={inter.className}>{children}</body>
      }
    </html>
  )
}
