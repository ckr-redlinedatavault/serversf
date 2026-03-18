"use client";

import Link from "next/link";
import {
    ChevronRight,
    ArrowRight,
    Home,
    Search,
    HelpCircle,
    ArrowLeft
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

export default function DocsPage() {
    const sections = [
        {
            title: "Getting Started",
            links: ["Introduction", "Student Portal Guide", "Course Enrollment", "Join Community"]
        },
        {
            title: "Learning",
            links: ["Course Access", "Submitting Projects", "Hackathon Guide", "Certificates"]
        },
        {
            title: "Payments",
            links: ["Fee Structure", "Payment Rules", "Refund Policy", "Transfer Safety"]
        },
        {
            title: "Accounts",
            links: ["Logging In", "Reset Password", "Media Team Access", "Staff Guidelines"]
        }
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 flex flex-col">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[14px] tracking-tight">Home</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-[#92E3A9]" />
                        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Site Guides</span>
                    </div>
                </div>
            </nav>

            <main className="w-full flex-1">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Support", href: "/support" }, { label: "Documentation" }]} />
                        <h1 className="text-4xl md:text-5xl tracking-tight text-white mt-10 mb-6">
                            Documentation
                        </h1>
                        <p className="text-zinc-400 text-[18px] leading-relaxed max-w-xl">
                            Read our guides and learn how to use the Student Forge platform correctly.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
                        {/* Clean Sidebar - Text Only */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
                            <div className="space-y-12">
                                {sections.map((section, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <div className="border-b border-zinc-100 pb-3">
                                            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#92E3A9]">{section.title}</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {section.links.map((link, lIdx) => (
                                                <li key={lIdx}>
                                                    <button className="text-[14px] text-zinc-500 hover:text-black hover:translate-x-2 transition-all flex items-center gap-2 group text-left">
                                                        <ChevronRight size={10} className="text-zinc-200 group-hover:text-black transition-colors" opacity={0.5} />
                                                        {link}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* Main Content Area - Typography Focused (No Boxes/Icons) */}
                        <div className="lg:col-span-8 space-y-24">
                            {/* Introduction List */}
                            <section className="space-y-10">
                                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 border-b-2 border-zinc-100 pb-6">Welcome to the Forum</h2>
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <h4 className="text-[18px] font-bold uppercase tracking-tight text-zinc-900">Email System</h4>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            Student Forge lets you send emails easily. You can message student groups or entire teams from the mailer portal without any complex setup.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[18px] font-bold uppercase tracking-tight text-zinc-900">Events and Hackathons</h4>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            We coordinate student events and real-time workshops. You can view upcoming events and link your projects through the dashboard.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[18px] font-bold uppercase tracking-tight text-zinc-900">Certification</h4>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            Once you complete a course or a project, you receive a certificate. These are verified and can be used to showcase your professional growth.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Payment Rules Section - Plain Text */}
                            <section className="space-y-10 pt-10 border-t border-zinc-100">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Payment Rules</h2>
                                    <p className="text-zinc-500 text-[16px] font-medium leading-relaxed">
                                        Please read these terms carefully before you pay for any service on Student Forge.
                                    </p>
                                </div>

                                <div className="space-y-16">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest">Refund Policy</p>
                                            <h4 className="text-2xl font-bold text-zinc-900 leading-tight">No Refunds are Given</h4>
                                        </div>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            We do not offer any refunds once a student has enrolled and paid for a course or project. 
                                            All payments are final. Ensure you review all course details and requirements before you proceed with a payment.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Enrollment</p>
                                            <h4 className="text-2xl font-bold text-zinc-900 leading-tight">Verification Process</h4>
                                        </div>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            When you submit your bank transfer details, our team checks the transaction manually. 
                                            This process takes 24 to 48 hours. You will get portal access immediately after our team verifies the payment.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Security</p>
                                            <h4 className="text-2xl font-bold text-zinc-900 leading-tight">Secure Transfers Only</h4>
                                        </div>
                                        <p className="text-zinc-500 text-[16px] leading-relaxed">
                                            Only use the bank account numbers provided on the official enroll page. Student Forge will never ask for your card pin or passwords over email or phone.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Simple Footer Link */}
                            <div className="pt-24 border-t border-zinc-100">
                                <div className="space-y-6">
                                    <h4 className="text-[20px] font-bold text-zinc-900">Still have questions?</h4>
                                    <p className="text-zinc-500 text-[15px] max-w-md leading-relaxed">
                                        If our guides do not have the answer, please talk to our support team for help with access or payments.
                                    </p>
                                    <Link href="/support" className="inline-flex items-center gap-3 text-black font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-70 transition-opacity">
                                        Get help <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 text-center">
                    <Link href="/" className="group inline-flex items-center gap-3 text-[11px] font-bold text-zinc-300 hover:text-black transition-colors uppercase tracking-widest">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Go back to home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
