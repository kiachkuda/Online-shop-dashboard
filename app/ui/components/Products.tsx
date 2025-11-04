"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/lib/definitions";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // number of products per page
  const [sort, setSort] = useState('DESC');
  

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, limit, sort]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
try {
    const query = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort,
        });
   
    
      const res = await fetch(
        `http://localhost:5000/api/v1/products?${query.toString()}`
      );
      const data = await res.json();
      // Extract directly based on your response structure
      console.log("data.results");
      setProducts(data.results);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Featured Bags
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <>
          {/* Product Grid */}
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5
              gap-6
              xl:gap-3
              justify-between
              items-center
              m-auto
            "
          >
            {products.length > 0 ? (
              products.map((p, i) => <ProductCard key={i} {...p} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
