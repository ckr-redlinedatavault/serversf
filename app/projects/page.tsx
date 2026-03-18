"use client";

import { useEffect, useState } from "react";
import { 
    Github, 
    ExternalLink, 
    Users, 
    Calendar,
    Search,
    Loader2,
    Code2,
    Award,
    Plus
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            if (data.success) {
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => 
        p.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.teamLeader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Minimal Navbar */}
            <nav className="w-full bg-[#0A0A0A] border-b border-zinc-900 px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3">
                    <span className="text-sm font-semibold tracking-tight text-white uppercase">Forge Registry</span>
                </Link>
                <div className="flex gap-4">
                    <Link href="/hackathon/submit" className="bg-[#92E3A9] text-black px-6 py-2 rounded-lg font-semibold text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2">
                        <Plus className="w-3 h-3" /> Submit Project
                    </Link>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-6 md:px-24 py-16">
                <div className="mb-16">
                    <Breadcrumbs items={[{ label: "Network", href: "/" }, { label: "Project Registry" }]} />
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none mb-6">Mission <br/>Archives</h1>
                            <p className="text-zinc-500 font-medium text-sm max-w-sm uppercase tracking-widest">Public Directory of Verified Hackathon Deployments.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                            <input 
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-14 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                placeholder="Search Mission Registry..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4 text-zinc-800">
                        <Loader2 className="w-10 h-10 animate-spin text-[#92E3A9]" />
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Accessing Records...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 flex flex-col group hover:border-[#92E3A9]/20 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#92E3A9]/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-[#92E3A9] group-hover:bg-[#92E3A9] group-hover:text-black transition-all">
                                        <Code2 className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-600 text-[9px] font-semibold uppercase tracking-tight">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(project.submissionDate).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-[#92E3A9] transition-colors">{project.teamName}</h3>
                                    <div className="flex items-center gap-2 text-zinc-600 mb-6">
                                        <Award className="w-3 h-3" />
                                        <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{project.teamLeader} <span className="text-zinc-800 text-xs space-x-2">& Team</span></span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {project.teamMembers.map((member: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-zinc-900/50 border border-zinc-900 rounded-lg text-[9px] font-medium text-zinc-500 uppercase">
                                                {member}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center justify-between">
                                    <Link 
                                        href={project.githubRepo} 
                                        target="_blank" 
                                        className="flex items-center gap-3 text-white text-[10px] font-semibold uppercase tracking-widest hover:text-[#92E3A9] transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        Repository Link
                                    </Link>
                                    <ExternalLink className="w-3.5 h-3.5 text-zinc-800 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        ))}
                        
                        {filteredProjects.length === 0 && (
                            <div className="col-span-full h-80 border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6">
                                <Users className="w-16 h-16 opacity-10" />
                                <div>
                                    <h4 className="text-lg font-bold text-zinc-600">Static Network Detected</h4>
                                    <p className="text-[10px] font-medium text-zinc-700 uppercase tracking-widest mt-1">No mission records found matching search identifier.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <footer className="mt-20 border-t border-zinc-900 px-6 md:px-24 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-medium text-zinc-800 uppercase tracking-[0.3em]">System Registry Version 4.0.2</span>
                    <div className="w-[1px] h-3 bg-zinc-900" />
                    <span className="text-[9px] font-medium text-zinc-700 uppercase tracking-[0.3em]">HACK FORGE EXCLUSIVE</span>
                </div>
                <Link href="/hackathon/submit" className="text-[9px] font-medium text-[#92E3A9] uppercase hover:underline">Request Registry Update</Link>
            </footer>
        </div>
    );
}
