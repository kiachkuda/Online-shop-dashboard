"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SideNav() {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState(500);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const categories = ["Electronics", "Clothing", "Home Decor", "Books", "Toys"];
  const colors = [
    { name: "Red", hex: "#ef4444" },
    { name: "Blue", hex: "#3b82f6" },
    { name: "Green", hex: "#22c55e" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  return (
    <aside className="w-64 bg-white shadow-lg rounded-xl p-4 space-y-6 hidden sm:hidden md:block">
      {/* ---------- CATEGORY FILTER ---------- */}
      <div>
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-700"
        >
          Categories
          {categoryOpen ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </button>

        <AnimatePresence>
          {categoryOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3 space-y-2 ml-2"
            >
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 text-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-blue-600"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- PRICE RANGE FILTER ---------- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <p className="text-gray-600 text-sm mt-1">Up to ${price}</p>
      </div>

      {/* ---------- COLOR FILTER ---------- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Color</h3>
        <div className="flex flex-wrap gap-3 ml-1">
          {colors.map((color) => (
            <div
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`flex items-center space-x-2 cursor-pointer transition ${
                selectedColors.includes(color.name)
                  ? "ring-2 ring-blue-500 rounded-full"
                  : ""
              }`}
            >
              <span
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
              ></span>
              <span className="text-gray-600 text-sm">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- APPLY BUTTON ---------- */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          console.log({
            categories: selectedCategories,
            price,
            colors: selectedColors,
          });
        }}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Filters
      </motion.button>
    </aside>
  );
}
