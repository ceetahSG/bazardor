import Image from "next/image";
import React from "react";
import logo from "../assets/logo-icon.png";
import { Button } from "@heroui/react/button";
export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: undefined | string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const categories = await res.json();
  console.log(categories);

  const date = new Date();
  const formatedDate = date.toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 p-4 justify-between">
        <div className="flex items-center gap-4 p-4">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <div>
            <h2 className="text-3xl font-bold">বাজার দর</h2>
            <p>{formatedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="ghost" className="font-bold text-xl">
            সাইন ইন
          </Button>
          <Button className="bg-green-700 rounded-xl text-xl font-bold p-6">
            সাইন আপ
          </Button>
        </div>
      </div>
      <div>
        <ul className="flex gap-8 overflow-x-auto whitespace-nowrap p-4">
          {categories.map((category: Category) => (
            <li key={category.id}>
              {category.icon && <span>{category.icon}</span>}
              <span>{category.nameBn}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
