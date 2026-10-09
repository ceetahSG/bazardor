import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./Marquee";

const DecreasedProduct = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DecreasedProduct;
