import React from "react";
import { Product } from "./Marquee";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Link from "next/link";
import { formatPrice, formatUnit } from "@/lib/formatters";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/productDetails/${product.id}`}>
      <div className="h-full border border-gray-300 rounded-2xl sm:rounded-4xl bg-white">
        <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
          <span className="shrink-0 text-xl sm:text-2xl bg-gray-100 p-2 px-3 rounded-xl">
            {product.categoryIcon}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg sm:text-xl font-bold">{product.nameBn}</h3>
            <p className="text-sm text-gray-700">
              প্রতি {formatUnit(product.unit)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 p-3 sm:p-4 border-gray-300">
          <div>
            <h2>আজকের দাম</h2>
            <h1 className="text-xl sm:text-2xl font-bold">
              {formatPrice(product.today)}
              <span className="text-lg"> টাকা</span>
            </h1>
          </div>

          <div>
            {product.change.dir === "up" ? (
              <span className="text-sm sm:text-base text-red-500 flex items-baseline gap-1 sm:gap-2 bg-gray-100 p-2 px-3 rounded-4xl">
                <IoTriangle />
                <span>{product.change.pct}%</span>
              </span>
            ) : (
              <span className="text-sm sm:text-base text-green-500 flex items-center gap-1 sm:gap-2 bg-gray-100 p-2 px-3 rounded-4xl">
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
