import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartProvider'

export function Total() {

    const {subtotal, cartItems} = useCart();
    const [shippingCost, setShippingCost] = useState<number>(0);

    const calculateShippingCost = () => {
        const totalItems = cartItems.length;

        if(totalItems < 3) {
            setShippingCost(10);
        }else{
            let total = totalItems * 10 * 0.8;
            setShippingCost(total);
        }
    }
    useEffect(  () => {
        calculateShippingCost();
    } )
  return (
   <div className="bg-white p-5 rounded-2xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>KES{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>KES{shippingCost}</span>
          </div>

          <div className="flex justify-between text-gray-800 font-semibold border-t border-gray-100 pt-3 mb-6">
            <span>Total</span>
            <span>KES{(subtotal + shippingCost).toFixed(2)}</span>
          </div>

          
        </div>
  )
}
