import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SolanaShop - USDC E-commerce",
  description: "Shop with USDC on the Solana blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="border-t border-slate-200 dark:border-slate-700 py-6 mt-12">
              <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
                <p>© 2025 SolanaShop. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'