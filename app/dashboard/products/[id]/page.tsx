'use client'

import { useEffect, useState } from "react";
import { NextRequest } from "next/server";
import { ProductTable } from "@/app/lib/definitions";
import ProductsTable from "@/app/ui/products/table";
import clsx from "clsx";
export default function Page(req: NextRequest ){

    const [data, setData] = useState<ProductTable>();
    const [isEditing, setIsEditing] = useState(false);
    const [urlpath, setUrlpath] = useState("");

    const  fetchProduct = async(id: string) => {
      try {
        const res = await fetch("/api/products/"+id);
        setData(await res.json());
        console.log(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } 
    }
    useEffect(() => {
        // Pick Id from the URL
        const url = new URL(window.location.href);
        const id = url.pathname.split("/").pop();
        setUrlpath(id!);
        fetchProduct(id!);
      }, []);

      const updateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append("name", (e.target as any).name.value);
        formData.append("description", (e.target as any).description.value);
        //formData.append("brand", (e.target as any).brand.value);
        //formData.append("gender", (e.target as any).gender.value);
        
        //formData.append("buyingPrice", (e.target as any).buyingPrice.value);
        formData.append("price", (e.target as any).price.value);
        formData.append("discount", (e.target as any).discount.value);
        formData.append('available', (e.target as any).available.value)

        try {
          const res = await fetch("/api/products/" + urlpath, {
            method: "PUT",
            body: formData,
          });
            if (res.ok) {
                fetchProduct(urlpath);

                alert("Data Updated");

                window.location.href = `/dashboard/products`;
            }
        } catch (err) {
          console.error("Error updating product:", err);
        }
        };


    return (
        <div>
            <h1>Edit Product Details</h1>
            <div className="mt-6 p-5 bg-gray-100 ">
                <form className="space-y-4" onSubmit={updateProduct}>
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" name="name" defaultValue={data?.name} className="mt-1 block w-full border bg-gray-300 border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed" disabled={true} />
                    </div>
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea  name="description"  defaultValue={data?.description} className="mt-1 block w-full border bg-grey-300 border-gray-300 rounded-md shadow-sm p-2 "></textarea>
                    </div>
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Buying Price</label>
                        <input type="number" name="buyingPrice" defaultValue={data?.buyingPrice} className="mt-1 block w-full border bg-gray-300 border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed" disabled={true} />
                    </div>
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                        <input type="number" name="price" defaultValue={data?.price} className="mt-1 block w-full border border-gray-300 bg-grey-100 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input type="number" name="discount" defaultValue={data?.discount} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                
                    <div className="p-1">
                        <label className="block text-sm font-medium text-gray-700">Available</label>
                        <select name="available" defaultValue={data?.available ? "true" : "false"} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>
                    <div className="p-1">
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}