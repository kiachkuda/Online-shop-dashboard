'use client'

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    UserCircleIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useState } from 'react';
import { User } from '../lib/definitions';
import clsx from 'clsx';



export default function SignUpForm() {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData();
        const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
        const firstname = (form.elements.namedItem("firstname") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;


        

        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
            }),
            });
            
        if(res.ok && res.status == 201){
            const data = await res.json();
            setSuccess(true);
            setMsg(data.message)
            // Redirect to verify page after 2 seconds
            setTimeout(() => {
                window.location.href = `/auth/verify?email=${encodeURIComponent(email)}`;
            }, 2000);
           
        }else{
             const data = await res.json();
            if(res.status == 400) {
                if(data.errorType == "name"){
                    setNameError(true);
                    setEmailError(false);
                    setPasswordError(false);
                    setTimeout(() => {
                        setNameError(false);
                    }, 5000);
                }
                if(data.errorType == "email"){
                    setEmailError(true);
                    setNameError(false);
                    setPasswordError(false);
                    setTimeout(() => {
                        setEmailError(false);
                    }, 5000);
                }
                if(data.errorType == "password"){
                    setPasswordError(true);
                    setNameError(false);
                    setEmailError(false);
                    setTimeout(() => {
                        setPasswordError(false);
                    }, 5000);
                }
               
                setError(data.error);
                
            }
        }
     }

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Create an account
                </h1>

                <div className={clsx({"hidden" : !success}, {"flex items-center space-x-1 p-2 text-sm w-full rounded-md bg-green-500": success})}>
                    <ExclamationCircleIcon className="h-4 w-4 text-white" />
                    <span className="text-white">{msg}</span>
                </div>
                
                <div className="w-full">
                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-5">  
                            
                             <div className='w-full'>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="firstname"
                            >
                                First Name
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter your First name"
                                    
                                />
                                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="lastname"
                            >
                                Last Name
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter your last name"
                                    
                                />
                                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>

                        </div>
                        <div className={clsx({"hidden" : !nameError}, {"flex items-center space-x-1 p-2 text-sm w-full rounded-md bg-red-500": nameError})}>
                            <ExclamationCircleIcon className="h-4 w-4 text-white" />
                            <span className="text-white">Firstname and lastname are required</span>
                        </div>
                    </div>

                    <div className='flex flex-col '>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div className={clsx({"hidden" : !emailError}, {"flex items-center space-x-1 p-2 text-sm w-full mt-3 rounded-md bg-red-500": emailError})}>
                            <ExclamationCircleIcon className="h-4 w-4 text-white" />
                            <span className="text-white">{error}</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                               
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div className={clsx({"hidden" : !passwordError}, {"flex items-center space-x-1 p-2 text-sm w-full mt-3 rounded-md bg-red-500": passwordError})}>
                            <ExclamationCircleIcon className="h-4 w-4 text-white" />
                            <span className="text-white">{error}</span>
                        </div>
                    </div>
                </div>
                <Button className="mt-4 w-full">
                    Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                
            </div>
        </form>
    );
}
