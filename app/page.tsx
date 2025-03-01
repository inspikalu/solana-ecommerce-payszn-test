import ProductGrid from "@/components/product-grid"
import { products } from "@/lib/products"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Shop with USDC on Solana</h1>
          <p className="text-lg opacity-90 mb-6">
            Experience seamless crypto payments with our curated collection of products. Fast, secure, and
            decentralized.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
            Explore Collection
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  )
}

