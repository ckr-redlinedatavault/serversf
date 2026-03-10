"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                setStatus({ type: 'success', message: "Your message has been sent. We'll get back to you soon!" });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus({ type: 'error', message: data.error || "Failed to send message." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
            {/* Navbar Minimal - Same as Main Page */}
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

            <main className="flex-1 flex flex-col justify-center px-12 sm:px-24 py-12 max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Information */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-none">
                            Get in Touch
                        </h1>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-lg font-medium mb-12">
                            Have a question or looking to join the ecosystem? Send us a transmission. Our team will review your inquiry and get back to you shortly.
                        </p>

                        <div className="space-y-6">
                            <div className="group p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex flex-col gap-1 transition-all">
                                <span className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest">Direct Relay</span>
                                <h3 className="text-sm font-semibold text-zinc-100">contact@studentforge.com</h3>
                            </div>
                            <div className="group p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex flex-col gap-1 transition-all">
                                <span className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest">Uptime Support</span>
                                <h3 className="text-sm font-semibold text-zinc-100">24/7 Monitoring Protocol</h3>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Simple Form */}
                    <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                        {status && (
                            <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'success' ? 'bg-[#92E3A9]/10 border border-[#92E3A9]/20 text-[#92E3A9]' : 'bg-red-500/10 border border-red-500/20 text-red-500'
                                }`}>
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                <p className="text-xs font-bold uppercase tracking-widest">{status.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#92E3A9] transition-all text-sm"
                                        placeholder="Codename"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#92E3A9] transition-all text-sm"
                                        placeholder="Relay address"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#92E3A9] transition-all text-sm"
                                    placeholder="Transmission topic"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#92E3A9] transition-all text-sm resize-none"
                                    placeholder="Your message payload..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-[#92E3A9] text-zinc-900 rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-[#7DCF95] transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="h-4 w-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Send Transmission</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer Minimal - Same as Main Page */}
            <footer className="px-12 sm:px-24 py-5 bg-[#f8f8f8] text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 mt-auto">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-xs font-semibold text-zinc-600">Servers are operational</span>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />
                    <span className="text-xs font-medium text-zinc-500">Controlled by CTO and Technical Team</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-zinc-400">© 2026 Student Forge</span>
                    <span className="px-2 py-0.5 bg-zinc-200 text-zinc-600 rounded text-[10px] font-bold leading-none">v2.0.4 stable</span>
                </div>
            </footer>
        </div>
    );
}
