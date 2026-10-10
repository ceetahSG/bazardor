import React from "react";
import img from "../assets/bazar-hero.png";
import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-4xl p-6 mb-6 bg-white">
      <div>
        <h2 className="text-lg font-semibold text-green-700 bg-green-100 p-2 px-4 rounded-3xl w-fit mb-2">
          <CurrentDate />
        </h2>
        <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
        <p className="text-gray-700 my-5 w-150">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#AllProducts"
          className="inline-block bg-green-700 rounded-xl p-4 text-lg mb-5 text-white"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <Image src={img} alt="Hero" width={300} height={300} />
    </div>
  );
};

export default Hero;
