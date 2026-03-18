"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Plus, 
    Trash2, 
    Github, 
    Users, 
    User, 
    ShieldCheck, 
    Zap, 
    Loader2, 
    ArrowLeft,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function HackathonSubmissionPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    
    const [formData, setFormData] = useState({
        teamName: "",
        teamLeader: "",
        githubRepo: "",
    });

    const [members, setMembers] = useState<string[]>([""]);

    const addMember = () => {
        setMembers([...members, ""]);
    };

    const removeMember = (index: number) => {
        if (members.length > 1) {
            const newMembers = [...members];
            newMembers.splice(index, 1);
            setMembers(newMembers);
        }
    };

    const handleMemberChange = (index: number, value: string) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    teamMembers: members.filter(m => m.trim() !== "")
                }),
            });

            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-zinc-900 border border-[#92E3A9]/20 rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-[#92E3A9]/10">
                    <CheckCircle className="w-12 h-12 text-[#92E3A9]" />
                </div>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Strategic Submission Seated</h1>
                <p className="text-zinc-500 font-bold max-w-sm mx-auto leading-relaxed mb-10">
                    "Your Hackathon project for Team {formData.teamName} has been recorded in the Forge Network."
                </p>
                <div className="flex gap-4">
                    <Link href="/projects" className="bg-[#92E3A9] text-black px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">View All Projects</Link>
                    <Link href="/" className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Minimal Sub-Navbar */}
            <nav className="w-full bg-[#0A0A0A] border-b border-zinc-900 px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3 group">
                    <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-[#92E3A9] transition-colors" />
                    <span className="text-[10px] font-bold tracking-tight text-white uppercase">Return Home</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-[#92E3A9] rounded-full animate-pulse shadow-[0_0_8px_rgba(146,227,169,0.5)]" />
                    <span className="text-[10px] font-black text-[#92E3A9] uppercase tracking-widest">Hackathon Live</span>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-6 md:px-24 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: "HACK FORGE '26", href: "/events" }, { label: "Project Submission" }]} />
                        <h1 className="text-6xl font-black tracking-tighter italic leading-tight mb-8">
                            HACK FORGE <br/>
                            <span className="text-[#92E3A9]">NETWORK '26</span>
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md mb-12">
                            Deploy your project repository to the Forge Registry. Every submission is recorded instantly in the public projects directory.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-6 p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl group hover:border-[#92E3A9]/20 transition-all">
                                <ShieldCheck className="w-6 h-6 text-[#92E3A9] shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold mb-1">Authenticated Deployment</h4>
                                    <p className="text-xs text-zinc-500 font-medium">Verified GitHub links are mandatory for all hackathon entries.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl group hover:border-[#92E3A9]/20 transition-all">
                                <Zap className="w-6 h-6 text-[#92E3A9] shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold mb-1">Instant Listing</h4>
                                    <p className="text-xs text-zinc-500 font-medium">Your project will appear in the public registry immediately after submission.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#92E3A9]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                        
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Mission Identifier (Team Name)</label>
                                <div className="relative">
                                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                                    <input 
                                        required
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-14 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        placeholder="e.g. CyberForge X"
                                        value={formData.teamName}
                                        onChange={e => setFormData({...formData, teamName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Tactical Lead (Team Leader)</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                                    <input 
                                        required
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-14 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        placeholder="Leader Full Name"
                                        value={formData.teamLeader}
                                        onChange={e => setFormData({...formData, teamLeader: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Network Units (Team Members)</label>
                                    <button 
                                        type="button" 
                                        onClick={addMember}
                                        className="text-[10px] font-black text-[#92E3A9] hover:underline flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Member
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {members.map((member, index) => (
                                        <div key={index} className="flex gap-2 animate-in slide-in-from-left-2 duration-300">
                                            <input 
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                                placeholder={`Member #${index + 2} Name`}
                                                value={member}
                                                onChange={e => handleMemberChange(index, e.target.value)}
                                            />
                                            {members.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeMember(index)}
                                                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-700 hover:text-red-500 hover:border-red-500/20 transition-all font-bold"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-zinc-900">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Git Repository (Live Link)</label>
                                <div className="relative">
                                    <Github className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                                    <input 
                                        required
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-14 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        placeholder="https://github.com/team/project"
                                        value={formData.githubRepo}
                                        onChange={e => setFormData({...formData, githubRepo: e.target.value})}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}

                            <button 
                                disabled={submitting}
                                className="w-full bg-[#92E3A9] text-black py-5 rounded-2xl font-black text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10 flex items-center justify-center gap-3 mt-4"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Finalize Mission Deployment</>}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
