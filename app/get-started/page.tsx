"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export default function GetStartedPage() {
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
                <Breadcrumbs items={[{ label: "Welcome" }]} />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#050505]">
                <div className="max-w-[500px] w-full text-left">
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Sign In
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium">
                            Please choose how you want to sign in.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* User Entry */}
                        <Link
                            href="/signin"
                            className="group block p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-[#92E3A9]/50 transition-all active:scale-[0.99]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-[#92E3A9] uppercase">User Access</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#92E3A9] transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Student Sign In</h3>
                            <p className="text-zinc-500 text-xs font-medium">Join events and view your projects.</p>
                        </Link>

                        {/* Admin Entry */}
                        <Link
                            href="/admin/login"
                            className="group block p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-[#92E3A9]/50 transition-all active:scale-[0.99]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 group-hover:text-[#92E3A9] transition-colors uppercase">Staff Access</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#92E3A9] transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Admin Portal</h3>
                            <p className="text-zinc-500 text-xs font-medium">Manage students and view stats.</p>
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-900">
                        <Link href="/" className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
                            ← Go back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
