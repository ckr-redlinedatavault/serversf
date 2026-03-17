"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldAlert, ArrowRight, Loader2, Crown } from "lucide-react";

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
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                        <div className="h-4 w-[1px] bg-zinc-900/20" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">SERVERS</span>
                    </Link>
                </div>
                <div className="flex gap-8">
                    <Link href="/" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Home</Link>
                </div>
            </nav>

            <main className="flex-1 flex lg:flex-row overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 flex-col items-center justify-center p-12">
                    <div className="max-w-md w-full text-center">
                        <img 
                            src="https://illustrations.popsy.co/gray/success.svg" 
                            alt="CEO Illustration" 
                            className="w-full h-auto mb-10 mix-blend-multiply"
                        />
                        <h2 className="text-2xl font-bold text-zinc-900 mb-4 text-left">Internal Command Center</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed text-left">
                            CEO level access provides full operational control over the Student Forge ecosystem. Monitor performance, assign tasks, and lead with precision.
                        </p>
                    </div>
                </div>

                <div className="flex-1 lg:w-1/2 bg-[#92E3A9] flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                    <div className="w-full max-w-[420px] bg-white rounded-3xl p-10 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative z-10">
                        <div className="mb-8">
                            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/10">
                                <Crown className="w-6 h-6 text-[#92E3A9]" />
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-2">CEO Sign In</h1>
                            <p className="text-zinc-500 text-sm">Elevated access for operational leadership.</p>
                        </div>

                        <form onSubmit={handleSignin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider ml-1">CEO ID / Email</label>
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
                                        placeholder="ceo@studentforge.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider ml-1">Key Code</label>
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
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold p-3.5 rounded-xl flex items-start gap-2.5">
                                    <ShieldAlert className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-black text-white h-14 rounded-xl font-bold text-sm hover:bg-zinc-900 transition-all mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 shadow-xl shadow-black/10"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin text-[#92E3A9]" /> : "Access Core Console"}
                                {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
