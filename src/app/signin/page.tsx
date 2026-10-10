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

const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("User Data:", userData);
    const { data, error } = await authClient.signIn.email({
      email: userData.email as string,
      password: userData.password as string,

      callbackURL: "/",
    });
    if (data) {
      toast.success("সাইন ইন সফল হয়েছে! স্বাগতম।");
      router.push("/");
    } else {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };
  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSignInWithGitHub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-[#f1f7f2] min-h-165">
      <div className="flex flex-col items-center gap-2 mt-10">
        <h2 className="text-2xl font-bold">সাইন ইন</h2>
        <p className="text-sm text-gray-700">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center gap-4">
        <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit}>
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

          <Button
            className="bg-green-600 rounded-lg w-100 p-6 font-bold"
            type="submit"
          >
            সাইন ইন
          </Button>
          <div className="flex items-center w-full mt-2">
            <Separator className="flex-1" />
            <span className="px-3 text-sm text-default-500">অথবা</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex gap-2 w-full">
            <Button
              onClick={handleSignInWithGoogle}
              className="w-full rounded-lg border bg-white border-gray-300 text-black"
              variant="tertiary"
            >
              <Icon icon="devicon:google" />
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
              onClick={handleSignInWithGitHub}
              className="w-full rounded-lg bg-white border border-gray-300 text-black"
              variant="tertiary"
            >
              <Icon icon="mdi:github" />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>
        </Form>
        <h2 className="text-sm text-gray-700">
          অ্যাকাউন্ট নেই?
          <span className="text-green-600">
            <Link href="/signup"> সাইন আপ করুন</Link>
          </span>
        </h2>
      </div>
      <Link href="/">
        <h2 className="text-sm text-gray-700">← হোম পেজে ফিরে যান</h2>
      </Link>
    </div>
  );
};

export default SignInPage;
