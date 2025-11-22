"use client";

import { useState } from "react";
import { UserIcon,  ShoppingCartIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { useCart } from "@/contexts/CartProvider";
import Link from "next/link";
import { useAuthState } from "@/app/Hooks/AuthHook";

export default function Header() {

  const [items, setItems] = useState(0);
  const {cartItems} = useCart();
  const {isAuthenticated, logout} = useAuthState();



  return (
    <header className="w-full bg-white shadow-md lg:pr-12 px-2 md:px-6 py-3 flex gap-3 items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Logo />
    
      <SearchBar />

      {/* Icons */}
      <div className="flex items-center space-x-5 ">
        <div className=" flex gap-3">
          <UserIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition" />
          <span className="text-md text-black group-hover:opacity-100 transition sm:hidden md:block hidden">
            Account
          </span>
        </div>

        <div className="flex gap-5 relative cursor-pointer">
          <Link href="/shop/cart">
            <ShoppingCartIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition" />
          </Link>
          <span className="absolute -top-2 -left-1 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            {cartItems.length}
          </span>
          <span className="text-md text-black transition hidden sm:hidden md:block">
            Cart
          </span>
          
        </div>
      </div>
      <div className="flex gap-5">
        {!isAuthenticated ? <>
        <Link className="text-2lg tracking-wider font-bold px-6 py-2 rounded-lg bg-gray-200" href="shop/login">Login</Link>
       
        </> : <>
        <button className="btn border-t-cyan-500 rounded-lg text-5lg cursor-pointer bg-cyan-500 p-2" onClick={logout}>Logout</button>
        </>}
       
      </div>
     
    </header>
  );
}
