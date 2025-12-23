"use client"

import { useAuthState } from "@/app/Hooks/AuthHook"
import LoginForm from "@/app/ui/login-form"
import { useRouter } from "next/navigation";
import {  useEffect } from "react"

export default function Page() {

    const {isAuthenticated} = useAuthState();
    const router = useRouter();

    useEffect( () => {
      if(isAuthenticated) router.push('/dashboard')
    })
    return <div className="flex flex-col flex-shrink py-5 justify-center w-full align-center items-center">
      <h2 className="text-2xl font-bold mb-8 px-5">Sign In To Mtush</h2>
      <LoginForm />
    </div>
}