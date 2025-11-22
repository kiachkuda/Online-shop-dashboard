'use client'
import React, { useState } from "react";




const OTP_LENGTH = 6;

export default function VerifyPage() {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    React.useEffect(() => {
        const fetchEmail = async () => {
            try {
                const res = await fetch("/api/auth/getcookies", { method: "GET"  });
                if (res.ok) {
                    const data = await res.json();
                    setEmail(data.email);
                    console.log("Fetched email:", data.email);
                } else {
                    setError("Failed to fetch email from cookies.");
                }
            } catch (err) {
                setError("An error occurred while fetching email.");
            }
        };
        fetchEmail();
        
    }, []);

    const handleChange = (value: string, idx: number) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && idx < OTP_LENGTH - 1) {
            const nextInput = document.getElementById(`otp-${idx + 1}`);
            nextInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "");
        if (pasteData.length === OTP_LENGTH) {
            setOtp(pasteData.split(""));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.some((digit) => digit === "")) {
            setError("Please enter all 6 digits.");
            setSuccess(false);
            return;
        }

        try{
                const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: otp.join("") }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Verification failed.");
                setSuccess(false);
                 return;
            }else{
                 setSuccess(true);
                 setError("");
                    // Redirect to login page after 2 seconds
                    setTimeout(() => {
                        window.location.href = `/pages/login`
                    }, 1500);
                    return;
            }
        }catch(err){
            setError("An error occurred during verification.");
            setSuccess(false);
            return;
        }
            
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Check your email</h2>
                <p className="mb-4 text-gray-600 text-center">
                    Enter the 6-digit code sent to.
                </p>
                <p className="mb-4 text-gray-600 text-center font-bold">{email}</p>
                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            onPaste={handlePaste}
                            className="w-10 h-12 text-center border rounded text-xl focus:outline-blue-500"
                            autoFocus={idx === 0}
                        />
                    ))}
                </div>
                {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                {success && (
                    <div className="text-green-500 mb-2 text-center">
                        OTP Verified Successfully!
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Verify
                </button>
            </form>
        </div>
    );
}