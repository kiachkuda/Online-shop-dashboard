"use client";

import ProductCard from "./ProductCard";
import {  useEffect, useState } from "react";

export default function ProductGrid() {
  // const products = [
  //   {
  //     image: "/images/bag1.jpg",
  //     title: "BAGSMART Tote Bag for Women, Lightweight…",
  //     price: 26.59,
  //     oldPrice: 32.42,
  //     rating: 4.5,
  //     reviews: 3853,
  //   },
  //   {
  //     image: "/images/bag2.jpg",
  //     title: "Fibrdoo Clear Crossbody Purse Bag, Clear Bag…",
  //     price: 9.99,
  //     rating: 4.4,
  //     reviews: 4410,
  //   },
  //   {
  //     image: "/images/bag3.jpg",
  //     title: "KKXIU Shoulder Bag for Women Cute Hobo…",
  //     price: 19.99,
  //     oldPrice: 24.99,
  //     rating: 4.3,
  //     reviews: 602,
  //   },
  //   {
  //     image: "/images/bag4.jpg",
  //     title: "Travel Duffel with Multiple Compartments…",
  //     price: 29.99,
  //     oldPrice: 39.99,
  //     rating: 4.6,
  //     reviews: 5100,
  //   },
  // ];
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

   const  fetchProducts = async() => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
  }
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Featured Bags
      </h1>

      {/* Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6 
          justify-items-center
        "
      >
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
