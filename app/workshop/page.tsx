"use client";

import { useState } from "react";
import { 
    Send, 
    CheckCircle2,
    Loader2,
    Info,
    ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function JavaWorkshopFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        branch: "",
        year: "",
        email: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/forms/workshop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit form");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-6 rounded-3xl shadow-sm">
                    <div className="h-20 w-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <CheckCircle2 className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Registration Successful!</h1>
                    <p className="text-zinc-600 text-[15px] leading-relaxed">
                        Thank you for registering for the Java Workshop. We've received your details and will get back to you soon with further instructions.
                    </p>
                    <div className="pt-4">
                        <Link href="/" className="w-full h-12 bg-black text-white text-[14px] font-medium hover:opacity-90 transition-all rounded-xl flex items-center justify-center gap-2">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-orange-100 selection:text-orange-900 font-sans">
            <div className="fixed bottom-0 left-0 h-[300px] w-[300px] rounded-tr-full bg-orange-50/30 pointer-events-none z-0" />
            
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 z-10 flex flex-col lg:flex-row gap-20">
                
                <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="inline-flex items-center gap-2 border border-orange-100 bg-orange-50/50 px-3 py-1 rounded-full">
                                <span className="text-[12px] text-orange-600 font-medium tracking-wide">Workshop 2026</span>
                            </div>
                        </div>
                        <h1 className="text-4xl tracking-tight text-zinc-900 md:text-6xl font-light">
                            Java <span className="text-orange-500 font-normal italic">Workshop</span>
                        </h1>
                        <p className="text-zinc-500 text-[18px] font-light max-w-lg leading-relaxed">
                            Master the core concepts of Java and build scalable backend systems. Join our intensive workshop.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            <FormField label="Branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Academic Year" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 3rd Year" required />
                            <FormField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" type="email" required />
                        </div>

                        <FormField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" type="tel" required />

                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full h-14 bg-black text-white text-[16px] font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-zinc-100 disabled:text-zinc-400 flex items-center justify-center gap-3 rounded-2xl shadow-lg shadow-zinc-200"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Register Now</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:w-[450px] space-y-10">
                    <div className="p-1 border border-zinc-100 rounded-[40px] bg-zinc-50/30">
                        <div className="bg-white border border-zinc-100 p-10 space-y-8 rounded-[38px] shadow-sm">
                            <div className="flex items-center gap-3 text-zinc-900 border-b border-zinc-50 pb-6">
                                <Info className="w-5 h-5 text-orange-500" />
                                <h2 className="text-xl font-medium tracking-tight">Workshop Highlights</h2>
                            </div>

                            <div className="space-y-10">
                                <HighlightsPoint 
                                    number="01"
                                    title="Core Java Mastery" 
                                    desc="Deep dive into OOPs, Collections, and Exception Handling." 
                                />
                                <HighlightsPoint 
                                    number="02"
                                    title="Enterprise Patterns" 
                                    desc="Learn industry-standard design patterns and architecture." 
                                />
                                <HighlightsPoint 
                                    number="03"
                                    title="Live Project" 
                                    desc="Build a production-grade application during the workshop." 
                                />
                                <HighlightsPoint 
                                    number="04"
                                    title="Career Guidance" 
                                    desc="Mock interviews and resume building sessions included." 
                                />
                            </div>

                            <div className="pt-6 border-t border-zinc-50">
                                <p className="text-[13px] text-zinc-400 leading-relaxed font-light">
                                    Limited seats available. Selection will be based on academic performance and technical interest.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 border-l-4 border-orange-500 bg-orange-50/30 rounded-r-2xl">
                        <p className="text-[14px] text-zinc-600 font-light italic">
                            "Java is the foundation of modern enterprise computing. Mastering it opens doors to endless possibilities."
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function FormField({ label, name, value, onChange, placeholder, type = "text", required = false }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[14px] font-medium text-zinc-700">
                {label} {required && <span className="text-orange-500">*</span>}
            </label>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-zinc-50/80 border border-zinc-200 px-6 py-4 text-[15px] text-zinc-900 outline-none focus:border-black focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400 rounded-xl font-light"
            />
        </div>
    );
}

function HighlightsPoint({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="shrink-0 text-[18px] font-medium text-orange-200 group-hover:text-orange-500 transition-colors tracking-tighter">
                {number}
            </div>
            <div className="space-y-2">
                <h4 className="text-[16px] font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">{title}</h4>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-light">{desc}</p>
            </div>
        </div>
    );
}
