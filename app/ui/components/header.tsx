"use client";

import { useState } from "react";
import { UserIcon,  ShoppingCartIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import SearchBar from "./SearchBar";
import Logo from "./Logo";

export default function Header() {
 
  return (
    <header className="w-full bg-white shadow-md px-2 md:px-6 py-3 flex gap-3 items-center justify-between sticky top-0 z-50">
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
          <ShoppingCartIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition" />
          <span className="absolute -top-2 -left-1 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
          <span className="text-md text-black transition hidden sm:hidden md:block">
            Cart
          </span>
          
        </div>
      </div>
    </header>
  );
}
