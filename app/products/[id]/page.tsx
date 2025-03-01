"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/lib/products"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    const foundProduct = products.find((p) => p.id === params.id)
    setProduct(foundProduct || null)
    setIsLoading(false)
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px] bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{product.price}</span>
              <span className="text-lg text-slate-600 dark:text-slate-400">USDC</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{product.description}</p>
          </div>

          <div className="border-t border-b border-slate-200 dark:border-slate-700 py-6">
            <h2 className="font-semibold mb-4">Product Details</h2>
            <p className="text-slate-600 dark:text-slate-300">{product.details}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantity</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[40px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <Link
                href="/checkout"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

