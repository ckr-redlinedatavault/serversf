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
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
                <div className="max-w-md w-full glass p-10 rounded-[2rem] border border-[#92E3A9]/20 text-center space-y-6">
                    <div className="h-20 w-20 bg-[#92E3A9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#92E3A9]/30">
                        <CheckCircle2 className="w-10 h-10 text-[#92E3A9]" />
                    </div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent italic uppercase tracking-tighter">Application Sent</h1>
                    <p className="text-zinc-400 font-medium">Your application has been successfully submitted. Our team will review it and get back to you soon.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-[#92E3A9] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] transition-all"
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#92E3A9] selection:text-black">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#92E3A9]/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative max-w-2xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4 hover:border-[#92E3A9]/40 transition-colors group">
                        <div className="w-2 h-2 rounded-full bg-[#92E3A9] animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-white transition-colors">Spring Cohort 2026</span>
                    </div>
                    <h1 className="text-5xl font-black bg-gradient-to-br from-white via-white to-zinc-600 bg-clip-text text-transparent italic uppercase tracking-tighter leading-none">
                        Join the <span className="text-[#92E3A9]">Forge</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm">Fill out the form below to apply for our internship program.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <FormField 
                            label="Full Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="John Doe" 
                            icon={<User className="w-4 h-4" />}
                            required
                        />
                        {/* Phone Number */}
                        <FormField 
                            label="Phone Number" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={handleChange} 
                            placeholder="+91 00000 00000" 
                            icon={<Phone className="w-4 h-4" />}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Year */}
                        <FormField 
                            label="Year" 
                            name="year" 
                            value={formData.year} 
                            onChange={handleChange} 
                            placeholder="3rd Year" 
                            icon={<Calendar className="w-4 h-4" />}
                            required
                        />
                        {/* Branch */}
                        <FormField 
                            label="Branch" 
                            name="branch" 
                            value={formData.branch} 
                            onChange={handleChange} 
                            placeholder="Computer Science" 
                            icon={<Briefcase className="w-4 h-4" />}
                            required
                        />
                    </div>

                    {/* College */}
                    <FormField 
                        label="College / University" 
                        name="college" 
                        value={formData.college} 
                        onChange={handleChange} 
                        placeholder="Harvard University" 
                        icon={<Building2 className="w-4 h-4" />}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Github */}
                        <FormField 
                            label="GitHub Profile" 
                            name="githubLink" 
                            value={formData.githubLink} 
                            onChange={handleChange} 
                            placeholder="github.com/username" 
                            icon={<Github className="w-4 h-4" />}
                            required
                        />
                        {/* Portfolio */}
                        <FormField 
                            label="Portfolio Link (Optional)" 
                            name="portfolioLink" 
                            value={formData.portfolioLink} 
                            onChange={handleChange} 
                            placeholder="portfolio.com" 
                            icon={<Globe className="w-4 h-4" />}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full mt-8 group relative flex items-center justify-center gap-3 py-5 bg-[#92E3A9] text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <span>Submit Application</span>
                                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <footer className="mt-20 pt-8 border-t border-zinc-900/50 text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        SECURE APPLICATION TRANSFERRED VIA FORGE PROTOCOL
                    </p>
                </footer>
            </div>
        </div>
    );
}

function FormField({ label, name, value, onChange, placeholder, icon, required = false }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
                {label} {required && <span className="text-[#92E3A9]">*</span>}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#92E3A9] transition-colors">
                    {icon}
                </div>
                <input 
                    type="text" 
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium outline-none focus:border-[#92E3A9]/50 focus:bg-zinc-800/80 transition-all placeholder:text-zinc-700"
                />
            </div>
        </div>
    );
}
