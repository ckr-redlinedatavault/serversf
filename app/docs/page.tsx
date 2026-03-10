"use client";

import Link from "next/link";
import {
    Book,
    Code,
    Terminal,
    Shield,
    Zap,
    ChevronRight,
    ArrowRight
} from "lucide-react";

export default function DocsPage() {
    const sections = [
        {
            title: "Getting Started",
            icon: Zap,
            links: ["Introduction", "Quick Start", "Installation", "Core Concepts"]
        },
        {
            title: "Services",
            icon: Code,
            links: ["Mailer Engine", "Event Node", "Credential Forge", "API Reference"]
        },
        {
            title: "Security",
            icon: Shield,
            links: ["Authentication", "SMTP Protocols", "Data Encapsulation", "Safe Handshakes"]
        },
        {
            title: "Technical",
            icon: Terminal,
            links: ["Deployment", "Environment Vars", "Database Schema", "CLI Tools"]
        }
    ];

    const navbar = (
        <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-4">
                    <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                    <div className="h-4 w-[1px] bg-zinc-900/20" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">DOCS</span>
                </Link>
            </div>
            <div className="flex gap-8">
                <Link href="/events" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Events</Link>
                <Link href="/support" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Support</Link>
            </div>
        </nav>
    );

    const footer = (
        <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 mt-auto">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-xs font-semibold text-zinc-600">Documentation Node Active</span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
                <span className="text-xs font-medium text-zinc-500">Controlled by Technical Team</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
                <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.1.0 stable</span>
            </div>
        </footer>
    );

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
            {navbar}

            <main className="flex-1 flex flex-col justify-center px-12 sm:px-24 py-16 max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Sidebar Navigation */}
                    <div className="lg:col-span-3 lg:sticky lg:top-8 space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-2 leading-none">Documentation</h1>
                            <p className="text-[11px] font-bold text-[#92E3A9] uppercase tracking-[0.3em]">Knowledge Base v2.1</p>
                        </div>

                        <div className="space-y-6">
                            {sections.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <section.icon className="w-3.5 h-3.5" />
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest">{section.title}</h3>
                                    </div>
                                    <ul className="space-y-2 pl-5 border-l border-zinc-900">
                                        {section.links.map((link, lIdx) => (
                                            <li key={lIdx}>
                                                <button className="text-xs font-medium text-zinc-400 hover:text-[#92E3A9] transition-colors">{link}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Main Content */}
                    <div className="lg:col-span-9 space-y-12">
                        <section className="p-10 rounded-3xl bg-zinc-900/10 border border-zinc-900 relative overflow-hidden group hover:border-[#92E3A9]/30 transition-all">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#92E3A9]/5 blur-[100px] rounded-full pointer-events-none" />
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Introduction to the Forge</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-2xl">
                                Student Forge is a high-performance ecosystem designed for the next generation of builders.
                                We provide the infrastructure needed to manage student communities, high-stakes hackathons,
                                and digital credentials with absolute precision.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <span className="text-[9px] font-bold text-[#92E3A9] uppercase tracking-widest block mb-2">Protocol: Mailer</span>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">Coordinate outreach with zero configuration using our automated SMTP protocols.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <span className="text-[9px] font-bold text-[#92E3A9] uppercase tracking-widest block mb-2">Protocol: Events</span>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">Manage complex event logic through our standardized laboratory engine.</p>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-colors">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-[#92E3A9]" /> API Reference
                                </h3>
                                <p className="text-xs text-zinc-500 leading-relaxed mb-6">Explore the full API documentation for integrating custom modules with the Forge core.</p>
                                <button className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest flex items-center gap-2 group">
                                    Access Schema <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="p-8 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-colors">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-[#92E3A9]" /> Security Guidelines
                                </h3>
                                <p className="text-xs text-zinc-500 leading-relaxed mb-6">Internal protocols for managing authorized handshakes and data encryption.</p>
                                <button className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest flex items-center gap-2 group">
                                    View Protocols <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="p-10 bg-zinc-900/5 border border-dashed border-zinc-800 rounded-3xl text-center">
                            <h4 className="text-sm font-bold text-zinc-300 mb-2">Need a higher level of access?</h4>
                            <p className="text-xs text-zinc-500 mb-6 font-medium leading-relaxed">System documentation is updated weekly by the technical operations team.</p>
                            <Link href="/support" className="inline-flex h-10 px-8 bg-zinc-900 border border-white/5 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#92E3A9] hover:text-black transition-all items-center">
                                Connect with Support
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {footer}
        </div>
    );
}
