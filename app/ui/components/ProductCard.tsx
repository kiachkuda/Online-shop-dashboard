"use client";

import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  rating,
  reviews,
}: ProductCardProps) {
  return (
    <div className="w-64 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="object-contain h-full w-full"
        />
      </div>

      {/* Details */}
      <div className="p-3">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Title */}
        <p className="text-gray-700 text-sm mt-1 line-clamp-2 leading-tight">
          {title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 ml-1">{reviews.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
