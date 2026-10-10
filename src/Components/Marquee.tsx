import React from "react";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import MarqueeText from "react-marquee-text";
import { formatPrice, formatUnit } from "@/lib/formatters";
import { fetchBazarDor } from "@/lib/api";
export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: undefined | string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: [
    {
      market: string;
      division: string;
      min: number;
      max: number;
    },
  ];
}

const Marquee = async () => {
  const res = await fetchBazarDor("/products", { next: { revalidate: 60 } });
  const products = await res.json();
  // console.log(products);
  return (
    <div className="w-full overflow-hidden">
      <MarqueeText duration={15}>
        {products.map((product: Product) => {
          return (
            <span
              key={product.id}
              className="flex items-center gap-2 p-2 border border-gray-300"
            >
              <span>{product.categoryIcon}</span>

              <span>{product.nameBn}</span>
              <span>
                {formatPrice(product.today)} টাকা/{formatUnit(product.unit)}
              </span>

              {product.change.dir === "up" ? (
                <span className="text-red-500 flex items-baseline gap-2">
                  <span>{product.change.pct}%</span>
                  <IoTriangle />
                </span>
              ) : (
                <span className="text-green-500 flex items-center gap-1">
                  <span>{product.change.pct}%</span>
                  <TbTriangleInvertedFilled />
                </span>
              )}
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
