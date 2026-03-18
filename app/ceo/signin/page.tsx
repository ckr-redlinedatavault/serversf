"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldAlert, ArrowRight, Loader2, Crown, Home, ArrowLeft } from "lucide-react";
import Footer from "../../components/home/Footer";

export default function CEOSigninPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/ceo/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("ceo_user", JSON.stringify(data));
                router.push("/ceo/dashboard");
            } else {
                setError(data.error || "Authentication failed.");
            }
        } catch (err) {
            setError("Connection failed. Check your network.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 flex flex-col">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[14px] tracking-tight">Go back</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-[#92E3A9]" />
                        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Office Access</span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex flex-col lg:flex-row">
                {/* Left Side: Clean Typography Area */}
                <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 flex-col items-center justify-center p-24 border-r border-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-zinc-100/50 rounded-full blur-[100px] -ml-32 -mt-32" />
                    <div className="max-w-md w-full space-y-12 relative z-10">
                        <div className="w-20 h-20 border border-zinc-900 flex items-center justify-center text-zinc-900 shadow-2xl shadow-black/5">
                            <Crown size={32} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight">Internal Office Login</h2>
                            <p className="text-zinc-500 text-[16px] leading-relaxed">
                                Login to manage the platform and check team updates. 
                                Everything is synced and ready for your review.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Simple Access Form */}
                <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 bg-white relative overflow-hidden">
                    {/* Decorative spot */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#92E3A9]/5 rounded-full blur-[100px] -mr-32 -mb-32" />
                    
                    <div className="w-full max-w-[400px] space-y-10 relative z-10">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">Office Login</h1>
                            <p className="text-zinc-400 text-[14px]">Please login with your office details.</p>
                        </div>

                        <form onSubmit={handleSignin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Office Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-zinc-100 bg-zinc-50 h-12 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                                        placeholder="office@studentforge.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Office Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-zinc-100 bg-zinc-50 h-12 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 border border-red-50 bg-red-50/50 text-red-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <ShieldAlert size={14} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-black text-white h-14 flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-50 mt-4"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        Enter Office <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
