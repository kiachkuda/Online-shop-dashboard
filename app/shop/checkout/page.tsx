
"use client"
import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/app/ui/button";
import { useCart } from "@/contexts/CartProvider";
import Cart from "@/app/ui/components/cart";
import CartItems from "@/app/ui/components/CartItems";
import { Total } from "@/app/ui/components/total";
import { useAuthState } from "@/app/Hooks/AuthHook";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [method, setMethod] = useState("");
  const  {cartItems} = useCart();
  const {isAuthenticated} = useAuthState();
  const route = useRouter();

  useEffect( ()=> {
    
  })
  

  const renderFields = () => {
    switch (method) {
      case "paypal":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="email"
              placeholder="PayPal Email"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      case "stripe":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="text"
              placeholder="Card Number"
              className="border p-2 rounded-xl"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border p-2 rounded-xl"
            />
            <input
              type="text"
              placeholder="CVC"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      case "mpesa":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="text"
              placeholder="Mpesa Phone Number"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row m-auto justify-center p-6 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6">
        {/* Cart Items */}
        <CartItems />
 
        {/* Order Summary */}
         { cartItems.length > 0 ? (
        <Total />
         ) : <></>}
        
      </div>
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold mb-2">Choose Payment Method</h2>

        <div className="grid gap-3">
          <Button
            // variant={method === "paypal" ? "default" : "outline"}
            className="rounded-xl bg-sky-600 "
            onClick={() => setMethod(method === "paypal" ? "" : "paypal")}
          >
            PayPal
          </Button>

          <Button
            // variant={method === "stripe" ? "default" : "outline"}
            className="rounded-xl"
            onClick={() => setMethod(method === "stripe" ? "" : "stripe")}
          >
            Stripe
          </Button>

          <Button
            // variant={method === "mpesa" ? "default" : "outline"}
            className="rounded-xl bg-green-700"
            onClick={() => setMethod(method === "mpesa" ? "" : "mpesa")}
          >
            Mpesa
          </Button>
        </div>

        {renderFields()}

        {method && (
          <Button className="mt-6 p-3 text-lg w-full rounded-xl bg-sky-600">Proceed to Pay</Button>
        )}
      </div>
    </div>
  );
}
