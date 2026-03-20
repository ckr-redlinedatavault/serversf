"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldAlert, ArrowRight, Loader2, Briefcase, ArrowLeft } from "lucide-react";
import Footer from "../../components/home/Footer";
import { supabase } from "@/lib/supabase";

export default function InternSigninPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/api/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/intern/signin", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("intern_user", JSON.stringify(data.user));
                router.push("/intern/dashboard"); 
            } else {
                setError(data.error || "Login failed.");
            }
        } catch (err) {
            setError("Connection error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 flex flex-col">
            {/* Minimal Navbar - Sharp Edges with Green Background */}
            <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#92E3A9]">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex h-9 items-center justify-center bg-black px-4 text-[12px] text-white transition-opacity hover:opacity-90 active:scale-[0.95] gap-2">
                        <ArrowLeft size={14} />
                        <span>Go back</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-black" />
                        <span className="text-[11px] font-bold text-black uppercase tracking-widest">Intern Access</span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex flex-col lg:flex-row">
                {/* Left Side: Visual Illustration Area */}
                <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 items-center justify-center p-12 lg:p-24 border-r border-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#92E3A9]/10 rounded-full blur-[100px] -ml-32 -mt-32" />
                    <div className="relative z-10 w-full max-w-xl">
                        <img 
                            src="https://ik.imagekit.io/dypkhqxip/Coding%20workshop-bro.svg" 
                            alt="Intern Access Illustration" 
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Right Side: Signin Form */}
                <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 bg-white relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#92E3A9]/5 rounded-full blur-[100px] -mr-32 -mb-32" />
                    
                    <div className="w-full max-w-[360px] space-y-8 relative z-10">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight">Intern Login</h1>
                                <p className="text-zinc-400 text-[13px]">Enter your intern credentials to proceed.</p>
                            </div>
                                                    {/* Google Auth - Temporarily Hidden */}
                        {/* <div className="space-y-6">
                            <button
                                onClick={signInWithGoogle}
                                type="button"
                                className="w-full flex h-12 items-center justify-center gap-3 border border-zinc-200 bg-white px-4 text-[13px] font-medium text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98]"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>Sign in with Google</span>
                            </button>

                            <div className="relative flex items-center justify-center py-2">
                                <div className="absolute w-full border-t border-zinc-100" />
                                <span className="relative bg-white px-4 text-[11px] font-medium text-zinc-300">
                                    Or login with email
                                </span>
                            </div>
                        </div> */}
                        </div>

                        <form onSubmit={handleSignin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-semibold text-zinc-700">Intern Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-zinc-100 bg-zinc-50 h-11 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                                        placeholder="intern@studentforge.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[12px] font-semibold text-zinc-700">Password</label>
                                    <Link 
                                        href="/intern/forgot-password" 
                                        className="text-[12px] font-medium text-zinc-400 hover:text-black transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-zinc-100 bg-zinc-50 h-11 pl-12 pr-4 text-sm outline-none transition-all focus:border-black"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 border border-red-50 bg-red-50/50 text-red-500 text-[11px] font-bold flex items-center gap-2">
                                    <ShieldAlert size={14} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-black text-white h-12 flex items-center justify-center gap-3 text-[14px] font-bold transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        Access Portal <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-zinc-100">
                            <p className="text-[13px] text-zinc-500 font-medium tracking-tight">
                                Not an intern yet? <Link href="/intern/signup" className="text-black font-bold border-b border-black ml-1.5">Apply Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
