"use client";

import { useState } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { useCart } from "@/contexts/CartProvider";
import Link from "next/link";
import { useAuthState } from "@/app/Hooks/AuthHook";

export  function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated, logout } = useAuthState();

  return (
    <header className="w-full bg-white shadow-md px-3 md:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
         <Logo />

     

        {/* Desktop Search */}
        <div className="hidden md:flex w-1/2">
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserIcon className="h-6 w-6 text-gray-700" />
            <span className="hidden md:block text-sm">Account</span>
          </div>

          <Link href="/cart" className="relative flex items-center gap-2">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 left-2 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
            <span className="hidden md:block text-sm">Cart</span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex ml-6">
          {!isAuthenticated ? (
            <Link
              className="px-6 py-2 rounded-lg bg-gray-200 font-semibold"
              href="/login"
            >
              Login
            </Link>
          ) : (
            <button
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <XMarkIcon className="h-7 w-7 text-gray-700" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 bg-white p-4 shadow-lg rounded-lg space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          <SearchBar />

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 text-lg font-medium">
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/categories" onClick={() => setMobileOpen(false)}>Categories</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>

          {/* Auth Actions Mobile */}
          <div className="pt-4">
            {!isAuthenticated ? (
              <Link
                className="block w-full text-center py-2 bg-gray-200 rounded-lg font-semibold"
                href="/login"
              >
                Login
              </Link>
            ) : (
              <button
                className="block w-full py-2 bg-cyan-500 text-white rounded-lg font-semibold"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      
    </header>
  );
}
