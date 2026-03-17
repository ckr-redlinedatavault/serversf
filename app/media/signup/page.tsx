"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function MediaSignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/media/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col font-sans">
                <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                    </Link>
                </nav>
                <div className="flex-1 flex items-center justify-center p-6 bg-[#92E3A9]">
                    <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl">
                        <div className="mb-8 flex justify-center">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Registration Sent</h1>
                        <p className="text-zinc-500 mb-8 text-sm leading-relaxed">
                            Your credentials have been submitted for CTO verification. Please wait for an authorization before you can access the hub.
                        </p>
                        <Link 
                            href="/media/signin"
                            className="inline-block w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-900 transition-all shadow-lg"
                        >
                            Return to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Standard Navbar */}
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                        <div className="h-4 w-[1px] bg-zinc-900/20" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">SERVERS</span>
                    </Link>
                </div>
                <div className="flex gap-8">
                    <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
                    <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Side: Illustration */}
                <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 flex-col items-center justify-center p-12">
                    <div className="max-w-md w-full text-center">
                        <img 
                            src="https://ik.imagekit.io/2p9n38dfhk/media-signup.png?ik-sdk-version=javascript-1.4.3&updatedAt=1710682000000" 
                            alt="Media Team Signup Illustration" 
                            className="w-full h-auto mb-10 mix-blend-multiply"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://illustrations.popsy.co/gray/creative-work.svg";
                            }}
                        />
                        <h2 className="text-2xl font-bold text-zinc-900 mb-4 text-left">Become a Coordinator</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed text-left">
                            Join the elite circle of media creators at Student Forge. Manage assets, direct productions, and grow the student ecosystem with your vision.
                        </p>
                    </div>
                </div>

                {/* Right Side: Green Background + Form */}
                <div className="flex-1 lg:w-1/2 bg-[#92E3A9] flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                    {/* Subtle decoration */}
                    <div className="absolute top-1/2 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
                    
                    <div className="w-full max-w-[420px] bg-white rounded-3xl p-10 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative z-10">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Join Media Team</h1>
                            <p className="text-zinc-500 text-sm">Create your identity for authorization.</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-zinc-400" />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:border-[#92E3A9] focus:ring-4 focus:ring-[#92E3A9]/10"
                                        placeholder="Full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-zinc-400" />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:border-[#92E3A9] focus:ring-4 focus:ring-[#92E3A9]/10"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-zinc-400" />
                                    </div>
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:border-[#92E3A9] focus:ring-4 focus:ring-[#92E3A9]/10"
                                        placeholder="Min 8 characters"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3.5 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-black text-white h-14 rounded-xl font-bold text-sm hover:bg-zinc-900 transition-all mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 shadow-xl shadow-black/10"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-[#92E3A9]" />
                                ) : (
                                    <>
                                        Register Identity
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-zinc-500 font-medium tracking-tight">
                                Already a member? <Link href="/media/signin" className="text-zinc-900 border-b border-zinc-900/10 hover:border-zinc-900 transition-all font-bold">Sign in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
