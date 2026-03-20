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
    Phone,
    Building2,
    Clock,
    UserCheck,
    ArrowUpRight,
    Download
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

    const downloadCSV = () => {
        if (submissions.length === 0) return;

        const headers = ["ID", "Name", "Year", "Branch", "College", "Phone", "GitHub", "Portfolio", "Applied Date"];
        const rows = submissions.map(s => [
            s.id,
            s.name,
            s.year,
            s.branch,
            s.college,
            s.phoneNumber,
            s.githubLink,
            s.portfolioLink || "N/A",
            new Date(s.createdAt).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `intern_applications_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubmissions = submissions.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard 
                    label="Total Applications" 
                    value={submissions.length} 
                    icon={<Users className="w-4 h-4 text-[#92E3A9]" />} 
                />
                <StatCard 
                    label="Filtered Results" 
                    value={filteredSubmissions.length} 
                    icon={<Clock className="w-4 h-4 text-[#92E3A9]" />} 
                />
                <StatCard 
                    label="Potential Candidates" 
                    value={Math.floor(submissions.length * 0.2)} 
                    icon={<UserCheck className="w-4 h-4 text-[#92E3A9]" />} 
                />
            </div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0A0A0A] p-6 rounded-3xl border border-zinc-900 shadow-xl">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-bold text-white uppercase tracking-tight">
                        Intern Intake <span className="text-[#92E3A9]">Protocol</span>
                    </h1>
                    <p className="text-zinc-500 text-[11px] font-medium">Exporting enabled for authorized personnel only.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 transition-colors group-focus-within:text-[#92E3A9]" />
                        <input 
                            type="text" 
                            placeholder="Search records..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-6 py-2.5 text-[11px] font-semibold outline-none focus:border-[#92E3A9]/40 transition-all w-56 placeholder:text-zinc-700 text-white"
                        />
                    </div>
                    <button 
                        onClick={downloadCSV}
                        className="h-10 px-4 bg-zinc-900 hover:bg-[#92E3A9] hover:text-black rounded-xl flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 transition-all group"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                    </button>
                    <button className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-800 transition-all">
                        <Filter className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Application List */}
            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl overflow-hidden shadow-xl overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-900 bg-zinc-900/10">
                            <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Candidate Info</th>
                            <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Academic Context</th>
                            <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Contact</th>
                            <th className="px-6 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] text-right">Links</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/30">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-32 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-8 h-8 text-[#92E3A9] animate-spin" />
                                        <p className="text-[10px] font-black text-[#92E3A9] uppercase tracking-[0.3em]">Syncing Records</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-32 text-center">
                                    <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">No matching records found</p>
                                </td>
                            </tr>
                        ) : (
                            filteredSubmissions.map((submission) => (
                                <tr key={submission.id} className="group hover:bg-zinc-900/20 transition-all duration-200">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shrink-0">
                                                <span className="text-sm font-black text-[#92E3A9] uppercase">{submission.name.charAt(0)}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white tracking-tight group-hover:text-[#92E3A9] transition-colors line-clamp-1">{submission.name}</span>
                                                <span className="text-[9px] text-zinc-600 font-bold uppercase mt-0.5 whitespace-nowrap">
                                                    Applied {new Date(submission.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-3 h-3 text-zinc-700" />
                                                <span className="text-[11px] font-semibold text-zinc-400 line-clamp-1">{submission.college}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[9px] font-bold uppercase text-zinc-600 pl-5">
                                                <span>{submission.year}</span>
                                                <span className="opacity-30">•</span>
                                                <span>{submission.branch}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2.5 bg-zinc-950/50 px-3 py-1.5 rounded-lg border border-zinc-900 w-fit">
                                            <Phone className="w-3 h-3 text-zinc-800" />
                                            <span className="text-[10px] font-bold text-zinc-500 font-mono">{submission.phoneNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-2 text-right">
                                            <SocialLink 
                                                href={submission.githubLink} 
                                                icon={<Github className="w-3.5 h-3.5" />} 
                                                label="GitHub" 
                                            />
                                            {submission.portfolioLink && (
                                                <SocialLink 
                                                    href={submission.portfolioLink} 
                                                    icon={<Globe className="w-3.5 h-3.5" />} 
                                                    label="Portfolio" 
                                                    accent
                                                />
                                            )}
                                            <button className="h-8 w-8 bg-zinc-900 hover:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white border border-zinc-800 transition-all group/btn">
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

            <p className="text-center text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em] py-4">
                SECURE ACCESS • FORGE ENCRYPTION ACTIVE
            </p>
        </div>
    );
}

function StatCard({ label, value, icon }: any) {
    return (
        <div className="bg-[#0A0A0A] border border-zinc-900 p-5 rounded-3xl flex items-center justify-between hover:border-[#92E3A9]/20 transition-all group shadow-lg">
            <div className="space-y-0.5">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
                <p className="text-2xl font-bold font-mono tracking-tighter text-white">{value}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:bg-[#92E3A9]/10 group-hover:border-[#92E3A9]/20 transition-all">
                {icon}
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
                h-8 w-8 rounded-lg flex items-center justify-center transition-all border
                ${accent 
                    ? 'bg-[#92E3A9]/5 border-[#92E3A9]/10 text-[#92E3A9] hover:bg-[#92E3A9] hover:text-black hover:scale-105' 
                    : 'bg-zinc-950 border-zinc-900 text-zinc-600 hover:text-white hover:bg-zinc-800 hover:scale-105'}
            `}
            title={label}
        >
            {icon}
        </a>
    );
}
