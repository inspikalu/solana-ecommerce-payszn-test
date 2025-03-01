"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
}

export default function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={() => addToCart(product, quantity)}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition-all hover:shadow-lg"
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingCart className="h-5 w-5" />
    </button>
  )
}

