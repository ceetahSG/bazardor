import SortedProductList from "@/Components/SortedProductList";
import React from "react";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;
  //   console.log(categoryId);
  const categoryRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`,
    { next: { revalidate: 60 } },
  );
  const category = await categoryRes.json();
  //   console.log(category);

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
    { next: { revalidate: 60 } },
  );
  const products = await res.json();
  //   console.log(products);

  return (
    <div className="bg-[#f1f7f2]">
      <div className="container mx-auto my-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6 border border-gray-300 rounded-2xl mb-5 bg-white">
          <span className="shrink-0 text-3xl sm:text-4xl">{category.icon}</span>
          <div>
            <span className="font-bold text-xl sm:text-2xl">{category.nameBn}</span>
            <p>{products.length} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
        <SortedProductList products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
