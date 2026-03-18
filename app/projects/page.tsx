"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
    Search, 
    Filter, 
    Github, 
    ExternalLink, 
    Terminal, 
    Users, 
    Clock, 
    CheckCircle2, 
    AlertCircle, 
    ArrowUpRight,
    Home,
    ArrowRight,
    UserCircle,
    BookOpen
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                if (data.success) setProjects(data.projects);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        const title = p.teamName || "";
        const description = p.hackathonName || "";
        const status = p.status || "live";
        
        const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || 
                             description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || status.toLowerCase() === filter.toLowerCase() || (filter === "ongoing" && status === "live");
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
                        <Home size={14} />
                        <span className="text-[14px] tracking-tight">Home</span>
                    </Link>
                    <div className="flex items-center gap-8 px-6 h-10 bg-zinc-50 border border-zinc-100">
                         <Search className="w-3.5 h-3.5 text-zinc-300" />
                         <input 
                            type="text" 
                            placeholder="Find a project..." 
                            className="bg-transparent text-[12px] outline-none w-48 text-zinc-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                         />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">Active Students</span>
                        <div className="h-2 w-2 bg-[#92E3A9] rounded-full animate-pulse" />
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-10 lg:py-12">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/" }, { label: "Projects" }]} />
                        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-xl">
                                <h1 className="text-4xl md:text-5xl tracking-tight text-white mb-6">
                                    Student Projects
                                </h1>
                                <p className="text-zinc-400 text-[15px] leading-relaxed">
                                    See what our students are building. These are real-time projects built during our internship programs.
                                </p>
                            </div>
                            
                            <div className="flex bg-zinc-900 border border-zinc-800 p-1">
                                {["all", "completed", "ongoing"].map((f) => (
                                    <button 
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                                            filter === f ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="h-[400px] bg-zinc-50 border border-zinc-100 animate-pulse" />)}
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="group border border-zinc-100 bg-white hover:border-black transition-all flex flex-col h-full active:scale-[0.99]">
                                    <div className="p-8 space-y-6 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 px-2.5 py-1 bg-zinc-50 border border-zinc-100 uppercase tracking-widest text-[10px] font-bold text-zinc-500">
                                                {project.status === "completed" ? <CheckCircle2 size={10} className="text-[#92E3A9]" /> : <Clock size={10} />}
                                                {project.status}
                                            </div>
                                            <Link href={project.githubRepo || "#"} className="text-zinc-300 hover:text-black transition-colors">
                                                <Github size={18} />
                                            </Link>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[20px] font-bold tracking-tight text-zinc-900 group-hover:text-black leading-tight">
                                                {project.teamName}
                                            </h3>
                                            <p className="text-[14px] text-zinc-500 line-clamp-3 leading-relaxed">
                                                {project.hackathonName}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {project.githubRepo && (
                                                <span className="text-[10px] font-medium text-zinc-400 border border-zinc-100 px-3 py-1">
                                                    Github Project
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-zinc-50 p-6 space-y-4 bg-zinc-50/10">
                                        <div className="flex items-center justify-between text-[12px]">
                                            <div className="flex items-center gap-2">
                                                <UserCircle size={14} className="text-red-500" />
                                                <span className="text-zinc-600 font-medium">{project.teamLeader}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Users size={14} />
                                                <span>Team: {project.teamMembers?.length || 0}</span>
                                            </div>
                                        </div>
                                        
                                        <Link 
                                            href={`/projects/${project.id}`}
                                            className="w-full h-11 border border-zinc-200 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all group/btn"
                                        >
                                            View project
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center border border-zinc-100 border-dashed">
                            <AlertCircle className="w-8 h-8 text-zinc-200 mx-auto mb-4" />
                            <p className="text-[14px] text-zinc-500">No projects found. Try a different search.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}