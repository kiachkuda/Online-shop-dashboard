"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/lib/definitions";
import Categories, { CategoryType } from "./Categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6); // number of products per page
  const [sort, setSort] = useState('DESC');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryType[]>([])

   const searchParams = useSearchParams();
      const router = useRouter();
      const pathname = usePathname();


  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories()
  }, [currentPage, limit, sort, category]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        category
      });

      const res = await fetch(
        `api/products?${query.toString()}`
      );
      const data = await res.json();
      // Extract directly based on your response structure
      setProducts(data.results);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.total_pages || 1);
      
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
     const res = await fetch(
        `api/categories`
      );
      const cats = await res.json();

      setCategories(cats.results)
    
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    //window.scrollTo({ top: 0, behavior: "smooth" });
     router.push(`${pathname}/?${params}/#products`)
  };

  const handleChange = (value:string) => {
        const params = new URLSearchParams(searchParams);
        params.set("category", value || '');
        setCategory(value)
        router.push(`${pathname}/?${params}/#products`)
    }

  return (
    <div className="w-full bg-gray-500 p-6 mt-2" id="products">

      <Categories handleChange={handleChange} categories={categories} />
      {loading ? (
        <p className="text-center text-gray-500" >Loading products...</p>
      ) : (
        <>
          {/* Product Grid */}
          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-2
              md:grid-cols-2 
              lg:grid-cols-6
              gap-2
              lg:gap-1
              mt-4
            "
          >
            {
              products.map((p, i) => <ProductCard key={i} {...p} />)
            }
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
                  className={`px-4 py-2 rounded ${currentPage === i + 1
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
