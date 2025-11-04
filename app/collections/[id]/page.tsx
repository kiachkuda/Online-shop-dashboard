"use client";
import { Product, ProductTable, CartItem } from "@/app/lib/definitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartProvider";



export default function ProductPage() {

    const [images, setImages] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [data, setData] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const [product, setProduct] = useState<CartItem>();
    const {addToCart, cartItems} = useCart();

    const fetchProduct = async (id: string) => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/products/" + id);
            //console.log(await res.json())

            const product: Product = await res.json();

            product.imageUrls =
                typeof product.imageUrls === "string"
                    ? JSON.parse(product.imageUrls)
                    : product.imageUrls;

            product.color =
                typeof product.color === "string"
                    ? JSON.parse(product.color)
                    : product.color;

            setData(product); // ✅ set state here after formatting
            setImages(product?.imageUrls);
            console.log(product)
            console.log("data", product!.id)
            

        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }


    useEffect(() => {
        // Pick Id from the URL
        const url = new URL(window.location.href);
        const id: string | undefined = url.pathname.split("/").pop();

        //setUrlpath(id!);
        fetchProduct(id!);
        setSelectedImage(images[0])


    }, []);
    useEffect(() => {
        if (data) {
            setSelectedImage(data?.imageUrls[0]);
            setSelectedColor(data?.color[0])
            const prods : CartItem = {
            id: data!.id,
            name: data!.name,
            price: data!.price,
            image: data!.imageUrls[0],
            quantity: 1
          }

          //setProduct(prods)
          console.log(prods)
        }


    }, [data]);

    return (
        <div className="lg:min-h-screen px-4 py-10 md:px-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT — IMAGE SECTION */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Thumbnail List */}
                    <div className="flex md:flex-col gap-2 justify-center">
                        {data?.imageUrls.map((img) => (
                            <button
                                key={img}
                                onClick={() => setSelectedImage(img)}
                                className={`border rounded-md overflow-hidden hover:opacity-80 ${selectedImage === img ? "border-gray-600" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={`/uploads/${img}`}
                                    alt="Product"
                                    width={80} height={80}
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1">
                        <Image
                            src={`/uploads/${selectedImage}`}
                            alt="Main Product"
                            width={600}
                            height={600}
                            className="object-cover rounded-lg shadow-sm w-full"
                        />
                    </div>
                </div>

                {/* RIGHT — DETAILS */}
                <div className="flex flex-col justify-center">

                    <h1 className="text-3xl font-serif mb-4">
                        {data?.name}
                    </h1>
                    <h1 className="text-2xl font-serif mb-4">
                        {data?.description}
                    </h1>
                    {/* DESCRIPTION */}

                    <div>
                        {cartItems.map( (item) => <>
                        <p key={item.id}>{item.id}</p>
                        </>
                         )}

                    </div>

                   
                    {/* COLOR SELECTION */}
                    <div className="mb-4">
                        <p className="font-semibold mb-2">Color — {selectedColor}</p>
                        <div className="flex gap-2">
                            {data?.color.map((color) => (
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
                        KSh1,550.00 <span className="block text-sm text-gray-500">Tax included.</span>
                    </div>



                    {/* ADD TO CART BUTTON */}
                    <button className="bg-black text-white cursor-pointer py-4 rounded-md w-full font-medium hover:opacity-90 transition"
                     onClick={ () => addToCart(product!)}
                    >
                        Add to my cart
                    </button>
                </div>
            </div>
        </div>
    );
}
