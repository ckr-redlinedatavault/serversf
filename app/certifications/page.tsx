"use client";

import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Page() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#050505] font-sans overflow-hidden">
            {/* Navbar Minimal */}
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                        <div className="h-4 w-[1px] bg-zinc-900/20" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">CREDENTIALS</span>
                    </Link>
                </div>
                <div className="flex gap-8">
                    <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
                    <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
                </div>
            </nav>

            <div className="px-12 sm:px-24 pt-8">
                <Breadcrumbs items={[{ label: "Certifications" }]} />
            </div>

            <main className="flex-1 flex flex-col items-start justify-center px-12 sm:px-24 text-white">
                <div className="w-full max-w-5xl">
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-7xl text-white">
                        Credential Forge
                    </h1>
                    <p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-xl">
                        Issue industry-standard certifications for high-impact projects and hackathon wins.
                    </p>
                    <div className="mt-12 flex gap-4">
                        <Link href="/" className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-800 bg-[#0a0a0a] px-8 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-900">
                            Return Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
