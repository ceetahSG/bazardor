import React from "react";
import { IoTriangle } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";

const ProductDetailsPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
    { next: { revalidate: 60 } },
  );
  const product = await res.json();
  //   console.log(product);
  return (
    <div className="min-h-screen bg-[#f1f7f2] px-4 py-6 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-center gap-4">
            <span className="rounded-xl bg-gray-100 p-3 text-5xl">
              {product.categoryIcon}
            </span>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {product.nameBn}
              </h2>
              <p className="text-base text-gray-600 sm:text-lg">
                প্রতি {product.unit} {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm text-gray-700 sm:text-base">
                গতকালের তুলনায় আজ দাম{" "}
                <span>
                  {product.change.dir === "up" ? "বেড়েছে · " : "কমেছে · "}
                </span>
                {Math.abs(product.today - product.yesterday)} টাকা
              </p>
            </div>
          </div>
          <div className="flex min-w-40 flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-gray-700">আজকের দাম</h2>
            <h1 className="text-4xl font-bold">{product.today}</h1>
            <p className="text-gray-700">টাকা / {product.unit}</p>
            <div>
              {product.change.dir === "up" ? (
                <span className="flex items-baseline gap-2 text-red-500">
                  <IoTriangle />
                  <span>{product.change.pct}%</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 text-green-500">
                  <TbTriangleInvertedFilled />
                  <span>{product.change.pct}%</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              [
                "সর্বনিম্ন দাম",

                product.markets.reduce(
                  (min: number, market: { min: number }) =>
                    Math.min(min, market.min),
                  Infinity,
                ),
                "সবচেয়ে কম দামের বাজার",
              ],
              [
                "সর্বাধিক দাম",
                product.markets.reduce(
                  (max: number, market: { max: number }) =>
                    Math.max(max, market.max),
                  -Infinity,
                ),
                "সবচেয়ে বেশি দামের বাজার",
              ],
              [
                "গড় দাম",
                Math.round(
                  product.markets.reduce(
                    (sum: number, market: { min: number; max: number }) =>
                      sum + (market.min + market.max) / 2,
                    0,
                  ) / product.markets.length,
                ),
                `প্রতি ${product.unit} হিসাবে`,
              ],
            ].map(([label, price, description]) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-600">{label}</p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    label === "সর্বনিম্ন দাম"
                      ? "text-green-600"
                      : label === "সর্বাধিক দাম"
                        ? "text-red-600"
                        : "text-gray-900"
                  }`}
                >
                  {price} <span className="text-sm font-normal">টাকা</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-7 text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-160 border-collapse text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map(
                  (market: {
                    market: string;
                    division: string;
                    min: number;
                    max: number;
                    avg: number;
                  }) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-t border-gray-200"
                    >
                      <td className="px-4 py-3 text-gray-800">
                        {market.market}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {market.min} টাকা
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {market.max} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {Math.round((market.min + market.max) / 2)} টাকা
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
