"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
    ChevronRight, 
    ArrowLeft, 
    CheckCircle, 
    Loader2, 
    QrCode, 
    CreditCard, 
    ShieldCheck, 
    Phone, 
    Mail, 
    GraduationCap, 
    Building2,
    Calendar,
    PenTool
} from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function EnrollmentPage() {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        college: "",
        branch: "",
        year: "",
        whyJoin: "",
        referenceId: "",
        transactionId: "",
        bankName: "",
        accountName: "",
        amount: ""
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${id}`);
                const data = await res.json();
                if (data.success) {
                    setCourse(data.course);
                    setFormData(prev => ({ ...prev, amount: data.course.price }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.branch || !formData.year) {
                setError("Please fill all required fields.");
                return;
            }
        }
        setError("");
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/courses/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId: id,
                    ...formData
                })
            });
            const data = await res.json();
            if (data.success) {
                setStep(4); // Success step
            } else {
                setError(data.error || "Enrollment failed. Please check your details.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-[#050505] flex items-center justify-center text-[#92E3A9]">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#92E3A9] selection:text-black pb-20">
            {/* Minimal Sub-Navbar */}
            <nav className="w-full bg-[#92E3A9] px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
                <Link href={`/courses/${id}`} className="flex items-center gap-3 group">
                    <ArrowLeft className="w-4 h-4 text-zinc-900 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-tight text-zinc-900">Back to Module</span>
                </Link>
                <div className="flex gap-4 items-center">
                    <span className="text-[10px] font-black text-zinc-900/40 uppercase tracking-widest hidden sm:block">Mission Initialization</span>
                    <div className="h-2 w-32 bg-zinc-900/10 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-zinc-900 transition-all duration-500" 
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <Breadcrumbs items={[{ label: "Academy", href: "/courses" }, { label: course.title, href: `/courses/${id}` }, { label: "Enroll" }]} />
                    <h1 className="text-4xl font-black tracking-tighter mt-4 leading-none mb-2">Initialize Enrollment</h1>
                    <p className="text-zinc-500 text-sm font-medium">Step {step < 4 ? step : 'Completed'} of 3</p>
                </div>

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] p-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-[#92E3A9] border border-[#92E3A9]/20 px-3 py-1 rounded bg-[#92E3A9]/5 uppercase tracking-widest">01</span>
                                <h2 className="text-xs font-black text-zinc-500">Candidate Information</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Required" />
                                <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="Required" type="email" />
                                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" />
                                <InputField label="College / Institution" name="college" value={formData.college} onChange={handleChange} placeholder="Required" />
                                <InputField label="Branch of Study" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE" />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Academic Year</label>
                                    <select 
                                        name="year" 
                                        value={formData.year} 
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all appearance-none"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="other">Post-Graduate / Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Why do you want to join this course?</label>
                                    <textarea 
                                        name="whyJoin"
                                        value={formData.whyJoin}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all resize-none"
                                        placeholder="Describe your motivation..."
                                    />
                                </div>
                            </div>
                            
                            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                            
                            <button 
                                onClick={nextStep}
                                className="w-full bg-[#92E3A9] text-black py-5 rounded-2xl font-black text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10 flex items-center justify-center gap-2 group"
                            >
                                Continue to Checkout <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </section>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] p-10 space-y-10">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-[#92E3A9] border border-[#92E3A9]/20 px-3 py-1 rounded bg-[#92E3A9]/5 uppercase tracking-widest">02</span>
                                <h2 className="text-xs font-black text-zinc-500">Secure Payment Terminal</h2>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-6 bg-black/40 rounded-3xl p-10 border border-zinc-800">
                                <div className="p-1.5 bg-white rounded-3xl shadow-2xl">
                                    <img 
                                        src="/qr-placeholder.png" // Replace with actual QR if needed, or placeholder
                                        alt="UPI QR Code"
                                        className="w-48 h-48 md:w-64 md:h-64 rounded-2xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-zinc-400">Scan this QR to pay</p>
                                    <h3 className="text-4xl font-black text-[#92E3A9]">₹{course.price}</h3>
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">MISSION VALUATION: {course.price === '0' || !course.price ? 'OPEN ACCESS' : 'FIXED'}</p>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-zinc-900 w-full justify-center">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Encrypted UPI Gateway Protocol</span>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={prevStep}
                                    className="flex-1 bg-zinc-900 text-zinc-500 py-5 rounded-2xl font-black text-xs hover:text-white transition-all"
                                >
                                    Modify Info
                                </button>
                                <button 
                                    onClick={nextStep}
                                    className="flex-[2] bg-[#92E3A9] text-black py-5 rounded-2xl font-black text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10"
                                >
                                    I have completed the payment
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <form onSubmit={handleSubmit} className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] p-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-[#92E3A9] border border-[#92E3A9]/20 px-3 py-1 rounded bg-[#92E3A9]/5 uppercase tracking-widest">03</span>
                                <h2 className="text-xs font-black text-zinc-500">Transaction Authentication</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Reference ID / UTR" name="referenceId" value={formData.referenceId} onChange={handleChange} placeholder="Required" />
                                <InputField label="Transaction ID" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Required" />
                                <InputField label="Issuing Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC, SBI..." />
                                <InputField label="Account Holder Name" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Name on bank account" />
                                <div className="md:col-span-2 space-y-2 opacity-50">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Charged Amount</label>
                                    <input 
                                        disabled
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 text-sm outline-none cursor-not-allowed"
                                        value={`₹${course.price}`}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-zinc-900 text-zinc-500 py-5 rounded-2xl font-black text-xs hover:text-white transition-all"
                                >
                                    View QR Again
                                </button>
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-[2] bg-[#92E3A9] text-black py-5 rounded-2xl font-black text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10 flex items-center justify-center gap-2"
                                >
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Seal Records & Submit</>}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in zoom-in duration-500 flex flex-col items-center justify-center text-center space-y-8 py-12">
                        <div className="w-24 h-24 bg-zinc-900 border border-[#92E3A9]/20 rounded-full flex items-center justify-center shadow-2xl shadow-[#92E3A9]/10">
                            <CheckCircle className="w-12 h-12 text-[#92E3A9]" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tighter italic uppercase">Submission Saved</h2>
                            <p className="text-zinc-500 font-bold max-w-sm mx-auto leading-relaxed italic">
                                "{formData.name}, your enrollment records for {course.title} have been dispatched to Super Admin for verification."
                            </p>
                        </div>
                        <div className="pt-8">
                            <Link 
                                href="/courses"
                                className="bg-[#92E3A9] text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                            >
                                Return to Academy
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = "text" }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
            <input 
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
            />
        </div>
    );
}
