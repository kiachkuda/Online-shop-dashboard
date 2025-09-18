'use client'

import { Product } from "@/app/lib/definitions";

import { useState, useEffect } from "react";
import Image from "next/image";
import DeleteModal from "./delete-button";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalProductId, setModalProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []); 

  const  fetchProducts = async() => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    const deleteProduct = async (id: string) => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setProducts(products.filter((product) => product._id !== id));
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }   
};
  
  return (

    <div className="mt-6 flow-root">
      <table className='border-collapse border border-slate-400 table-auto w-full text-sm'>
        <thead>
            <tr className="bg-gray-200 text-lg p-2">
               <th>Product ID</th>
                <th className="border border-gray-200 p-2">Name</th>
                <th className="border border-gray-200">B. Price</th>
                <th className="border border-gray-200">S. Price</th>
                <th className="border border-gray-200">Stock</th>
                <th className="border border-gray-200">Edit</th>
                <th className="border border-gray-200">Delete</th>
            </tr>
        </thead>
       <tbody>
           {products.map((product:Product) =>{
            return(
                
                <tr className="hover:bg-gray-100 text-lg text-center p-2" key={product._id}>
                   <td>{product._id}</td>
                    
                    <td className="border border-gray-200 p-1" >{product.price}</td>
                     <td className="border border-gray-200 p-1">{product.price}</td>
                    <td className="border border-gray-200 p-1">{product.available ? <>In Stock</>:<>Out Of Stock</>}</td>
                    <td className="border border-gray-200">
                      <a href={`/dashboard/products/${product._id}` }>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" >Edit</button>
                      </a>
                      
                    </td>
                    <td className="border border-gray-200">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => setModalProductId(product._id)}
                      >
                        Delete
                      </button>
                     
                      {modalProductId === product._id && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white p-6 rounded shadow-lg text-center">
                            <p>Are you sure you want to delete this product?</p>
                            <div className="mt-4 flex justify-center gap-4">
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded"
                                onClick={async () => {
                                  await deleteProduct(product._id);
                                  setModalProductId(null);
                                }}
                              >
                                Yes, Delete
                              </button>
                              <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setModalProductId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                </tr>
                
            )
           } )}
       </tbody>
        
      </table>
    </div>
  );
}