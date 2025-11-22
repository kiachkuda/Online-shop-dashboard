import React from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartProvider'
import { Trash2 } from 'lucide-react';

function CartItems() {
    const {updateQuantity, cartItems, removeItem} = useCart();
  return (
  
            <div className="w-full md:col-span-2 bg-white p-5 rounded-2xl shadow-sm">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
              ) : (
                cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center flex-col md:flex-row gap-6 md:justify-between border-b border-gray-200 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${item.image}`}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover hidden md:block"
                      />
                       <Image
                        src={`${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-xl object-cover md:hidden"
                      />
                      <div>
                        <h3 className="md:text-lg  md:font-medium  text-gray-800">
                          {item.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                    </div>
    
                    {/* Quantity Controls */}
                    <div className="flex justify-between items-center gap-4">
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
                    <div className="flex items-center ml-2 md:ml-0 gap-2">
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
  )
}

export default CartItems