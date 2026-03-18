"use client";

import Link from "next/link";
import { Award, Home, ArrowLeft, ShieldCheck } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

export default function CertificationsPage() {
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
                        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Academy Status</span>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/" }, { label: "Certifications" }]} />
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mt-8">
                            <div className="max-w-xl">
                                <h1 className="text-4xl md:text-5xl tracking-tight text-white mb-6">
                                    Your Certificates
                                </h1>
                                <p className="text-zinc-400 text-[18px] leading-relaxed">
                                    Get your official certificates for finishing courses and winning hackathons.
                                </p>
                            </div>
                            <div className="w-20 h-20 border border-zinc-800 flex items-center justify-center">
                                <Award size={32} className="text-[#92E3A9]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 text-center">
                    <div className="max-w-2xl mx-auto border border-zinc-100 p-12 space-y-8">
                        <div className="flex justify-center">
                            <ShieldCheck size={48} className="text-zinc-100" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight">How to get certified?</h2>
                            <p className="text-zinc-500 text-[15px] leading-relaxed">
                                Once you complete a technical course or submit a winning project in our hackathons, 
                                your certificate will be automatically generated and sent to your email.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Link href="/courses" className="bg-black text-white px-10 h-12 flex items-center justify-center text-[12px] font-bold uppercase tracking-widest transition-opacity hover:opacity-90">
                                Start a course
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16">
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
