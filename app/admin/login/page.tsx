"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminLoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ user: "", pass: "" });
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const res = await fetch("/api/auth/media/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: credentials.user, password: credentials.pass }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("media_user", JSON.stringify(data));
                localStorage.setItem("forge_super_admin", "true");
                router.push("/dashboard");
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden">
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
                <Breadcrumbs items={[{ label: "Login", href: "/get-started" }, { label: "Admin" }]} />
            </div>

            <main className="flex-1 flex items-center justify-center px-12 sm:px-24">
                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Illustration */}
                    <div className="hidden lg:block relative group">
                        <div className="absolute inset-0 bg-[#92E3A9]/5 rounded-full blur-[100px] group-hover:bg-[#92E3A9]/10 transition-all duration-700" />
                        <img
                            src="https://ik.imagekit.io/dypkhqxip/Computer%20login-bro.svg"
                            alt="Admin Login"
                            className="w-full h-auto max-h-[500px] object-contain relative z-10 mix-blend-lighten"
                        />
                    </div>

                    {/* Right Side: Simple Minimal Login Form */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-[440px] p-10 sm:p-12 border border-[#92E3A9]/30 rounded-[3rem] bg-[#92E3A9]/[0.02] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div className="mb-12 text-left">
                                <h1 className="text-4xl font-semibold text-white tracking-tight mb-2">Admin Portal</h1>
                                <p className="text-zinc-500 text-sm font-medium">Log in to your account</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-12">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={credentials.user}
                                        onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
                                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm font-medium outline-none transition-all placeholder:text-zinc-800 focus:border-[#92E3A9] focus:shadow-[0_1px_0_0_#92E3A9] rounded-none px-1"
                                        placeholder="admin@studentforge.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="password"
                                            value={credentials.pass}
                                            onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
                                            className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm font-medium outline-none transition-all placeholder:text-zinc-800 focus:border-[#92E3A9] focus:shadow-[0_1px_0_0_#92E3A9] rounded-none px-1 pr-10"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                                            Login Failed: Check your info
                                        </span>
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-[#92E3A9] text-zinc-900 h-14 rounded-xl font-bold text-sm tracking-tight hover:bg-white hover:shadow-[0_0_30px_rgba(146,227,169,0.3)] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#92E3A9]/10 disabled:opacity-70"
                                >
                                    {loading ? "Authenticating..." : "Sign In"}
                                </button>
                            </form>

                            <div className="mt-12 text-center lg:text-left pt-6 border-t border-zinc-900/40">
                                <Link href="/get-started" className="text-xs font-medium text-zinc-600 hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-2">
                                    <span className="opacity-50">←</span> Go back
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Off-White Footer Minimal for Admin Only */}
            <footer className="px-12 sm:px-24 py-4 bg-[#f8f8f8] text-zinc-900 flex items-center justify-between border-t border-zinc-200">
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Super Admin Portal v2.0</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Controlled by CTO</span>
            </footer>
        </div>
    );
}
