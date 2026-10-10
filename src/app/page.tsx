import DecreasedProduct from "@/Components/DecreasedProduct";
import Hero from "@/Components/Hero";
import IncreasedProduct from "@/Components/IncreasedProduct";
import { Product } from "@/Components/Marquee";
import ProductCard from "@/Components/ProductCard";
import { fetchBazarDor } from "@/lib/api";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default async function Home() {
  const result = await fetchBazarDor("/products", {
    next: { revalidate: 60 },
  });
  const products = await result.json();

  // console.log(products);
  const increasedPriceProduct = products.filter(
    (product: Product) => product.change.dir === "up",
  );
  const decreasedPriceProduct = products.filter(
    (product: Product) => product.change.dir === "down",
  );
  const sortedIncreasedPriceProduct = increasedPriceProduct.sort(
    (a: Product, b: Product) => b.change.pct - a.change.pct,
  );
  const sortedDecreasedPriceProduct = decreasedPriceProduct.sort(
    (a: Product, b: Product) => a.change.pct - b.change.pct,
  );
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto my-5 px-4 sm:px-6 lg:px-8">
        <div>
          <Hero />
          <div className="flex gap-2 items-center">
            <IoTriangle className="text-red-500" />
            <h2 className="text-xl font-bold ">আজ দাম বেড়েছে</h2>
          </div>
          <IncreasedProduct
            products={sortedIncreasedPriceProduct.slice(0, 6)}
          />
          <div className="flex gap-2 items-center mt-10">
            <TbTriangleInvertedFilled className="text-green-500" />
            <h2 className="text-xl font-bold ">আজ দাম কমেছে</h2>
          </div>
          <DecreasedProduct
            products={sortedDecreasedPriceProduct.slice(0, 6)}
          />

          <h2
            id="AllProducts"
            className="text-2xl font-bold mt-10 scroll-mt-4 scroll-behavior-smooth"
          >
            সব পণ্য
          </h2>
          <p className="text-gray-700">
            মোট {products.length} টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
