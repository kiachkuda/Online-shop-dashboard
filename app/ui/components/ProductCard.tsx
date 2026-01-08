


"use client";
import { Product } from "@/app/lib/definitions";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { useCart } from "@/contexts/CartProvider";
import { useViewedItems } from "@/contexts/ViewedItemsProvider";
import {useRouter} from "next/navigation";



export default function ProductCard({
  imageUrls,
  sizes,
  name,
  price,
  description,
  sku,
}: Product) {

  const route = useRouter();


  const images: string[] = Array.isArray(imageUrls)
    ? imageUrls
    : (JSON.parse(imageUrls || "[]") as string[]);

  const sizeArray: string[] = Array.isArray(sizes)
    ? sizes
    : (JSON.parse(sizes || "[]") as string[]);

    const {addItem, viewedItems} = useViewedItems();

    const fetchProduct = async (id: string) => {
            try {
              const res = await fetch("/api/products/" + id);
                
              if(!res) return;

              const product : Product = await res.json();
              addItem(product)

              route.push(`products/${id}`);
    
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        }


  return (

    <div className="bg-gray-200 relative hover:cursor-pointer hover rounded-lg">
      <span onClick={() => fetchProduct(sku)}>
      <div className="img-container relative aspect-[5/6]" style={{}}>
        <Image
          src={images[0] ? `${images[0]}` : "/uploads/2.jpg"}
          alt={name}
          fill
          loading="lazy"
          placeholder="empty"
          className="object-cover object-center w-[100%] h-[100%]"
        />

        <div className="w-full absolute hidden bottom-0 gap-2 justify-center items-center bg-gray-300 py-2">
          {
            sizeArray.map((size, i) => {
              return (
                <div className="flex-1 text-xl text-center " key={i}>
                  {size}
                </div>
              )
            })}
        </div>

      </div>
      </span>

      <div onClick={() => fetchProduct(sku)} className="md:my-2 mt-5 px-3 py-2 md:text-lg lg:text-sm text-xl tracking-wide md:py-4 md:h-[100px] h-[120px]">
        {/* Title */}
        <p className="my-2">
          {name}
        </p>
        <p>KES {price}</p>
      </div>
      <div className='w-full'>
        {/* <button onClick={() => fetchProduct(sku)} className="bg-yellow-600 md:p-2 p-2 rounded-lg md:text-lg text-xl w-full">Add to cart</button> */}
      </div>


    </div>

  );
}
