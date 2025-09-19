import CreateForm from "@/app/ui/products/create-form";
import ProductsTable from "@/app/ui/products/table";

export default function Page(){
    return (
        <div className="flex flex-col p-2">
            <div className="px-8 py-5 bg-gray-400 rounded-t-lg ">
                <h1 className="font-bold text-xl">Add new Product</h1>
            </div>
            <div className="px-8 py-5 bg-gray-100 rounded-b-lg ">
                <CreateForm />
            </div>
        </div>
    )
}