import React from "react";
import { Product } from "./Marquee";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/productDetails/${product.id}`}>
      <div className="border border-gray-300 rounded-4xl bg-white">
        <div className="flex items-center gap-4 p-4 ">
          <span className="text-2xl bg-gray-100 p-2 px-3 rounded-xl">
            {product.categoryIcon}
          </span>
          <div>
            <h3 className="text-xl font-bold">{product.nameBn}</h3>
            <p className="text-sm text-gray-700">per {product.unit}</p>
          </div>
        </div>
        <div className="flex items-baseline-last justify-between p-4 border-gray-300">
          <div>
            <h2>আজকের দাম</h2>
            <h1 className="text-2xl font-bold">
              {product.today}
              <span className="text-lg"> টাকা</span>
            </h1>
          </div>

          <div>
            {product.change.dir === "up" ? (
              <span className="text-red-500 flex items-baseline gap-2 bg-gray-100 p-2 px-3 rounded-4xl">
                <IoTriangle />
                <span>{product.change.pct}%</span>
              </span>
            ) : (
              <span className="text-green-500 flex items-center gap-2  bg-gray-100 p-2 px-3 rounded-4xl">
                <TbTriangleInvertedFilled />
                <span>{product.change.pct}%</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
