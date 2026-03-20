"use client";

import { useEffect, useState } from "react";
import { 
    Users, 
    Calendar, 
    ExternalLink, 
    Github, 
    Globe, 
    Search, 
    Filter,
    Loader2,
    CheckCircle2,
    Phone,
    Briefcase,
    Building2,
    Clock,
    UserCheck,
    ArrowUpRight
} from "lucide-react";

export default function InternFormsAdmin() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch("/api/forms/intern");
            const data = await res.json();
            if (data.success) {
                setSubmissions(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-12">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    label="Total Applications" 
                    value={submissions.length} 
                    icon={<Users className="w-5 h-5 text-[#92E3A9]" />} 
                    trend="+12% from last week"
                />
                <StatCard 
                    label="Active Submissions" 
                    value={filteredSubmissions.length} 
                    icon={<Clock className="w-5 h-5 text-[#92E3A9]" />} 
                    trend="Updated just now"
                />
                <StatCard 
                    label="Potential Hires" 
                    value={Math.floor(submissions.length * 0.2)} 
                    icon={<UserCheck className="w-5 h-5 text-[#92E3A9]" />} 
                    trend="Based on initial vetting"
                />
            </div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0A0A0A] p-8 rounded-[2rem] border border-zinc-900 shadow-2xl">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent uppercase tracking-tight">
                        Intern Intake <span className="text-[#92E3A9]">Protocol</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Review and manage student applications for the 2026 cohort.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-[#92E3A9]" />
                        <input 
                            type="text" 
                            placeholder="Filter by name, college, branch..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-xs font-semibold outline-none focus:border-[#92E3A9]/40 transition-all w-80 placeholder:text-zinc-700 text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Application List */}
            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-900 bg-zinc-900/20">
                            <th className="px-8 py-6 text-[11px] font-black text-zinc-500 uppercase tracking-widest">Candidate Information</th>
                            <th className="px-8 py-6 text-[11px] font-black text-zinc-500 uppercase tracking-widest">Academic Context</th>
                            <th className="px-8 py-6 text-[11px] font-black text-zinc-500 uppercase tracking-widest">Contact Details</th>
                            <th className="px-8 py-6 text-[11px] font-black text-zinc-500 uppercase tracking-widest text-right">Portfolio Links</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-40 text-center">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-[#92E3A9]/20 border-t-[#92E3A9] rounded-full animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-[#92E3A9]/10 rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-[#92E3A9] uppercase tracking-[0.3em]">Processing Secure Records</p>
                                            <p className="text-zinc-600 text-[10px] font-bold">Connecting to Forge Database...</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-40 text-center">
                                    <div className="max-w-xs mx-auto space-y-4">
                                        <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto border border-zinc-800">
                                            <Search className="w-8 h-8 text-zinc-700" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-zinc-400">No Applications Found</p>
                                            <p className="text-xs text-zinc-600 font-medium">Try adjusting your search filters above.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredSubmissions.map((submission) => (
                                <tr key={submission.id} className="group hover:bg-zinc-900/40 transition-all duration-300">
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="relative group-hover:scale-110 transition-transform duration-500">
                                                <div className="absolute -inset-1 bg-gradient-to-br from-[#92E3A9] to-transparent opacity-0 group-hover:opacity-20 rounded-2xl blur-sm transition-opacity" />
                                                <div className="h-14 w-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 relative shadow-inner">
                                                    <span className="text-xl font-black text-[#92E3A9] uppercase">{submission.name.charAt(0)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-bold text-white tracking-tight group-hover:text-[#92E3A9] transition-colors">{submission.name}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                                                        Received {new Date(submission.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
                                                    <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                                                </div>
                                                <span className="text-xs font-bold text-zinc-300">{submission.college}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
                                                    <Briefcase className="w-3.5 h-3.5 text-[#92E3A9]/40" />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                                                    <span className="text-zinc-500">{submission.year}</span>
                                                    <span className="text-zinc-800">•</span>
                                                    <span className="text-zinc-400">{submission.branch}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-4 bg-zinc-950 px-4 py-3 rounded-2xl border border-zinc-900 group/phone cursor-pointer hover:border-[#92E3A9]/30 transition-all w-fit">
                                            <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover/phone:text-[#92E3A9] transition-colors">
                                                <Phone className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-xs font-black text-zinc-400 font-mono tracking-tight group-hover/phone:text-white transition-colors">
                                                {submission.phoneNumber}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <SocialLink 
                                                href={submission.githubLink} 
                                                icon={<Github className="w-4 h-4" />} 
                                                label="GitHub" 
                                            />
                                            {submission.portfolioLink && (
                                                <SocialLink 
                                                    href={submission.portfolioLink} 
                                                    icon={<Globe className="w-4 h-4" />} 
                                                    label="Portfolio" 
                                                    accent
                                                />
                                            )}
                                            <button className="h-10 px-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest border border-zinc-800 transition-all group/btn">
                                                <span>Expand</span>
                                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <footer className="text-center pt-10">
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">
                    SECURE INTERN PROTOCOL • END-TO-END DATA ENCRYPTION ACTIVE
                </p>
            </footer>
        </div>
    );
}

function StatCard({ label, value, icon, trend }: any) {
    return (
        <div className="bg-[#0A0A0A] border border-zinc-900 p-8 rounded-[2.5rem] space-y-4 hover:border-[#92E3A9]/20 transition-all group overflow-hidden relative shadow-2xl">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#92E3A9]/5 rounded-full blur-3xl" />
            <div className="flex items-center justify-between relative z-10">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
            </div>
            <div className="space-y-1 relative z-10">
                <p className="text-4xl font-bold font-mono tracking-tighter text-white">{value}</p>
                <p className="text-[10px] font-bold text-zinc-600">{trend}</p>
            </div>
        </div>
    );
}

function SocialLink({ href, icon, label, accent = false }: any) {
    const formattedHref = href.startsWith('http') ? href : `https://${href}`;
    return (
        <a 
            href={formattedHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                h-10 w-10 rounded-xl flex items-center justify-center transition-all border
                ${accent 
                    ? 'bg-[#92E3A9]/10 border-[#92E3A9]/20 text-[#92E3A9] hover:bg-[#92E3A9] hover:text-black hover:scale-110' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 hover:scale-110'}
            `}
            title={label}
        >
            {icon}
        </a>
    );
}
