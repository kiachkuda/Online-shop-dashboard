"use client";

import { useState } from "react";
import Image from "next/image";
import { PowerIcon,  } from "@heroicons/react/24/outline";



const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: '/lee-robinson.png',
};

export default function UserProfile() {
    const [showDetails, setShowDetails] = useState(false);

    const handleImageClick = () => setShowDetails((prev) => !prev);

    const handleLogout = () => {
        alert("Logged out!");
    };

    return (
        <div className="flex gap-2 relative items-center">
            <Image
                src={user.avatar}
                alt="User Avatar"
                width={48}
                height= {48}
                className="rounded-full"             
                onClick={handleImageClick}
            />
            <p>Samuel Kiarie</p>
            {showDetails && (
                <div
                    style={{
                        position: "absolute",
                        top: 70,
                        right: 0,
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        borderRadius: 8,
                        padding: 16,
                        minWidth: 250,
                        zIndex: 10,
                    }}
                >
                    <div className="flex flex-col mb-4 text-center">
                        <div className="flex flex-row gap-2">
                            <Image
                                src={user.avatar}
                                alt="User Avatar"
                                width={32}
                                height= {32}
                                className="rounded-full"             
                                
                            />
                            <div className="text-left">
                            <strong>{user.name}</strong>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div
                        onClick={handleLogout}
                        className="flex flex-row gap-2 w-full p-2 rounded-sm text-white bg-red-400"
                    >
                       <PowerIcon className="w-6" /> 
                       <span>Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
}