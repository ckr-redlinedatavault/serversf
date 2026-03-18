"use client";

import { ArrowRight, User, ShieldCheck, Home, ArrowLeft, GraduationCap, Building } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

export default function GetStartedPage() {
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
                        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Login Portal</span>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-12 lg:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/" }, { label: "Login" }]} />
                        <h1 className="text-4xl md:text-5xl tracking-tight text-white mt-8 mb-4">
                            Choose Your Access
                        </h1>
                        <p className="text-zinc-400 text-[15px] leading-relaxed max-w-md font-medium text-[12px] opacity-70">
                            Please select whether you are a student or a staff member to continue.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Entry */}
                        <Link
                            href="/signin"
                            className="group block p-8 border border-zinc-100 transition-all hover:border-black active:scale-[0.99] bg-white relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between gap-12">
                                <div className="flex-1">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="w-14 h-14 border border-zinc-100 flex items-center justify-center text-zinc-200 group-hover:text-black group-hover:border-black transition-all">
                                            <GraduationCap size={28} strokeWidth={1} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl tracking-tight text-zinc-900 mb-2 font-bold">Student Sign-in</h3>
                                    <p className="text-zinc-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
                                        Join courses, build your profile, and see all student projects.
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                                        <User size={12} strokeWidth={2} /> 
                                        <span>Student Access</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-zinc-200 group-hover:text-black transition-colors shrink-0" />
                            </div>
                        </Link>

                        {/* Staff Entry */}
                        <Link
                            href="/admin/login"
                            className="group block p-8 border border-zinc-100 transition-all hover:border-black active:scale-[0.99] bg-white relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between gap-12">
                                <div className="flex-1">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="w-14 h-14 border border-zinc-100 flex items-center justify-center text-zinc-200 group-hover:text-black group-hover:border-black transition-all">
                                            <Building size={28} strokeWidth={1} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl tracking-tight text-zinc-900 mb-2 font-bold">Staff Login</h3>
                                    <p className="text-zinc-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
                                        Manage courses, check student work, and verify records.
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                                        <ShieldCheck size={12} strokeWidth={2} /> 
                                        <span>Internal Access</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-zinc-200 group-hover:text-black transition-colors shrink-0" />
                            </div>
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-100 text-center md:text-left">
                        <Link href="/" className="group inline-flex items-center gap-3 text-[11px] font-bold text-zinc-300 hover:text-black transition-colors uppercase tracking-widest">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Return to homepage
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
