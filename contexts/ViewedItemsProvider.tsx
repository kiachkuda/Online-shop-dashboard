"use client"

import { Product} from "@/app/lib/definitions";
import { useContext, useState, useEffect, createContext } from "react"


export type ViewedItemsContextType = {
  viewedItems: Product[];
  addItem: (product: Product) => void;
}


const ViewedItemContext = createContext<ViewedItemsContextType>({
    viewedItems : [],
    addItem : () => {}
});

export const useViewedItems = () => useContext(ViewedItemContext);

 const ViewedItemsProvider = ({ children }: { children: React.ReactNode }) => {

    const [viewedItems, setViewedItems] = useState<Product[]>([]);

    // Load Saved Items
    useEffect(() => {
        const saved = localStorage.getItem("viewed_items");
        if (saved) setViewedItems(JSON.parse(saved));
    }, [])

    useEffect( () => {
        localStorage.setItem("viewed_items", JSON.stringify(viewedItems))
    },[viewedItems])

    
    const addItem = (product: Product) => {
        setViewedItems((prev) => {

            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev;
            }

            return [...prev, product];
        })
    }

    return (
        <ViewedItemContext.Provider value={{addItem, viewedItems}}>
            {children}
        </ViewedItemContext.Provider>
    )
}

export default ViewedItemsProvider;