import { Button } from "../button";

export default function CreateForm(){
    return (
        <form className="mt-4">
            <div className="flex flex-col gap-1 mb-3">
                <label className="w-full font-black">Name</label>
                <input type="text" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label className="w-full font-black">Description</label>
                <input type="text" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Brand Name</label>
                <input type="text" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Category</label>
                <select className="w-full rounded-lg p-2 outline-1">
                    <option>Select Gender Category...</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Size</label>
                <input type="number" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Color</label>
                <input type="text" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Purchase Price</label>
                <input type="number" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Selling Price</label>
                <input type="number" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
            <div className="shadow-sm flex flex-col gap-1 mb-4">
                <label className="w-full font-black">Product Images</label>
                <input type="file[]" className="w-full rounded-lg p-2 outline-1" name="title" />
            </div>
           <button className="btn bg-blue-300 p-2 rounded-md">Submit</button>
        </form>
    )
}