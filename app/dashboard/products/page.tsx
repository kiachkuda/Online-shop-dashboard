import CreateForm from "@/app/ui/products/create-form";
import ProductsTable from "@/app/ui/products/table";

export default function Page(){
    return (
        <div>
            <h1>Products Page</h1>
            <CreateForm />
            <h1>List of products</h1>
            <ProductsTable />
        </div>
    )
}