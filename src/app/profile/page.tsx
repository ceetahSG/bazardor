"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsUpdating(true);

    const { error: updateError } = await authClient.updateUser({
      name: name ?? user?.name ?? "",
    });

    if (updateError) {
      setError(updateError.message || "তথ্য আপডেট করা যায়নি।");
    }

    setIsUpdating(false);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  if (isPending) {
    return (
      <main className="bg-[#f1f7f2] px-5 py-8">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-8 h-28 rounded-2xl bg-white" />
          <div className="mt-6 h-56 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const initials = (user.name || user.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();
  const currentName = name ?? user.name ?? "";

  return (
    <main className="  px-5 py-8 bg-[#f1f7f2]  text-[#18221b] sm:px-8 min-h-165">
      <div className="mx-auto max-w-4xl ">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        <section className="mt-7 flex flex-col gap-5 rounded-2xl border border-[#dce5de] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dcefe1] text-2xl font-bold text-[#087f3f]">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="tertiary"
            onClick={handleSignOut}
            className="w-fit rounded-lg border border-red-400 bg-white px-5 py-2 font-semibold text-red-500"
          >
            ↩ সাইন আউট
          </Button>
        </section>

        <section className="mt-6 rounded-2xl border border-[#dce5de] bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">তথ্য</h2>
          <Form className="mt-7 flex flex-col gap-4" onSubmit={handleUpdate}>
            <TextField
              name="name"
              value={currentName}
              onChange={(value) => setName(value)}
              isRequired
              minLength={3}
            >
              <Label className="mb-2 text-sm">নাম</Label>
              <Input className="rounded-lg border border-[#dce5de] px-3 py-3" />
            </TextField>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              isDisabled={isUpdating}
              className="mt-1 w-full rounded-lg bg-[#07883f] py-3 font-bold text-white shadow-md"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </Form>
        </section>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[#087f3f] hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default ProfilePage;
