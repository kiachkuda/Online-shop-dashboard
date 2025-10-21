'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import clsx from 'clsx';

export default function LoginForm() {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    // You can add your authentication logic here
    const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            email,
            password,
        }),
        });
        
    if(res.ok && res.status == 200){
        const data = await res.json();
        console.log("Login successful:", data);
        // Redirect or update UI on successful login
        router.push('/dashboard');
        setSuccess(true);
        setError('');
    } else {
        const errorData = await res.json();
        console.error("Login failed:", errorData);
        // Show error message to the user
        setError(errorData.error);
        setTimeout(() => { setError(''); }, 3000); // Clear error after 5 secondss
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
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
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                className={clsx("peer block w-full rounded-md outline-gray-200   py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500",{ "outline-red-400" : error})}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1 mt-5">
          {/* Add form errors here */}
          {error && (
            <div className="flex items-center space-x-1 p-2 text-sm w-full mt-3 rounded-md bg-red-500">
              <ExclamationCircleIcon className="h-4 w-4 text-white" />
              <span className="text-white">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center space-x-1 p-2 text-sm w-full mt-3 rounded-md bg-green-500">
              <span className="text-white">Login successful!</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          No account?{' '}
          <a
            href="/auth/signup"
            className="text-blue-600 underline transition hover:text-blue-700"
          >
            Sign up
          </a>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <a
            href="/auth/forgot-password"
            className="text-blue-600 underline transition hover:text-blue-700"
          >
            Forgot password?
          </a>
        </div>
       
      </div>
    </form>
  );
}
