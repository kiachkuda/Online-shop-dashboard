import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useState } from 'react'
export default function SearchBar () {
 const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
    return (
        
              <div
                className={`flex items-center bg-gray-100 rounded-full px-3 py-2 transition-all duration-300 ${
                  focused ? "md:w-80 sm:w-64" : "md:w-48 sm:w-24"
                }`}
              >
                <MagnifyingGlassIcon className="text-gray-500 h-5 w-10" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent min-w-12  ml-2 w-full text-sm  md:block"
                />
              </div>
    )

}