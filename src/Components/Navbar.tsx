import Image from "next/image";
import React from "react";
import logo from "../assets/logo-icon.png";
import { Button } from "@heroui/react/button";
import { connection } from "next/server";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import NavLinks from "./NavLinks";
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

  await connection();

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
            <Link href="/">
              {" "}
              <h2 className="text-3xl font-bold">বাজার দর</h2>
            </Link>

            <p>{formatedDate}</p>
          </div>
        </div>
        <NavLinks />
      </div>
      <div>
        <ul className="flex gap-8 overflow-x-auto whitespace-nowrap p-4">
          {categories.map((category: Category) => (
            <Link href={`/category/${category.slug}`} key={category.id}>
              <li key={category.id}>
                {category.icon && <span>{category.icon}</span>}
                <span>{category.nameBn}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
