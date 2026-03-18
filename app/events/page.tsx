"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    ArrowRight,
    PlusCircle,
    Search,
    MessageSquare,
    Home,
    ArrowLeft
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

export default function EventsPortal() {
    const items = [
        {
            title: "Create Event",
            desc: "Start a new workshop or hackathon and invite students to join.",
            href: "/events/host",
            icon: PlusCircle,
            badge: "Host"
        },
        {
            title: "Find Events",
            desc: "Look for upcoming hackathons, missions, and workshops to join.",
            href: "/events/explore",
            icon: Search,
            badge: "Browse"
        },
        {
            title: "View Reviews",
            desc: "Read what students and judges said about past events.",
            href: "/events/review",
            icon: MessageSquare,
            badge: "Stories"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
                        <Home size={16} />
                        <span className="text-[14px] tracking-tight">Home</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-[#92E3A9]" />
                        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Event Center</span>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-12 lg:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/" }, { label: "Events" }]} />
                        <h1 className="text-4xl md:text-5xl tracking-tight text-white mt-8 mb-4">
                            Events & Hackathons
                        </h1>
                        <p className="text-zinc-400 text-[15px] leading-relaxed max-w-md">
                            Organize workshops, hackathons, and meetups easily with our tools.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {items.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="group block border border-zinc-100 p-10 hover:border-black transition-all active:scale-[0.99] relative overflow-hidden"
                            >
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 border border-zinc-100 flex items-center justify-center text-zinc-200 group-hover:text-black group-hover:border-black transition-all">
                                            <item.icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest group-hover:text-black transition-colors">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-[20px] font-bold tracking-tight text-zinc-900">{item.title}</h3>
                                        <p className="text-[14px] text-zinc-500 leading-relaxed line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 group-hover:text-black transition-colors uppercase tracking-widest">
                                        Open portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50/50 -mr-12 -mt-12 group-hover:bg-[#92E3A9]/10 transition-colors" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 pt-12 border-t border-zinc-100 text-center">
                        <Link href="/" className="group inline-flex items-center gap-3 text-[11px] font-bold text-zinc-300 hover:text-black transition-colors uppercase tracking-widest">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Return home
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
