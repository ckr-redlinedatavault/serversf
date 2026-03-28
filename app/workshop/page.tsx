"use client";

import { useState } from "react";
import { 
    Send, 
    CheckCircle2,
    Loader2,
    Info,
    ChevronRight,
    Terminal
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
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-6 rounded-none shadow-sm">
                    <div className="h-20 w-20 bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100">
                        <CheckCircle2 className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Registration Successful!</h1>
                    <p className="text-zinc-600 text-[15px] leading-relaxed">
                        Thank you for registering for the Java Workshop. We've received your details and will get back to you soon with further instructions.
                    </p>
                    <div className="pt-4">
                        <Link href="/" className="w-full h-12 bg-black text-white text-[14px] font-medium hover:opacity-90 transition-all rounded-none flex items-center justify-center gap-2">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-100 selection:text-red-900 font-sans flex flex-col">
            {/* Red Navbar */}
            <nav className="h-20 bg-red-600 text-white flex items-center justify-between px-6 lg:px-20 sticky top-0 z-[100] shadow-lg shadow-red-900/10">
                <div className="flex items-center gap-3">
                    <Terminal className="w-6 h-6" />
                    <span className="text-xl font-bold tracking-tighter uppercase whitespace-nowrap">Java Online Workshop</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest">
                    <span className="opacity-70">Enrollment Portal</span>
                    <div className="h-4 w-[1px] bg-white/20" />
                    <span className="px-3 py-1 bg-white/10 border border-white/20">Active Session</span>
                </div>
            </nav>

            <div className="flex-1 relative">
                <div className="fixed bottom-0 left-0 h-[300px] w-[300px] bg-red-50/10 pointer-events-none z-0" />
                
                <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 z-10 flex flex-col lg:flex-row gap-20">
                    
                    <div className="flex-1 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="inline-flex items-center gap-2 border border-red-100 bg-red-50/50 px-3 py-1 rounded-none">
                                    <span className="text-[12px] text-red-600 font-medium tracking-wide">Workshop 2026</span>
                                </div>
                            </div>
                            <h1 className="text-4xl tracking-tight text-zinc-900 md:text-6xl font-light">
                                Java <span className="text-red-600 font-normal">Workshop</span>
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
                                    className="w-full h-14 bg-red-600 text-white text-[16px] font-medium hover:bg-red-700 active:scale-[0.98] transition-all disabled:bg-zinc-100 disabled:text-zinc-400 flex items-center justify-center gap-3 rounded-none shadow-lg shadow-red-200"
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

                    <div className="lg:w-[500px]">
                        <div className="border border-zinc-100 bg-zinc-50/30 p-2">
                            <img 
                                src="https://ik.imagekit.io/dypkhqxip/Java%20Workshop.png" 
                                alt="Java Workshop Banner" 
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Grey Footer */}
            <footer className="bg-zinc-100 border-t border-zinc-200 py-12 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 opacity-50 grayscale">
                        <Terminal className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-tighter uppercase">Java Online Workshop</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 font-medium uppercase tracking-widest text-center md:text-right">
                        © {new Date().getFullYear()} StudentForge Technologies Private Ltd. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FormField({ label, name, value, onChange, placeholder, type = "text", required = false }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[14px] font-medium text-zinc-700">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-zinc-50/80 border border-zinc-200 px-6 py-4 text-[15px] text-zinc-900 outline-none focus:border-red-600 transition-all placeholder:text-zinc-400 rounded-none font-light"
            />
        </div>
    );
}
