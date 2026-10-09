import Hero from "@/Components/Hero";
import { Product } from "@/Components/Marquee";
import ProductCard from "@/Components/ProductCard";

export default async function Home() {
  const result = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );
  const products = await result.json();
  // console.log(products);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto my-5 ">
        <div>
          <Hero />
          <h2 className="text-2xl font-bold">সব পণ্য</h2>
          <p className="text-gray-700">
            মোট {products.length} টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
