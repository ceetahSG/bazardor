import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import logo from "@/assets/logo-icon.png";

export default function NotFound() {
  return (
    <section className="bg-[#f1f7f2] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="container mx-auto">
        <div className="relative isolate flex min-h-128 items-center justify-center overflow-hidden rounded-[2rem] border border-gray-300 bg-white px-6 py-12 shadow-sm sm:px-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-green-100/80 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-16 -z-10 h-64 w-64 rounded-full bg-[#f1f7f2] blur-2xl"
          />

          <div className="w-full max-w-2xl text-center">
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 p-4 sm:h-24 sm:w-24">
              <Image
                src={logo}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-green-700">
              বাজার দর
            </p>
            <p className="text-7xl font-black leading-none text-green-700 sm:text-9xl">
              404
            </p>
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-4xl">
              এই পাতাটি বাজারের তালিকায় নেই
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              মনে হচ্ছে আপনি ভুল গলিতে চলে এসেছেন। চলুন, আবার আজকের বাজারের দামে
              ফিরে যাই।
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
              >
                <FiHome aria-hidden="true" />
                হোমে ফিরে যান
              </Link>
              <Link
                href="/#AllProducts"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-700 transition-colors hover:border-green-700 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
              >
                <FiSearch aria-hidden="true" />
                পণ্য খুঁজুন
              </Link>
            </div>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-green-700"
            >
              <FiArrowLeft aria-hidden="true" />
              আগের পাতায় ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
