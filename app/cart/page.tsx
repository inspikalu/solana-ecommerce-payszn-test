"use client"

import { useCart } from "@/context/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 mb-6">
          <Trash2 className="h-12 w-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-slate-200 dark:border-slate-700 last:border-0"
            >
              <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0 mb-4 sm:mb-0">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="sm:ml-6 flex-grow">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{item.product.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{item.product.description}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold">
                  {item.product.price} USDC
                </div>
              </div>

              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mr-4">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[40px]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
            <span className="font-medium">{getCartTotal().toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-slate-600 dark:text-slate-400">Network Fee</span>
            <span className="font-medium">0.01 USDC</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4 pt-4 flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {(getCartTotal() + 0.01).toFixed(2)} USDC
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Link
          href="/"
          className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-center font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Continue Shopping
        </Link>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

