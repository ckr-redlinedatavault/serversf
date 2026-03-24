"use client";

import { useState, useEffect } from "react";
import { 
    Send, 
    CheckCircle2,
    Loader2,
    Info,
    ShieldCheck,
    Briefcase,
    Calendar,
    Award,
    AlertCircle,
    Timer
} from "lucide-react";
import Link from "next/link";

export default function InternFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
    
    // Deadline: March 20, 2026, 7:00 PM IST
    const deadline = new Date("2026-03-20T19:00:00+05:30");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = deadline.getTime() - now.getTime();
            
            if (true) { // Forced closure
                setIsClosed(true);
                setTimeLeft("FORM CLOSED");
                return;
            }

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            const timeString = hours > 0 
                ? `${hours}h ${minutes}m ${seconds}s`
                : `${minutes}m ${seconds}s`;
            
            setTimeLeft(timeString);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    const [agreements, setAgreements] = useState({
        terms: false,
        workload: false,
        sunday: false,
        commitment: false,
        integrity: false
    });
    
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

    const handleAgreementChange = (key: keyof typeof agreements) => {
        setAgreements({ ...agreements, [key]: !agreements[key] });
    };

    const isAllAgreed = Object.values(agreements).every(v => v);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAllAgreed) {
            alert("Please accept all terms and work agreements to proceed.");
            return;
        }
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

    if (isClosed) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full border border-zinc-200 p-10 bg-white text-center space-y-8">
                    <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-100">
                        <Timer className="w-10 h-10 text-red-500 animate-pulse" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-900">Form Closed</h1>
                        <p className="text-zinc-500 text-[15px] leading-relaxed">
                            The application period for this intake has ended as of <br/>
                            <span className="font-bold text-black uppercase tracking-widest text-[12px]">March 20, 2026 • 7:00 PM IST</span>
                        </p>
                    </div>
                    <div className="pt-4 border-t border-zinc-100">
                        <Link href="/" className="inline-flex h-12 items-center justify-center px-8 border border-black text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#92E3A9] selection:text-black font-sans">
            {/* Background Accent */}
            <div className="fixed bottom-0 left-0 h-[300px] w-[300px] rounded-tr-full bg-[#92E3A9]/10 pointer-events-none z-0" />
            
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 z-10 flex flex-col lg:flex-row gap-20">
                
                {/* Left Side: Form */}
                <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-3 py-1">
                                <span className="text-[12px] text-zinc-500">Intake Process 2026</span>
                            </div>
                            
                            {/* Live Timer Countdown */}
                            <div className="flex items-center gap-3 px-3 py-1 bg-zinc-900 border border-zinc-800">
                                <Timer size={14} className="text-[#92E3A9] animate-pulse" />
                                <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                                    Closes in: <span className="text-[#92E3A9] ml-1">{timeLeft}</span>
                                </span>
                            </div>
                        </div>
                        <h1 className="text-4xl tracking-tight text-zinc-900 md:text-5xl uppercase">
                            Application <span className="text-[#92E3A9]">Form</span>
                        </h1>
                        <p className="text-zinc-500 text-[15px]">Fill out your details to begin the evaluation process.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            <FormField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+91 00000 00000" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="Current Year" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 3rd Year" required />
                            <FormField label="Branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" required />
                        </div>

                        <FormField label="College / University" name="college" value={formData.college} onChange={handleChange} placeholder="Your University Name" required />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField label="GitHub Profile" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="github.com/username" required />
                            <FormField label="Portfolio Link (Optional)" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} placeholder="portfolio.com" />
                        </div>

                        {/* Agreements Section */}
                        <div className="space-y-6 pt-10 border-t border-zinc-100">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#92E3A9]">Work Agreements & Terms</h3>
                            <div className="space-y-4">
                                <AgreementCheckbox 
                                    label="I accept the general Terms & Conditions and Work Agreements." 
                                    checked={agreements.terms} 
                                    onChange={() => handleAgreementChange('terms')} 
                                />
                                <AgreementCheckbox 
                                    label="I am a serious intern and committed to professional growth." 
                                    checked={agreements.commitment} 
                                    onChange={() => handleAgreementChange('commitment')} 
                                />
                                <AgreementCheckbox 
                                    label="I am willing to work whenever it is required by the team." 
                                    checked={agreements.workload} 
                                    onChange={() => handleAgreementChange('workload')} 
                                />
                                <AgreementCheckbox 
                                    label="I confirm that I will attend the office on Sundays (Compulsory)." 
                                    checked={agreements.sunday} 
                                    onChange={() => handleAgreementChange('sunday')} 
                                />
                                <AgreementCheckbox 
                                    label="I agree to maintain professional integrity and follow the Forge Protocol." 
                                    checked={agreements.integrity} 
                                    onChange={() => handleAgreementChange('integrity')} 
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !isAllAgreed}
                                className="w-full h-14 bg-black text-white text-[14px] uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-200 flex items-center justify-center gap-3"
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
                            {!isAllAgreed && (
                                <p className="text-[10px] text-zinc-400 mt-4 text-center uppercase tracking-widest">
                                    Please accept all agreements to enable submission
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Right Side: Important Points */}
                <div className="lg:w-[400px] space-y-10">
                    <div className="bg-zinc-50 border border-zinc-200 p-10 space-y-8">
                        <div className="flex items-center gap-3 text-zinc-900 border-b border-zinc-200 pb-6">
                            <Info className="w-5 h-5 text-[#92E3A9]" />
                            <h2 className="text-xl font-normal uppercase tracking-tight">Important <span className="text-[#92E3A9]">Points</span></h2>
                        </div>

                        <div className="space-y-8">
                            <Point 
                                icon={<Briefcase className="w-5 h-5" />} 
                                title="Serious Interns Needed" 
                                desc="We only accept dedicated candidates who are ready to learn and contribute to real-world projects." 
                            />
                            <Point 
                                icon={<ShieldCheck className="w-5 h-5" />} 
                                title="Work On-Demand" 
                                desc="Flexibility is key. Interns must be available to work whenever the project requirements demand attention." 
                            />
                            <Point 
                                icon={<AlertCircle className="w-5 h-5 text-red-500" />} 
                                title="Sunday Compulsory" 
                                desc="Attendance at the office on Sundays is mandatory for all interns. No exceptions will be made." 
                            />
                            <Point 
                                icon={<Award className="w-5 h-5 text-[#92E3A9]" />} 
                                title="Certification & Benefits" 
                                desc="Official Offer Letter will be given upon selection, followed by an Experience Letter upon completion." 
                            />
                            <Point 
                                icon={<Calendar className="w-5 h-5" />} 
                                title="Experience Letter" 
                                desc="Validate your professional journey with a verifiable experience certificate from Forge Academy." 
                            />
                        </div>

                        <div className="pt-6 border-t border-zinc-200">
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-bold uppercase tracking-widest">
                                Failure to meet the office attendance requirements may lead to immediate termination of the internship.
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-l-2 border-[#92E3A9] bg-white">
                        <p className="text-[12px] text-zinc-600 font-medium italic-off">
                            "Building the next generation of engineers requires discipline and commitment."
                        </p>
                        <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">— FORGE ADMINISTRATION</span>
                    </div>
                </div>

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

function Point({ icon, title, desc }: any) {
    return (
        <div className="flex gap-4">
            <div className="shrink-0 mt-1 text-zinc-400">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">{title}</h4>
                <p className="text-[13px] text-zinc-500 leading-snug">{desc}</p>
            </div>
        </div>
    );
}

function AgreementCheckbox({ label, checked, onChange }: any) {
    return (
        <label className="flex items-start gap-3 cursor-pointer group">
            <div className="shrink-0 mt-0.5">
                <div 
                    onClick={onChange}
                    className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${checked ? 'bg-black border-black' : 'border-zinc-200 group-hover:border-black'}`}
                >
                    {checked && <div className="w-2 h-2 bg-white" />}
                </div>
            </div>
            <span className={`text-[13px] transition-colors ${checked ? 'text-zinc-900' : 'text-zinc-500'}`}>
                {label}
            </span>
        </label>
    );
}
