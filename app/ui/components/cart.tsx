"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartProvider";
import Link from "next/link";
import { Total } from "./total";
import CartItems from "./CartItems";


export default function Cart() {
 
  const {cartItems, updateQuantity, removeItem, subtotal} = useCart();

  
  

  return (
   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <CartItems />

        {/* Order Summary */}
         { cartItems.length > 0 ? (
        <Total />
         ) : <></>}
        
      </div>
 
  );
}
