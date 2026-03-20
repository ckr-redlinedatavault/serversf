"use client";

import { useState } from "react";
import { 
    User, 
    Briefcase, 
    GraduationCap, 
    Phone, 
    Github, 
    Globe, 
    Send, 
    CheckCircle2,
    Calendar,
    Building2,
    Loader2
} from "lucide-react";
import Link from "next/link";

export default function InternFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        year: "",
        branch: "",
        college: "",
        phoneNumber: "",
        githubLink: "",
        portfolioLink: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/forms/intern", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
            } else {
                alert("Submission failed: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-6">
                    <div className="h-20 w-20 bg-[#92E3A9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#92E3A9]/30">
                        <CheckCircle2 className="w-10 h-10 text-[#92E3A9]" />
                    </div>
                    <h1 className="text-3xl font-normal uppercase tracking-tight text-zinc-900">Application Sent</h1>
                    <p className="text-zinc-600 text-[15px]">Your application has been successfully submitted. Our team will review it and get back to you soon.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full h-12 bg-black text-white text-[14px] uppercase tracking-widest hover:opacity-90 transition-all"
                    >
                        Submit Another
                    </button>
                    <Link href="/" className="block text-[12px] text-zinc-400 uppercase tracking-widest hover:text-black transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#92E3A9] selection:text-black font-sans">
            {/* Background Accent - matching hero */}
            <div className="fixed bottom-0 left-0 h-[300px] w-[300px] rounded-tr-full bg-[#92E3A9]/20 pointer-events-none z-0" />
            
            <div className="relative max-w-2xl mx-auto px-6 py-20 z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-3 py-1 mb-4">
                        <span className="text-[12px] text-zinc-500">Intake Process</span>
                    </div>
                    <h1 className="text-4xl tracking-tight text-zinc-900 md:text-5xl uppercase">
                        Join the <span className="text-[#92E3A9]">Forge</span>
                    </h1>
                    <p className="text-zinc-600 text-[15px] max-w-lg mx-auto">
                        A simple platform for student engineers. 
                        Fill out the details below to apply for our internship program.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <FormField 
                            label="Full Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="John Doe" 
                            required
                        />
                        {/* Phone Number */}
                        <FormField 
                            label="Phone Number" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={handleChange} 
                            placeholder="+91 00000 00000" 
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Year */}
                        <FormField 
                            label="Current Year" 
                            name="year" 
                            value={formData.year} 
                            onChange={handleChange} 
                            placeholder="e.g. 3rd Year" 
                            required
                        />
                        {/* Branch */}
                        <FormField 
                            label="Branch" 
                            name="branch" 
                            value={formData.branch} 
                            onChange={handleChange} 
                            placeholder="e.g. Computer Science" 
                            required
                        />
                    </div>

                    {/* College */}
                    <FormField 
                        label="College / University" 
                        name="college" 
                        value={formData.college} 
                        onChange={handleChange} 
                        placeholder="Your University Name" 
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Github */}
                        <FormField 
                            label="GitHub Profile" 
                            name="githubLink" 
                            value={formData.githubLink} 
                            onChange={handleChange} 
                            placeholder="github.com/username" 
                            required
                        />
                        {/* Portfolio */}
                        <FormField 
                            label="Portfolio Link (Optional)" 
                            name="portfolioLink" 
                            value={formData.portfolioLink} 
                            onChange={handleChange} 
                            placeholder="portfolio.com" 
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-14 bg-black text-white text-[14px] uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Submit Application</span>
                                    <Send className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <footer className="mt-20 pt-8 border-t border-zinc-100 text-center">
                    <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
                        SECURE APPLICATION PROTOCOL • © 2026 FORGE ACADEMY
                    </p>
                </footer>
            </div>
        </div>
    );
}

function FormField({ label, name, value, onChange, placeholder, required = false }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[12px] text-zinc-500 uppercase tracking-widest">
                {label} {required && <span className="text-[#92E3A9]">*</span>}
            </label>
            <input 
                type="text" 
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-white border border-zinc-200 px-5 py-4 text-[14px] text-zinc-900 outline-none focus:border-black transition-all placeholder:text-zinc-300"
            />
        </div>
    );
}
