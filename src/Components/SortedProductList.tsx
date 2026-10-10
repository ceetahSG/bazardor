"use client";

import { ComboBox, Input, ListBox } from "@heroui/react";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "./Marquee";

type SortOption = "ascending" | "descending" | "default";

const SortedProductList = ({ products }: { products: Product[] }) => {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sortOption === "default") {
      return products;
    }

    return [...products].sort((firstProduct, secondProduct) => {
      const difference = firstProduct.today - secondProduct.today;
      return sortOption === "ascending" ? difference : -difference;
    });
  }, [products, sortOption]);

  return (
    <>
      <div className="border border-gray-300 rounded-2xl mb-5 bg-white flex justify-end">
        <div className="flex w-full items-center justify-between gap-3 p-3 sm:w-fit sm:gap-4 sm:p-4">
          <h2>সাজান</h2>
          <ComboBox
            selectedKey={sortOption}
            onSelectionChange={(key) => {
              if (
                key === "ascending" ||
                key === "descending" ||
                key === "default"
              ) {
                setSortOption(key);
              }
            }}
            className="w-40 max-w-[60vw]"
          >
            <ComboBox.InputGroup>
              <Input placeholder="ডিফল্ট" />
              <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
              <ListBox>
                <ListBox.Item id="ascending" textValue="দাম: কম থেকে বেশি">
                  দাম: কম থেকে বেশি
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="descending" textValue="দাম: বেশি থেকে কম">
                  দাম: বেশি থেকে কম
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="default" textValue="ডিফল্ট">
                  ডিফল্ট
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </ComboBox.Popover>
          </ComboBox>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SortedProductList;
