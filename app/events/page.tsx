"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    ArrowRight,
    PlusCircle,
    Search,
    MessageSquare
} from "lucide-react";

export default function EventsPortal() {
    return (
        <div className="h-screen w-full flex flex-col bg-[#050505] text-white overflow-hidden font-sans">
            {/* Navbar Minimal */}
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                        <div className="h-4 w-[1px] bg-zinc-900/20" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">EVENT ENGINE</span>
                    </Link>
                </div>
                <div className="flex gap-8">
                    <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
                    <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col justify-center px-12 sm:px-24 py-4 max-w-[1400px] mx-auto w-full">
                {/* Compact Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-none text-left">
                        Event Engine
                    </h1>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-lg font-medium mb-0 text-left">
                        Coordinate hackathons, workshops, and meetups with automated workflows.
                    </p>
                </div>

                {/* Service Cards - 3 items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-900 pt-12">
                    {[
                        {
                            title: "Host sprint",
                            desc: "Create new missions and track student progress in real-time.",
                            href: "/events/host",
                            icon: PlusCircle
                        },
                        {
                            title: "Explore labs",
                            desc: "Discover upcoming hackathons and workshop missions.",
                            href: "/events/explore",
                            icon: Search
                        },
                        {
                            title: "Shared stories",
                            desc: "Read participant reviews and jury feedback from past events.",
                            href: "/events/review",
                            icon: MessageSquare
                        }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-[#92E3A9]/50 transition-colors flex flex-col gap-3 h-full"
                        >
                            <div className="h-10 w-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/5 text-[#92E3A9] group-hover:bg-[#92E3A9] group-hover:text-black transition-all">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-[#92E3A9] transition-colors mt-2">
                                {item.title}
                            </h3>
                            <p className="text-[12px] text-zinc-500 leading-snug">
                                {item.desc}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest mt-auto pt-4 opacity-80 group-hover:opacity-100">
                                Launch portal <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Off-White Footer with Normal Text */}
            <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 mt-auto">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-xs font-semibold text-zinc-600">Event Engine Active</span>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
                    <span className="text-xs font-medium text-zinc-500">Controlled by Technical Team</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
                    <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.1.0 stable</span>
                </div>
            </footer>
        </div>
    );
}
