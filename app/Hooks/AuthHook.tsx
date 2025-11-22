"use client";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
export const useAuthState = () => {
 const context = useContext(AuthContext);
 if (!context) {
   throw new Error("useAppState must be used within an AppContextProvider");
 }
 return context;
};