"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { Dropdown, Label } from "@heroui/react";
import { GoTriangleDown } from "react-icons/go";
import { toast } from "react-toastify";

const NavLinks = () => {
  const { data: session } = authClient.useSession();
  const userData = session?.user;

  const user = session?.user;
  const handlesSignout = () => {
    toast.success("সাইন আউট সফল হয়েছে। আবার দেখা হবে!");
    authClient.signOut();
  };
  //   console.log("User:", user);
  return (
    <div className="flex items-center gap-2 sm:gap-5">
      {!user ? (
        <div>
          <Link href="/signin">
            <Button variant="ghost" className="px-2 text-sm font-bold sm:px-3 sm:text-xl">
              সাইন ইন
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-green-700 rounded-xl px-3 py-2 text-sm font-bold sm:p-6 sm:text-xl">
              সাইন আপ
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-2">
          <Dropdown>
            <Button aria-label="Menu" variant="secondary">
              {userData?.name || userData?.email || "User"}
              <GoTriangleDown />
            </Button>
            <Dropdown.Popover className="bg-white rounded-lg pr-20  p-5 shadow-lg">
              <Dropdown.Menu
                onAction={(key) => console.log(`Selected: ${key}`)}
              >
                <Dropdown.Item textValue="Edit file">
                  <Label className="text-lg font-bold">{userData?.name}</Label>
                </Dropdown.Item>
                <Dropdown.Item textValue="Edit file">
                  <Label>{userData?.email}</Label>
                </Dropdown.Item>

                <Dropdown.Item id="edit-file" textValue="Edit file">
                  <Link href="/profile">
                    <Label>👤 আমার প্রোফাইল</Label>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  id="delete-file"
                  textValue="Delete file"
                  variant="danger"
                  onClick={handlesSignout}
                >
                  <Label>↩ সাইন আউট</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
