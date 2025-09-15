import { Shoe } from "@/app/lib/definitions";
import { shoesData } from "@/app/lib/data";
export default async function ProductsTable() {
  
    const Products = shoesData;
  return (
    <div className="mt-6 flow-root">
      <table className='table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>B. Price</th>
                <th>S. Price</th>
                <th>Stock</th>
            </tr>
        </thead>
       <tbody>
           {Products.map((product:Shoe) =>{
            return(
                <>
                <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.id}</td>
                    <td>{product.price}</td>
                     <td>{product.price}</td>
                    <td>{product.status}</td>
                </tr>
                </>
            )
           } )}
       </tbody>
        
      </table>
    </div>
  );
}