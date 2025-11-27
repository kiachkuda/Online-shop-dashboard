"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "../ui/components/cart";


export default function CartPage() {
  return (
    <div className="min-h-screen w-full m-auto bg-gray-50 py-10 px-6 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <Cart />
      <Link href="/checkout">
          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all">
            Checkout
          </button>
      </Link>
    </div>
  );
}
