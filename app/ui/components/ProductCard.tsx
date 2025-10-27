"use client";

import { Product } from "@/app/lib/definitions";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";




export default function ProductCard({
  imageUrls,
  name,
  price,
  description,
  sku,
}: Product) {

  const images: string[] = Array.isArray(imageUrls)
  ? imageUrls
  : (JSON.parse(imageUrls || "[]") as string[]);
  return (
    <div className="w-60 xl:w-72 md:w-56 m-auto sm:m-auto bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* Image */}
      <Link href={`collections/${sku}`}>
        <Image
          src={images[0] ? `/uploads/${images[0]}` : "/uploads/placeholder.png"}
          alt={name}
          width={300}
          height={256}
          className="object-contain h-full w-full"
        />
        </Link>
    

      {/* Details */}
      <div className="p-3">
        Price 
         <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
          {/* {oldPrice && (
            <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
          )} */}
        </div>

        {/* Title */}
        <p className="text-gray-700 text-sm mt-1 line-clamp-2 leading-tight">
          {name}
        </p>

        {/* Rating */}
        {/* <div className="flex items-center gap-1 mt-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 ml-1">{reviews.toLocaleString()}</span>
        </div> */}
      </div>
    </div>
  );
}
