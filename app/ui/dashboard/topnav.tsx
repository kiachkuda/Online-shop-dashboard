import Search from "../search";
import UserProfile from "./user-profile";
import { MoonIcon, SunIcon, BellIcon } from "@heroicons/react/24/outline";

export default function TopNav() {
    return (
        <div className="flex flex-row justify-between items-center gap-6 px-8 py-4 md:px-4 rounded-lg w-full shadow-sm">
            {/* Title */}
            <div className="flex-none flex-col md:flex gap-1 lg:w-64">
                <h3 className="text-2xl font-bold">Dashoard</h3>
                <h5 className="text-md">Manage your Mtush Site</h5>
            </div>

            <div className="flex gap-6 px-4 items-center">
            {/* Search bar */}
                <div className="">
                <Search placeholder="Search Items"/>
                </div>

                {/* Theme Icons */}
                <div className="hidden md:flex gap-4 border px-4 py-2 rounded-full">
                    <SunIcon className="h-6 w-6 cursor-pointer text-gray-600 hover:text-blue-600" />
                    <MoonIcon className="h-6 w-6 cursor-pointer text-gray-600 hover:text-blue-600" />
                </div>
                {/* Notifications Icon */}
                <div className="hidden md:block gap-4 relative">
                    <BellIcon className="h-8 w-8 cursor-pointer text-gray-600 hover:text-blue-600" />
                    <div className="absolute -top-2 left-1 w-4 h-4 p-2 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                        <span>2</span>
                    </div>
                </div>
                
            </div>
            {/* UserProfile */}
                <UserProfile />
        </div>
    )
}