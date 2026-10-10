"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("User Data:", userData);
    const { data, error } = await authClient.signUp.email({
      email: userData.email as string,
      password: userData.password as string,
      name: userData.name as string,
      callbackURL: "/",
    });
    if (data) {
      toast.success("সাইন আপ সফল হয়েছে! স্বাগতম।");
      router.push("/");
    } else {
      toast.error("সাইন আপ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };
  const handleSignUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  const handleSignUpWithGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 bg-[#f1f7f2] px-4 py-8 sm:px-6">
      <div className="flex w-full max-w-xl flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-sm text-gray-700">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>
      <div className="w-full max-w-lg bg-white p-4 sm:p-8 rounded-lg shadow-md flex flex-col items-center gap-4">
        <Form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          <Button
            className="bg-green-600 rounded-lg w-full p-4 sm:p-6 font-bold"
            type="submit"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
          <div className="flex items-center w-full mt-2">
            <Separator className="flex-1" />
            <span className="px-3 text-sm text-default-500">অথবা</span>
            <Separator className="flex-1" />
          </div>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="w-full rounded-lg border bg-white border-gray-300 text-black"
              variant="tertiary"
            >
              <Icon icon="devicon:google" />
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
              type="button"
              onClick={handleSignUpWithGitHub}
              className="w-full rounded-lg bg-white border border-gray-300 text-black"
              variant="tertiary"
            >
              <Icon icon="mdi:github" />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>
        </Form>
        <h2 className="text-sm text-gray-700">
          অ্যাকাউন্ট আছে?
          <span className="text-green-600">
            <Link href="/signin"> সাইন ইন করুন</Link>
          </span>
        </h2>
      </div>
      <h2 className="text-sm text-gray-700">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </h2>
    </div>
  );
};

export default SignUpPage;
