import React, { Suspense } from "react";
import img from "../assets/bazar-hero.png";
import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 items-center border border-gray-300 rounded-4xl p-4 sm:p-6 mb-6 bg-white md:flex-row md:justify-between">
      <div className="w-full">
        <h2 className="text-base sm:text-lg font-semibold text-green-700 bg-green-100 p-2 px-4 rounded-3xl w-fit mb-2">
          <Suspense fallback={<span>Loading date...</span>}>
            <CurrentDate />
          </Suspense>
        </h2>
        <h1 className="text-3xl sm:text-4xl font-bold">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-700 my-5 max-w-2xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#AllProducts"
          className="inline-block bg-green-700 rounded-xl px-5 py-3 text-base sm:text-lg mb-2 text-white"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <Image
        src={img}
        alt="Hero"
        width={300}
        height={300}
        className="h-auto w-40 sm:w-56 md:w-64 lg:w-72"
      />
    </div>
  );
};

export default Hero;
