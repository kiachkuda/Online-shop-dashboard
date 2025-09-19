"use client";

import { useState } from "react";
import { json } from "stream/consumers";
import {list} from '@vercel/blob'

export default function CreateForm() {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleAddSize = () => {
    if (sizeInput.trim() !== "") {
      setSizes([...sizes, sizeInput]);
      setSizeInput("");
    }
  };

  const handleAddColor = () => {
    if (colorInput.trim() !== "") {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    
   
    formData.append("description", form.description.value);
    formData.set("brand", form.brand.value);
    formData.set("gender", form.gender.value);
     formData.set("name", name);
    formData.set("buyingPrice", form.buyingPrice.value);
    formData.set("price", form.sellingPrice.value);
    formData.set("discount", form.discount.value);
   
    images.forEach((file) => formData.set("images", file));

    sizes.forEach((size) => formData.set("sizes", size));
    colors.forEach((color) => formData.set("colors", color));

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSizes([]);
      setColors([]);
      setSizeInput("");
      setColorInput("");
      setImages([]);
      (e.target as HTMLFormElement).reset();
      alert("Product created!");
      window.location.href = `/dashboard/products`;
    } else {
      alert("Error creating product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Name</label>
        <input type="text" name="name" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Description</label>
        <input type="text" name="description" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Brand Name</label>
        <input type="text" name="brand" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Category</label>
        <select name="gender" className="w-full rounded-lg p-2 outline-1">
          <option>Select Category...</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* sizes */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">sizes</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            className="flex-1 rounded-lg p-2 outline-1"
          />
          <button type="button" onClick={handleAddSize} className="bg-green-300 px-2 rounded-md">
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((c, i) => (
            <span key={i} className="px-2 py-1 bg-gray-200 rounded">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Colors</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            className="flex-1 rounded-lg p-2 outline-1"
          />
          <button type="button" onClick={handleAddColor} className="bg-green-300 px-2 rounded-md">
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c, i) => (
            <span key={i} className="px-2 py-1 bg-gray-200 rounded">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Buying Price</label>
        <input type="number" name="buyingPrice" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Selling Price</label>
        <input type="number" name="sellingPrice" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Discount Price</label>
        <input type="number" name="discount" className="w-full rounded-lg p-2 outline-1" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-black">Product Images</label>
        <input type="file" multiple onChange={handleImageChange} className="w-full rounded-lg p-2 outline-2" />
      </div>

      <button type="submit" className="bg-blue-300 px-8 py-3 font-bold text-xl rounded-md hover:bg-blue-500">
        Submit
      </button>
    </form>
  );
}
