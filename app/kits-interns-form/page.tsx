"use client";

import { useState, useEffect } from "react";
import { 
    Send, 
    CheckCircle2,
    Loader2,
    Info,
    Timer,
    Clock
} from "lucide-react";
import Link from "next/link";

export default function KitsInternFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    
    useEffect(() => {
        const DEADLINE = new Date("2026-03-28T00:00:00+05:30").getTime();
        const checkDeadline = () => {
            if (Date.now() > DEADLINE) {
                setIsClosed(true);
            }
        };
        checkDeadline();
        const interval = setInterval(checkDeadline, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, []);
    
    const [formData, setFormData] = useState({
        name: "",
        year: "",
        branch: "",
        interestedArea: "",
        email: "",
        phone: "",
        portfolioLink: "",
        recentProjectLink: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/forms/kits-intern", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
            } else {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error(error);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isClosed) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-6">
                    <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                        <Clock className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Registration Closed</h1>
                    <p className="text-zinc-600 text-[15px] leading-relaxed">The extended application deadline was March 28, 2026 at 12:00 AM IST. We are no longer accepting new submissions.</p>
                    <Link href="/" className="inline-block px-10 h-12 bg-black text-white text-[14px] font-medium hover:opacity-90 transition-all rounded-lg flex items-center justify-center">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-6">
                    <div className="h-20 w-20 bg-[#92E3A9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#92E3A9]/30">
                        <CheckCircle2 className="w-10 h-10 text-[#92E3A9]" />
                    </div>
                    <h1 className="text-2xl font-semibold text-zinc-900">Application Sent</h1>
                    <p className="text-zinc-600 text-[15px]">Your application has been successfully submitted. Our team will review it and get back to you soon.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full h-12 bg-black text-white text-[14px] font-medium hover:opacity-90 transition-all rounded-lg"
                    >
                        Submit Another
                    </button>
                    <Link href="/" className="block text-[13px] text-zinc-400 hover:text-black transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#92E3A9] selection:text-black font-sans">
            {/* Background Accent */}
            <div className="fixed bottom-0 left-0 h-[300px] w-[300px] rounded-tr-full bg-[#92E3A9]/5 pointer-events-none z-0" />
            
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 z-10 flex flex-col lg:flex-row gap-20">
                
                {/* Left Side: Form */}
                <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="inline-flex items-center gap-2 border border-zinc-100 bg-white px-3 py-1 rounded-full">
                                <span className="text-[12px] text-zinc-500 font-medium tracking-wide">KITS Intake 2026</span>
                            </div>
                        </div>
                        <h1 className="text-4xl tracking-tight text-zinc-900 md:text-5xl font-light">
                            Kits Intern <span className="text-[#92E3A9] font-normal">Form</span>
                        </h1>
                        <p className="text-zinc-500 text-[16px] font-light max-w-lg leading-relaxed">
                            Fill out your details below to join the elite engineering program at Forge Academy.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            <FormField label="Academic Year" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 3rd Year" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" required />
                            <div className="space-y-3">
                                <label className="text-[13px] font-medium text-zinc-600">
                                    Interested Area <span className="text-[#92E3A9]">*</span>
                                </label>
                                <select 
                                    name="interestedArea"
                                    value={formData.interestedArea}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-50/50 border border-zinc-200 px-5 py-4 text-[15px] text-zinc-900 outline-none focus:border-black transition-all appearance-none cursor-pointer rounded-lg font-light"
                                >
                                    <option value="" disabled>Select Area</option>
                                    <option value="Full Stack Development">Full Stack Development</option>
                                    <option value="App Development">App Development</option>
                                    <option value="Backend Engineering">Backend Engineering</option>
                                    <option value="Frontend Development">Frontend Development</option>
                                    <option value="AI / ML Development">AI / ML Development</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" type="email" required />
                            <FormField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" type="tel" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Portfolio Link" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} placeholder="https://..." />
                            <FormField label="Recent Project Link" name="recentProjectLink" value={formData.recentProjectLink} onChange={handleChange} placeholder="GitHub link" />
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full h-15 bg-black text-white text-[15px] font-medium hover:opacity-90 active:scale-[0.99] transition-all disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-200 flex items-center justify-center gap-3 rounded-xl"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Submit Application</span>
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side: Numbered Guidelines */}
                <div className="lg:w-[400px] space-y-10">
                    <div className="bg-zinc-50/50 border border-zinc-100 p-10 space-y-8 rounded-3xl">
                        <div className="flex items-center gap-3 text-zinc-900 border-b border-zinc-100 pb-6">
                            <Info className="w-5 h-5 text-[#92E3A9]" />
                            <h2 className="text-xl font-medium tracking-tight">Kits Guidelines</h2>
                        </div>

                        <div className="space-y-10">
                            <NumberedPoint 
                                number="01"
                                title="Academic Excellence" 
                                desc="Candidates should maintain a good standing in their respective branches at KITS." 
                            />
                            <NumberedPoint 
                                number="02"
                                title="Dedicated Learning" 
                                desc="Expect a rigorous schedule designed to bridge the gap between college and industry." 
                            />
                            <NumberedPoint 
                                number="03"
                                title="Tech Stack" 
                                desc="Work on modern technologies like Next.js, Prisma, and Cloud infrastructure." 
                            />
                            <NumberedPoint 
                                number="04"
                                title="Certification" 
                                desc="Get a verifiable internship certificate from Forge Academy upon completion." 
                            />
                        </div>

                        <div className="pt-6 border-t border-zinc-100">
                            <p className="text-[12px] text-zinc-400 leading-relaxed font-light">
                                By joining the KITS intern group, you commit to professional growth and team collaboration.
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-l-2 border-[#92E3A9] bg-white">
                        <p className="text-[13px] text-zinc-500 font-light italic-off">
                            "Shaping the next generation of engineers through hands-on experience."
                        </p>
                        <span className="block text-[11px] font-medium text-zinc-400 mt-2">— KITS Intern Portal</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

function FormField({ label, name, value, onChange, placeholder, type = "text", required = false }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[13px] font-medium text-zinc-600">
                {label} {required && <span className="text-[#92E3A9]">*</span>}
            </label>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-zinc-50/50 border border-zinc-200 px-5 py-4 text-[15px] text-zinc-900 outline-none focus:border-black transition-all placeholder:text-zinc-300 rounded-lg font-light"
            />
        </div>
    );
}

function NumberedPoint({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex gap-6">
            <div className="shrink-0 text-[18px] font-light text-[#92E3A9] tracking-tighter">
                {number}
            </div>
            <div className="space-y-2">
                <h4 className="text-[15px] font-medium text-zinc-900">{title}</h4>
                <p className="text-[13px] text-zinc-500 leading-snug font-light">{desc}</p>
            </div>
        </div>
    );
}
