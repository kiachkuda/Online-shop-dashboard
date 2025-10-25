"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Slide {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    title: "HAPPY HOLIDAYS",
    subtitle: "It's the best time of the year!",
    discount: "GET UP TO 70% OFF",
    image: "/images/sale1.jpg",
    buttonText: "SHOP NOW",
  },
  {
    title: "NEW COLLECTION",
    subtitle: "Discover your new style",
    discount: "FRESH LOOKS FOR YOU",
    image: "/images/sale2.jpg",
    buttonText: "EXPLORE",
  },
  {
    title: "LIMITED OFFER",
    subtitle: "Hurry before it’s gone!",
    discount: "EXTRA 50% OFF",
    image: "/images/bag-1.jpeg",
    buttonText: "BUY NOW",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-4 mb-8 sm:mb-8">
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16"
          >
            {/* Left Section */}
            <div className="text-center md:text-left max-w-md space-y-4 z-10">
              <p className="text-gray-500 uppercase tracking-wide text-sm">
                {slides[current].subtitle}
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {slides[current].title}
              </h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-black">
                {slides[current].discount}
              </h3>
              <button className="mt-4 px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition font-medium">
                {slides[current].buttonText}
              </button>
            </div>

            {/* Right Section */}
            <div className="relative p-6 w-full md:w-1/2 h-[250px] md:h-[450px] mt-8 mb-3 md:mt-0">
              
              {/* On Mobile Screen */}
              <div className="md:hidden block absolute inset-0 items-center justify-center">  
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  priority
                  className="object-contain md:object-right block md:hidden w-auto mx-auto"
                  width={250}
                  height={250}
                />
              </div>
              
              {/* On Desktop Screen */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center">  
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  priority
                  className="object-contain md:object-right w-auto h-auto mx-auto"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-black w-6" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
