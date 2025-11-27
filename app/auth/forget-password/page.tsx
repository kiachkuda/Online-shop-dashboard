"use client";

import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function ForgotPasswordPage() {
    //const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch("/api/auth/forgetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setMessage("✅ Verification code sent to your email.");
            
            router.push('/auth/resetPassword');
        } catch (err) {
            const errMsg = err instanceof Error ? err.message : typeof err === "string" ? err : JSON.stringify(err);
            setError("Failed::" + errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex max-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    Forgot Password
                </h1>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Enter your email address to receive a password reset code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required

                            name="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Code"}
                    </button>
                </form>

                {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
}
