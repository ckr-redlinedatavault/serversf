"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldAlert, ShieldCheck, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Footer from "../../components/home/Footer";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing reset token.");
        }
    }, [token]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/intern/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || "Failed to reset password.");
            }
        } catch (err) {
            setError("Connection failed. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border border-[#92E3A9] bg-[#92E3A9]/5 space-y-4">
                    <div className="h-10 w-10 bg-[#92E3A9] flex items-center justify-center">
                        <ShieldCheck size={20} className="text-black" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[14px] font-bold text-black">Password Updated</p>
                        <p className="text-[13px] text-zinc-500 leading-relaxed">
                            Your password has been securely updated. You can now access your intern portal using your new credentials.
                        </p>
                    </div>
                </div>
                <Link 
                    href="/intern/signin"
                    className="w-full flex h-12 items-center justify-center bg-black text-white text-[13px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    Return to Login
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-6">
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-zinc-700">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-zinc-100 bg-zinc-50 h-11 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                            placeholder="At least 8 characters"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-zinc-700">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                        <input
                            required
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-zinc-100 bg-zinc-50 h-11 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                            placeholder="Repeat password"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 border border-red-50 bg-red-50/50 text-red-500 text-[11px] font-bold flex items-center gap-2">
                    <ShieldAlert size={14} />
                    <span>{error}</span>
                </div>
            )}

            <button
                disabled={loading || !token}
                type="submit"
                className="w-full bg-black text-white h-12 flex items-center justify-center gap-3 text-[14px] font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        Update Password <ArrowRight size={16} />
                    </>
                )}
            </button>
        </form>
    );
}

export default function InternResetPasswordPage() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 flex flex-col">
            {/* Minimal Navbar - Sharp Edges with Green Background */}
            <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#92E3A9]">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/intern/signin" className="flex h-9 items-center justify-center bg-black px-4 text-[12px] text-white transition-opacity hover:opacity-90 active:scale-[0.95] gap-2">
                        <ArrowLeft size={14} />
                        <span>Go back</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-black" />
                        <span className="text-[11px] font-bold text-black uppercase tracking-widest">Update Access</span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex flex-col lg:flex-row">
                {/* Left Side: Visual Illustration Area */}
                <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 items-center justify-center p-12 lg:p-24 border-r border-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#92E3A9]/10 rounded-full blur-[100px] -ml-32 -mt-32" />
                    <div className="relative z-10 w-full max-w-xl">
                        <img 
                            src="https://ik.imagekit.io/dypkhqxip/Reset-password-bro.svg" 
                            alt="Reset Password Illustration" 
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Right Side: Reset Form */}
                <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 bg-white relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#92E3A9]/5 rounded-full blur-[100px] -mr-32 -mb-32" />
                    
                    <div className="w-full max-w-[360px] space-y-8 relative z-10">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight">Access Recovery</h1>
                                <p className="text-zinc-400 text-[13px]">Enter your new password below to reset.</p>
                            </div>
                        </div>

                        <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin mx-auto text-zinc-300" />}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
