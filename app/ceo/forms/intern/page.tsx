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
    Mail,
    Phone,
    Building2,
    Briefcase
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
        <div className="p-10 space-y-10">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#92E3A9]/10 border border-[#92E3A9]/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#92E3A9]" />
                        <span className="text-[10px] font-black uppercase text-[#92E3A9] tracking-widest">Active Intake</span>
                    </div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
                        Internship Submissions
                    </h1>
                    <p className="text-zinc-500 font-medium text-xs">Total of {submissions.length} candidates applied through the public portal.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-[#92E3A9]" />
                        <input 
                            type="text" 
                            placeholder="Search name, college, or branch..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-6 py-3.5 text-xs font-semibold outline-none focus:border-[#92E3A9]/30 transition-all w-80 placeholder:text-zinc-700"
                        />
                    </div>
                    <button className="h-[48px] px-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-3 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                        <Filter className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-900 bg-zinc-900/50">
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Candidate</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Year & Branch</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Institution</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contact</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="w-10 h-10 text-[#92E3A9] animate-spin" />
                                            <p className="text-xs font-black text-zinc-600 uppercase tracking-widest">Decrypting Records...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-32 text-center">
                                        <div className="max-w-xs mx-auto space-y-4 opacity-40">
                                            <Search className="w-12 h-12 text-zinc-600 mx-auto" />
                                            <p className="text-xs font-bold text-zinc-500 uppercase">No matching submissions found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubmissions.map((submission) => (
                                    <tr key={submission.id} className="border-b border-zinc-900/50 hover:bg-zinc-800/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-[#92E3A9]/30 transition-all">
                                                    <span className="text-lg font-black text-[#92E3A9] italic">{submission.name.charAt(0)}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white tracking-tight">{submission.name}</span>
                                                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-0.5">Applied {new Date(submission.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3 text-zinc-500" />
                                                    <span className="text-xs font-semibold text-zinc-300">{submission.year}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Briefcase className="w-3 h-3 text-[#92E3A9]/50" />
                                                    <span className="text-[10px] font-bold text-zinc-500 uppercase truncate">{submission.branch}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                                <span className="text-xs font-semibold text-white/80">{submission.college || "Unknown Institute"}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-3 group/phone cursor-pointer">
                                                    <div className="w-7 h-7 rounded-lg bg-zinc-800/50 border border-zinc-800 flex items-center justify-center group-hover/phone:bg-[#92E3A9]/10 transition-colors">
                                                        <Phone className="w-3 h-3 text-zinc-500 group-hover/phone:text-[#92E3A9]" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-zinc-400 font-mono tracking-tight">{submission.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-3">
                                                <a 
                                                    href={submission.githubLink.startsWith('http') ? submission.githubLink : `https://${submission.githubLink}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                                {submission.portfolioLink && (
                                                    <a 
                                                        href={submission.portfolioLink.startsWith('http') ? submission.portfolioLink : `https://${submission.portfolioLink}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="w-9 h-9 bg-[#92E3A9]/10 border border-[#92E3A9]/20 rounded-xl flex items-center justify-center text-[#92E3A9] hover:bg-[#92E3A9] hover:text-black transition-all"
                                                    >
                                                        <Globe className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button className="w-9 h-9 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
