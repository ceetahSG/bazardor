import Image from "next/image";
import React, { Suspense } from "react";
import logo from "../assets/logo-icon.png";
import { Button } from "@heroui/react/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import { fetchBazarDor } from "@/lib/api";
export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: undefined | string;
}

const Navbar = async () => {
  const res = await fetchBazarDor("/categories", { next: { revalidate: 60 } });
  const categories = await res.json();

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-3 py-3 sm:gap-4 sm:p-4 justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Image src={logo} alt="Logo" width={50} height={50} className="h-10 w-10 sm:h-[50px] sm:w-[50px]" />
          <div>
            <Link href="/">
              {" "}
              <h2 className="text-2xl sm:text-3xl font-bold">বাজার দর</h2>
            </Link>

            <p>
              <Suspense fallback={<span>Loading date...</span>}>
                <CurrentDate />
              </Suspense>
            </p>
          </div>
        </div>
        <NavLinks />
      </div>
      <div>
        <ul className="flex gap-4 overflow-x-auto whitespace-nowrap px-0 py-3 sm:gap-8 sm:p-4">
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
