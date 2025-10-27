"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/images/flask1.jpg",
  "/images/flask2.jpg",
  "/images/flask3.jpg",
  "/images/flask4.jpg",
];



export default function ProductPage() {

  const [data, setData] = useState<any>();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState("cream");

  const  fetchProduct = async(id: string) => {
        try {
          const res = await fetch("/api/v1/products/"+id);
          setData(await res.json());
          return data;
        } catch (err) {
          console.error("Error fetching products:", err);
        } 
      }
      useEffect(() => {
          // Pick Id from the URL
          const url = new URL(window.location.href);
          const id = url.pathname.split("/").pop();
          //setUrlpath(id!);
          fetchProduct(id!);
        }, []);

  return (
    <div className="min-h-screen px-4 py-10 md:px-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — IMAGE SECTION */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-2 justify-center">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-md overflow-hidden hover:opacity-80 ${
                  selectedImage === img ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt="Product"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <Image
              src={selectedImage}
              alt="Main Product"
              width={600}
              height={600}
              className="object-cover rounded-lg shadow-sm w-full"
            />
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-500 mb-2">
            Home / Collections / For Him
          </div>
          <h1 className="text-3xl font-serif mb-4">
            Personalised Leather Hip Flask – 180ml
          </h1>

          {/* COLOR SELECTION */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Color — Cream</p>
            <div className="flex gap-2">
              {["cream", "brown"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-gray-700"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: color === "cream" ? "#f5deb3" : "#a0522d",
                  }}
                />
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="text-lg font-semibold mb-4">
            KSh1,550.00 <span className="block text-sm text-gray-500">Tax included.</span>
          </div>

          {/* PERSONALIZE BUTTON */}
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md mb-4 hover:bg-gray-700 transition">
            Personalize It
          </button>

          {/* GIFT WRAP OPTION */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="gift"
              className="mr-2 w-4 h-4 border-gray-400"
            />
            <label htmlFor="gift" className="text-sm text-gray-700">
              Is this a Gift? Add Gift Wrap & Extras…
            </label>
          </div>

          {/* ADD TO CART BUTTON */}
          <button className="bg-black text-white py-4 rounded-md w-full font-medium hover:opacity-90 transition">
            Add to my cart
          </button>
        </div>
      </div>
    </div>
  );
}
