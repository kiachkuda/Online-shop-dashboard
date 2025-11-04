"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartProvider";


export default function CartPage() {
 
  const {cartItems, updateQuantity, removeItem, subtotal} = useCart();
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-100 py-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={`/uploads/${item.image}`}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="border rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="border rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Total & Remove */}
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Trash2
                    size={18}
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-5 rounded-2xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>$10.00</span>
          </div>

          <div className="flex justify-between text-gray-800 font-semibold border-t border-gray-100 pt-3 mb-6">
            <span>Total</span>
            <span>${(subtotal + 10).toFixed(2)}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
