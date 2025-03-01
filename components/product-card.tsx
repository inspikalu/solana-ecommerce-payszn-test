import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import AddToCartButton from "./add-to-cart-button"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">{product.name}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{product.price}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">USDC</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-4 right-4">
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}

