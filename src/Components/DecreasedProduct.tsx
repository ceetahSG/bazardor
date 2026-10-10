import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./Marquee";

const DecreasedProduct = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DecreasedProduct;
