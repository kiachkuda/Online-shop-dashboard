import CreateForm from "@/app/ui/products/create-form";
import ProductsTable from "@/app/ui/products/table";
import Link from "next/link";

export default function Page(){
    return (
        <div>
            <div className="flex justify-end">
                <Link href={'/dashboard/products/addProduct'}>
                <button 
                    className="p-3 text-xl  border-gray-300 bg-blue-500 rounded-3xl cursor-pointer text-white">
                    Add new Product
                </button>
                </Link>
            </div>
            <h1 className="font-bold text-xl">List of products</h1>
            <ProductsTable />
        </div>
    )
}