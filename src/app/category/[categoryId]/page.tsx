import SortedProductList from "@/Components/SortedProductList";
import React from "react";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;
  //   console.log(categoryId);
  const categoryRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`,
  );
  const category = await categoryRes.json();
  //   console.log(category);

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );
  const products = await res.json();
  //   console.log(products);

  return (
    <div className="container mx-auto my-5 ">
      <div className="flex items-center gap-2 p-6 border border-gray-300 rounded-2xl mb-5 bg-white">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <span className="font-bold text-2xl">{category.nameBn}</span>
          <p>{products.length} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <SortedProductList products={products} />
    </div>
  );
};

export default CategoryPage;
