"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LifeBuoy,
    MessageCircle,
    AtSign,
    Globe,
    ArrowRight,
    CheckCircle2,
    Clock,
    ShieldAlert
} from "lucide-react";

export default function SupportPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate ticket creation
        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
        }, 1500);
    };

    const navbar = (
        <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 shadow-lg">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-4">
                    <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                    <div className="h-4 w-[1px] bg-zinc-900/20" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">SUPPORT</span>
                </Link>
            </div>
            <div className="flex gap-8">
                <Link href="/events" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Events</Link>
                <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
            </div>
        </nav>
    );

    const footer = (
        <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 mt-auto">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-xs font-semibold text-zinc-600">Support Node Active</span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
                <span className="text-xs font-medium text-zinc-500">Controlled by technical operations</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
                <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.1.0 stable</span>
            </div>
        </footer>
    );

    if (submitted) {
        return (
            <div className="h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden">
                {navbar}
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="max-w-md w-full bg-zinc-900/30 border border-[#92E3A9]/20 p-12 rounded-[3.5rem] text-center shadow-2xl">
                        <div className="h-20 w-20 bg-[#92E3A9]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-10 h-10 text-[#92E3A9]" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 tracking-tight text-white">Handshake Success</h2>
                        <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium">Your support ticket has been encrypted and sent to our response queue. We usually reach out within 4 standard hours.</p>
                        <Link href="/" className="inline-flex h-12 w-full items-center justify-center bg-[#92E3A9] text-zinc-900 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">
                            Back to Core
                        </Link>
                    </div>
                </div>
                {footer}
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
            {navbar}

            <main className="flex-1 flex flex-col justify-center px-12 sm:px-24 py-16 max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-none text-left">
                            Support Node
                        </h1>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-lg font-medium mb-12 text-left">
                            Experience technical friction? Open a direct channel with our operations team. We specialized in deployment, protocol errors, and system authorization.
                        </p>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex items-start gap-4">
                                <Clock className="w-5 h-5 text-[#92E3A9]" />
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-1">Response Time</h3>
                                    <p className="text-[11px] text-zinc-500 font-medium">Average turnaround: 2-4 hours.</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex items-start gap-4">
                                <ShieldAlert className="w-5 h-5 text-[#92E3A9]" />
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-1">Priority Lane</h3>
                                    <p className="text-[11px] text-zinc-500 font-medium">Emergency access for system failures.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Ticket Form */}
                    <div className="lg:col-span-8 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#92E3A9]/5 blur-[100px] rounded-full pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#92E3A9] transition-all text-sm font-medium"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Relay Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-zinc-800/40 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#92E3A9] transition-all text-sm font-medium"
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Problem Node</label>
                                <select className="w-full bg-zinc-800/40 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#92E3A9] transition-all text-sm font-medium appearance-none">
                                    <option>Authentication (Login/Auth)</option>
                                    <option>Mailer Node (SMTP/Transmissions)</option>
                                    <option>Event Engine (Logic/Workflows)</option>
                                    <option>Deployment (CORS/SSL)</option>
                                    <option>Other System Issues</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Mission Report</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-zinc-800/40 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#92E3A9] transition-all text-sm font-medium resize-none text-zinc-200"
                                    placeholder="Describe the technical friction step by step..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 bg-[#92E3A9] text-zinc-900 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_rgba(146,227,169,0.1)] group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="h-5 w-5 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Initialize Support Handshake</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {footer}
        </div>
    );
}
