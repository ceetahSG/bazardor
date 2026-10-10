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
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";

const SignInPage = () => {
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
      redirect("/");
      console.log("Sign in Successful:", data);
    } else {
      console.error("Sign In Error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-100">
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
              className="w-full rounded-lg border bg-white border-gray-300 text-black"
              variant="tertiary"
            >
              <Icon icon="devicon:google" />
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
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
          <span className="text-green-600"> সাইন আপ করুন</span>
        </h2>
      </div>
      <h2 className="text-sm text-gray-700">← হোম পেজে ফিরে যান</h2>
    </div>
  );
};

export default SignInPage;
