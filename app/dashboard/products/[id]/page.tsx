'use client'

import { useEffect, useState } from "react";
import { NextRequest } from "next/server";
export default function Page(req: NextRequest ){

    const [data, setData] = useState(null);

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
        fetchProduct(id!);
      }, []);

    return (
        <div>
            <h1>Single Product Page</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}