"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
    ArrowLeft, 
    ShieldCheck, 
    CheckCircle2, 
    XCircle, 
    Trash2, 
    Loader2, 
    ExternalLink, 
    Phone, 
    Mail, 
    Calendar, 
    Building2, 
    GraduationCap, 
    PenTool,
    Clock,
    User,
    CreditCard,
    Key,
    Info,
    BookOpen
} from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function EnrollmentDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [enrollment, setEnrollment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchEnrollment = async () => {
            try {
                const res = await fetch(`/api/courses/enroll/${id}`);
                const data = await res.json();
                if (data.success) setEnrollment(data.enrollment);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollment();
    }, [id]);

    const updateStatus = async (status: string) => {
        setProcessing(true);
        try {
            const res = await fetch(`/api/courses/enroll/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.success) {
                setEnrollment({ ...enrollment, status });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const deleteRecord = async () => {
        if (!confirm("Are you sure you want to delete this enrollment record?")) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/courses/enroll/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) router.push("/dashboard/enrollments");
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-[#050505] flex items-center justify-center text-[#92E3A9]">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    );

    if (!enrollment) return (
        <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-600 gap-6">
            <ShieldCheck className="w-16 h-16 opacity-10" />
            <p className="font-black text-xl text-white">Record Not Found</p>
            <Link href="/dashboard/enrollments" className="text-[10px] font-black text-[#92E3A9] underline uppercase tracking-widest">Back to Registry</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#92E3A9] selection:text-black pb-20 p-6 md:p-12">
            <div className="max-w-[1400px] mx-auto">
                <nav className="flex items-center justify-between mb-12">
                    <div className="flex flex-col gap-4">
                        <Breadcrumbs items={[
                            { label: "Admin", href: "/dashboard" },
                            { label: "Enrollments", href: "/dashboard/enrollments" },
                            { label: "Detail" }
                        ]} />
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-balance">
                            Enrollment <span className="text-[#92E3A9]">#{enrollment.referenceId}</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <StatusBadge status={enrollment.status} />
                        <button 
                            onClick={deleteRecord}
                            className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Metadata & Verification */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[3rem] p-10 space-y-10">
                            <div>
                                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Course Target</h3>
                                <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl group">
                                    <div className="flex items-center gap-4 mb-3">
                                        <BookOpen className="w-5 h-5 text-[#92E3A9]" />
                                        <span className="text-xs font-black uppercase tracking-tighter">Mission Name</span>
                                    </div>
                                    <p className="text-lg font-bold text-white group-hover:text-[#92E3A9] transition-all">{enrollment.course.title}</p>
                                    <p className="text-[10px] font-bold text-zinc-700 mt-1 uppercase tracking-widest">Level: {enrollment.course.level}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Identity Check</h3>
                                <div className="space-y-4">
                                    <DetailRow icon={User} label="Candidate" value={enrollment.name} />
                                    <DetailRow icon={Mail} label="Email ID" value={enrollment.email} />
                                    <DetailRow icon={Phone} label="Contact" value={enrollment.phone} />
                                    <DetailRow icon={Building2} label="Institution" value={enrollment.college} />
                                    <DetailRow icon={GraduationCap} label="Status" value={`${enrollment.year} Year, ${enrollment.branch}`} />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-zinc-900">
                                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Verification Actions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        disabled={processing || enrollment.status === "verified"}
                                        onClick={() => updateStatus("verified")}
                                        className="flex items-center justify-center gap-2 py-4 bg-[#92E3A9] text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <CheckCircle2 className="w-4 h-4" /> Verify
                                    </button>
                                    <button 
                                        disabled={processing || enrollment.status === "rejected"}
                                        onClick={() => updateStatus("rejected")}
                                        className="flex items-center justify-center gap-2 py-4 bg-zinc-900/50 border border-zinc-800 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <XCircle className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                                <p className="text-[9px] font-bold text-center text-zinc-700 mt-6 uppercase tracking-tight italic">
                                    "Changes will immediately update the candidate's admission profile."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Analysis */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[3rem] p-10">
                            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-10">Transaction Authentication Dets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#92E3A9]/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CreditCard className="w-8 h-8 text-[#92E3A9] mb-6" />
                                    <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-4">Financial Records</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Valuation Paid</span>
                                            <span className="text-3xl font-black text-[#92E3A9]">₹{enrollment.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Account Holder</span>
                                            <span className="text-sm font-bold text-white uppercase">{enrollment.accountName}</span>
                                        </div>
                                        <div className="flex justify-between items-end pb-4">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Issuing Bank</span>
                                            <span className="text-sm font-bold text-white uppercase">{enrollment.bankName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] relative overflow-hidden group">
                                    <Key className="w-8 h-8 text-[#92E3A9] mb-6" />
                                    <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-4">Registry Keys</h4>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[9px] font-black text-zinc-800 uppercase tracking-widest block mb-1">Reference ID (UTR)</label>
                                            <div className="flex items-center gap-3">
                                                <code className="text-sm font-black text-white bg-zinc-900 px-3 py-1 rounded-lg border border-white/5 uppercase select-all">{enrollment.referenceId}</code>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black text-zinc-800 uppercase tracking-widest block mb-1">Transaction ID</label>
                                            <div className="flex items-center gap-3">
                                                <code className="text-sm font-black text-white bg-zinc-900 px-3 py-1 rounded-lg border border-white/5 uppercase select-all">{enrollment.transactionId}</code>
                                            </div>
                                        </div>
                                        <div className="pt-4 flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-zinc-700" />
                                            <span className="text-[10px] font-bold text-zinc-700 uppercase">Submitted: {new Date(enrollment.createdAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 p-10 bg-zinc-900/20 border border-zinc-900 rounded-[3rem]">
                                    <div className="flex items-center gap-4 mb-8">
                                        <PenTool className="w-6 h-6 text-[#92E3A9]" />
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">Candidate's Motivation</h4>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#92E3A9]/20 to-transparent" />
                                        <p className="text-lg font-medium text-zinc-400 leading-[1.8] italic">
                                            "{enrollment.whyJoin}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center gap-6 group">
            <div className="h-10 w-10 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center shrink-0 group-hover:border-[#92E3A9]/30 transition-all">
                <Icon className="w-4 h-4 text-zinc-800 group-hover:text-[#92E3A9] transition-all" />
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest leading-none mb-1">{label}</span>
                <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-all">{value}</span>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "verified") return (
        <div className="flex items-center gap-2 text-[10px] font-black text-[#92E3A9] bg-[#92E3A9]/10 px-6 py-3 rounded-2xl border border-[#92E3A9]/20 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> Verified Submission
        </div>
    );
    if (status === "rejected") return (
        <div className="flex items-center gap-2 text-[10px] font-black text-red-500 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20 uppercase tracking-widest">
            <XCircle className="w-4 h-4" /> Rejected Admission
        </div>
    );
    return (
        <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 bg-amber-500/10 px-6 py-3 rounded-2xl border border-amber-500/20 uppercase tracking-widest">
            <Clock className="w-4 h-4" /> Awaiting Protocol
        </div>
    );
}
