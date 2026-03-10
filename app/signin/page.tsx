"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumbs from "../components/Breadcrumbs";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("forge_user_signed_in", "true");
        router.push("/events/host");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
            {/* Navbar Minimal */}
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
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

            <div className="px-12 sm:px-24 pt-8">
                <Breadcrumbs items={[{ label: "Gateway", href: "/get-started" }, { label: "Standard Access" }]} />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[420px]">
                    <div className="bg-[#92E3A9] rounded-[2.5rem] p-10 sm:p-12 shadow-[0_20px_50px_rgba(146,227,169,0.2)] border border-[#92E3A9]/20">
                        <div className="mb-10 text-left">
                            <h1 className="text-3xl font-bold mb-3 text-zinc-900 tracking-tight">Sign in</h1>
                            <p className="text-zinc-800/60 text-sm font-medium leading-relaxed">Access the organizer dashboard and manage your missions.</p>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-6">
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest ml-1">Email address</label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white text-zinc-900 rounded-xl px-5 py-4 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:ring-4 focus:ring-black/5"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest ml-1">Password</label>
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white text-zinc-900 rounded-xl px-5 py-4 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:ring-4 focus:ring-black/5"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white h-14 rounded-xl font-bold text-sm hover:bg-zinc-900 transition-all mt-6 shadow-xl active:scale-[0.98]"
                            >
                                Authorize session
                            </button>
                        </form>
                    </div>

                    <div className="mt-10 text-center flex flex-col gap-4">
                        <p className="text-sm text-zinc-500 font-medium tracking-tight">
                            New to the network? <Link href="/signup" className="text-[#92E3A9] hover:text-white transition-colors duration-300">Create identity</Link>
                        </p>
                        <div className="h-[1px] w-12 bg-zinc-800 mx-auto opacity-30" />
                        <Link href="/admin/login" className="text-[10px] text-zinc-600 hover:text-[#92E3A9] uppercase tracking-[0.3em] font-black transition-all">
                            Super Admin Access
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
