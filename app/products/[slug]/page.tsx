"use client";
import { Product, ProductTable, CartItem } from "@/app/lib/definitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartProvider";
import { usePathname } from "next/navigation";



export default function ProductPage() {

    const [images, setImages] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [data, setData] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [product, setProduct] = useState<CartItem>();
    const { addToCart, cartItems } = useCart();
    const pathname = usePathname();

     const fetchProduct = async (id: string) => {
        try {
            const res = await fetch("/api/products/" + id);
            

            const product : Product = await res.json();
            console.log(product)


            const images: string[] = Array.isArray(product.imageUrls)
                ? product.imageUrls
                : (JSON.parse(product.imageUrls || "[]") as string[]);

            const sizeArray: string[] = Array.isArray(product.sizes)
                ? product.sizes
                : (JSON.parse(product.sizes || "[]") as string[]);
            const colorArray: string[] = Array.isArray(product.colors)
                ? product.colors
                : (JSON.parse(product.colors || "[]") as string[]);
           
            
             setImages(images);
            setSelectedImage(images[0] || null)
           

            setSelectedColor(colors[0] || null);
            setColors(colorArray);

            setData(product);
            

           

        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }


    useEffect(() => {
        // Pick Id from the URL\
        
       
        const id: string | undefined = pathname.split("/").pop();
        console.log(pathname)
        //setUrlpath(id!);
        fetchProduct(id!);
       
       

    }, []);
    useEffect(() => {
        if (data) {
            const prods: CartItem = {
                id: data!.id,
                name: data!.name,
                price: data!.price,
                image: images[0],
                quantity: 1
            }

            setProduct(prods)
            console.log(prods)
        }


    }, [data]);

    return (
        <div className="lg:min-h-screen px-4 py-10 md:px-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT — IMAGE SECTION */}
                <div className="flex flex-col   gap-4">
                    {/* Thumbnail List */}
                    <div className="flex md:flex-row flex-row gap-2 justify-center">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(img)}
                                className={`border rounded-md overflow-hidden hover:opacity-80 ${selectedImage === img ? "border-gray-600" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt="Product"
                                    width={80}
                                    height={80}
                                    priority
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 aspect-[2/2] relative">
  {selectedImage ? (
    <Image
      src={selectedImage}
      fill
      alt="Product image"
      className="w-[100%] h-[100%] object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
      No image
    </div>
  )}
</div>

                </div>

                {/* RIGHT — DETAILS */}
                <div className="flex flex-col justify-center">

                    <h1 className="text-3xl font-serif mb-4">
                        {data?.name}
                    </h1>
                    {/* DESCRIPTION */}
                    <h1 className="text-2xl font-serif mb-4">
                        {data?.description}
                    </h1>
                    



                    {/* COLOR SELECTION */}
                    <div className="mb-4">
                        <p className="font-semibold mb-2">Color — {selectedColor}</p>
                        <div className="flex gap-2">
                            {colors.map((color, i) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                                        ? "border-gray-700"
                                        : "border-gray-300"
                                        }`}
                                    style={{
                                        backgroundColor: `${color}`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-lg font-semibold mb-4">
                        KSh{data?.price} <span className="block text-sm text-gray-500">Tax included.</span>
                    </div>



                    {/* ADD TO CART BUTTON */}
                    <button className="bg-black text-white cursor-pointer py-4 rounded-md w-full font-medium hover:opacity-90 transition"
                        onClick={() => addToCart(product!)}
                    >
                        Add to my cart
                    </button>
                </div>
            </div>
        </div>
    );
}
