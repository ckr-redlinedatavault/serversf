"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
    ChevronRight, 
    ArrowLeft, 
    CheckCircle, 
    Loader2, 
    ShieldCheck, 
    Home,
    Send,
    User,
    Mail,
    Phone,
    Building2,
    GraduationCap,
    Clock,
    Lock,
    Eye,
    Ticket
} from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Footer from "../../../components/home/Footer";

export default function EnrollmentPage() {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    
    // Payment specific states
    const [isRevealed, setIsRevealed] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(false);
    const [finalPrice, setFinalPrice] = useState<number>(1499);

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
        amount: "1499"
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${id}`);
                const data = await res.json();
                if (data.success) {
                    setCourse(data.course);
                    const basePrice = parseInt(data.course.price) || 1499;
                    setFinalPrice(basePrice);
                    setFormData(prev => ({ ...prev, amount: basePrice.toString() }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === "INTERN26") {
            setAppliedCoupon(true);
            setFinalPrice(999);
            setFormData(prev => ({ ...prev, amount: "999" }));
            setError("");
        } else {
            setError("Invalid coupon code.");
            setAppliedCoupon(false);
            setFinalPrice(parseInt(course?.price) || 1499);
        }
    };

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
                    ...formData,
                    amount: finalPrice.toString()
                })
            });
            const data = await res.json();
            if (data.success) {
                setStep(4); // Success step
            } else {
                setError(data.error || "Form submission failed. Please check your details.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // Deep link UPI generation for scanning
    const upiId = "6302933597@hdfc";
    const upiName = "Student Forge";
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${finalPrice}&cu=INR`;
    const qrSource = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

    if (loading) return (
        <div className="h-screen bg-white flex items-center justify-center text-zinc-300">
            <Loader2 className="w-8 h-8 animate-spin" strokeWidth={1.5} />
        </div>
    );

    if (step === 4) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 border border-zinc-900 flex items-center justify-center mb-8">
                    <CheckCircle className="w-10 h-10 text-zinc-900" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl tracking-tight mb-4 font-bold">Registration Received</h1>
                <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed mb-10 text-[15px]">
                    {formData.name}, your registration for {course?.title} has been received. We will verify your payment soon.
                </p>
                <div className="flex gap-4">
                    <Link href="/courses" className="bg-black text-white px-8 py-3 text-[12px] transition-opacity hover:opacity-90">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-70">
                            <Home className="w-4 h-4" />
                            <span className="text-[14px] tracking-tight hidden sm:block">Home</span>
                        </Link>
                        <div className="w-[1px] h-4 bg-zinc-100 hidden sm:block" />
                        <Link href={`/courses/${id}`} className="flex items-center gap-2 group transition-opacity hover:opacity-70">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-[14px] tracking-tight">Return</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header - Sharp Black */}
                <div className="bg-black py-12 lg:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/courses" }, { label: course?.title || "Course", href: `/courses/${id}` }, { label: "Registration" }]} />
                        <h1 className="text-4xl md:text-5xl tracking-tight text-white mt-8 mb-4">
                            Register for Course
                        </h1>
                        <p className="text-zinc-400 text-[15px] leading-relaxed">
                            Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Payment' : 'Verification'}
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Summary / Progress */}
                        <aside className="lg:col-span-4 h-fit space-y-12">
                             <div className="space-y-6">
                                 <h4 className="text-[12px] font-medium text-zinc-400 uppercase tracking-widest">Total cost</h4>
                                 <div className="p-8 border border-zinc-100 space-y-6">
                                     <div className="flex justify-between items-center text-[14px]">
                                         <span className="text-zinc-500">Course Fee</span>
                                         <span className={`${appliedCoupon ? 'line-through text-zinc-300' : 'text-zinc-900 font-medium'}`}>₹{course?.price || "1499"}</span>
                                     </div>
                                     {appliedCoupon && (
                                         <div className="flex justify-between items-center text-[14px]">
                                             <span className="text-green-600 font-medium">Coupon Applied</span>
                                             <span className="text-zinc-900 font-medium">-₹{parseInt(course?.price || "1499") - 999}</span>
                                         </div>
                                     )}
                                     <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                                         <span className="text-[12px] font-medium uppercase tracking-wider">Final Price</span>
                                         <span className="text-2xl font-medium tracking-tighter">₹{finalPrice}</span>
                                     </div>
                                 </div>
                             </div>

                             <div className="space-y-8">
                                 <ProgressItem number="01" label="Candidate Info" active={step === 1} completed={step > 1} />
                                 <ProgressItem number="02" label="Payment" active={step === 2} completed={step > 2} />
                                 <ProgressItem number="03" label="Verification" active={step === 3} completed={step > 3} />
                             </div>
                        </aside>

                        {/* Form Area */}
                        <div className="lg:col-span-8">
                            {step === 1 && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Required" icon={<User size={16} />} />
                                        <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="Required" type="email" icon={<Mail size={16} />} />
                                        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" icon={<Phone size={16} />} />
                                        <InputField label="College / Institution" name="college" value={formData.college} onChange={handleChange} placeholder="Required" icon={<Building2 size={16} />} />
                                        <InputField label="Branch of Study" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE" icon={<GraduationCap size={16} />} />
                                        <div className="space-y-4">
                                            <label className="text-[12px] font-medium text-zinc-400 uppercase tracking-wider">Academic Year</label>
                                            <div className="relative">
                                                <select 
                                                    name="year" 
                                                    value={formData.year} 
                                                    onChange={handleChange}
                                                    className="w-full bg-white border border-zinc-200 h-12 px-6 text-[14px] outline-none transition-colors focus:border-black appearance-none"
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <label className="text-[12px] font-medium text-zinc-400 uppercase tracking-wider">Coupon Code (Optional)</label>
                                        <div className="flex gap-4">
                                            <div className="relative flex-1">
                                                <Ticket size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
                                                <input 
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    className="w-full border border-zinc-200 h-12 px-12 text-[14px] outline-none"
                                                    placeholder="Enter code"
                                                />
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                className="bg-zinc-100 px-8 h-12 text-[12px] font-medium uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-[12px]">{error}</p>}
                                    
                                    <button 
                                        onClick={nextStep}
                                        className="w-full bg-black text-white h-12 flex items-center justify-center gap-2 text-[13px] transition-opacity hover:opacity-90 uppercase tracking-widest"
                                    >
                                        Proceed to Payment <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="border border-zinc-100 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        {!isRevealed ? (
                                            <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 cursor-pointer group" onClick={() => setIsRevealed(true)}>
                                                <div className="w-20 h-20 bg-black text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                                                    <Lock size={24} />
                                                </div>
                                                <h3 className="text-[17px] font-medium mb-2">QR Code is hidden</h3>
                                                <p className="text-[13px] text-zinc-500 max-w-[200px]">Click to see the UPI address and QR scan.</p>
                                                <button className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-1">
                                                    <Eye size={12} /> Click to show
                                                </button>
                                            </div>
                                        ) : null}

                                        <div className="border border-zinc-100 p-2 mb-8 bg-white shadow-sm">
                                            <img 
                                                src={qrSource}
                                                alt="UPI QR Code"
                                                className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[11px] text-zinc-400 uppercase tracking-widest">Scan to pay this amount</span>
                                            <h3 className="text-4xl font-medium tracking-tighter text-zinc-900">₹{finalPrice}</h3>
                                        </div>
                                        <div className="mt-8 flex items-center gap-3 text-zinc-400">
                                            <ShieldCheck size={16} className="text-[#92E3A9]" strokeWidth={1.5} />
                                            <span className="text-[11px] font-medium uppercase tracking-widest leading-none">Secure UPI Link</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={prevStep}
                                            className="flex-1 border border-zinc-200 text-zinc-400 h-12 text-[12px] transition-colors hover:bg-zinc-50 uppercase tracking-widest"
                                        >
                                            Back
                                        </button>
                                        <button 
                                            onClick={nextStep}
                                            className="flex-[2] bg-black text-white h-12 text-[12px] transition-opacity hover:opacity-90 uppercase tracking-widest"
                                        >
                                            Done, I have paid
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <InputField label="Reference ID / UTR" name="referenceId" value={formData.referenceId} onChange={handleChange} placeholder="Required" icon={<ShieldCheck size={16} />} />
                                        <InputField label="Transaction ID" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Required" icon={<Clock size={16} />} />
                                        <InputField label="Your Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC, SBI" icon={<Building2 size={16} />} />
                                        <InputField label="Account Name" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Full name on bank account" icon={<User size={16} />} />
                                    </div>

                                    {error && <p className="text-red-500 text-[12px]">{error}</p>}
                                    
                                    <div className="flex gap-4">
                                        <button 
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 border border-zinc-200 text-zinc-400 h-12 text-[12px] transition-colors hover:bg-zinc-50 uppercase tracking-widest"
                                        >
                                            Back to QR
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-[2] bg-black text-white h-12 text-[12px] transition-opacity hover:opacity-90 uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            {submitting ? <Loader2 size={16} className="animate-spin" /> : (
                                                <>
                                                    <span>Finish Registration</span>
                                                    <Send size={14} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = "text", icon }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[12px] font-medium text-zinc-400 uppercase tracking-wider">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300">
                    {icon}
                </div>
                <input 
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-white border border-zinc-200 h-12 px-12 text-[14px] outline-none transition-colors focus:border-black"
                />
            </div>
        </div>
    );
}

function ProgressItem({ number, label, active, completed }: any) {
    return (
        <div className={`flex items-center gap-6 transition-all duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`h-10 w-10 flex items-center justify-center text-[11px] font-medium border ${completed ? 'bg-black text-white border-black' : active ? 'border-black text-black' : 'border-zinc-100 text-zinc-300'}`}>
                {completed ? <CheckCircle size={14} /> : number}
            </div>
            <div>
                <span className="text-[12px] font-medium uppercase tracking-widest block">{label}</span>
            </div>
        </div>
    );
}
