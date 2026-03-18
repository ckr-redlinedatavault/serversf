"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Star, Users, Clock, BookOpen, GraduationCap, ChevronRight, Loader2, IndianRupee, Globe } from "lucide-react";

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("/api/courses");
                const data = await res.json();
                if (data.success) setCourses(data.courses);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Minimal Navbar */}
            <nav className="w-full bg-[#92E3A9] px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-4 group">
                    <span className="text-sm font-bold tracking-tighter text-zinc-900 uppercase">Student Forge</span>
                    <div className="h-4 w-[1px] bg-zinc-900/20" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-900/70 uppercase">Courses</span>
                </Link>
                <div className="flex gap-8 items-center">
                    <Link href="/" className="text-xs font-bold text-zinc-900/80 hover:text-zinc-900 transition-colors uppercase">Home</Link>
                    <Link href="/courses" className="text-xs font-bold text-zinc-900 hover:scale-105 transition-all uppercase underline underline-offset-4">Browse</Link>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-6 md:px-24 py-16 md:py-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <GraduationCap className="text-[#92E3A9] w-8 h-8" />
                            <span className="text-[10px] font-black text-[#92E3A9] uppercase tracking-[0.4em]">Academic Node</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
                            Master Your <br/>Technical <span className="text-[#92E3A9]">Craft.</span>
                        </h1>
                        <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                            Industry-grade curriculum designed for the next generation of engineers, creators, and builders.
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#92E3A9] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Find your mission..." 
                            className="w-full bg-zinc-900/50 border border-zinc-900 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[#92E3A9] focus:bg-zinc-900 transition-all placeholder:text-zinc-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4 text-zinc-700">
                        <Loader2 className="w-10 h-10 animate-spin text-[#92E3A9]" />
                        <p className="text-xs font-bold uppercase tracking-widest">Hydrating Curriculum Matrix...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <Link 
                                href={`/courses/${course.id}`} 
                                key={course.id}
                                className="group bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] overflow-hidden hover:border-[#92E3A9]/40 transition-all flex flex-col hover:-translate-y-2 duration-500 shadow-2xl hover:shadow-[#92E3A9]/5"
                            >
                                <div className="aspect-video relative bg-zinc-900 flex items-center justify-center overflow-hidden">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <BookOpen className="w-12 h-12 text-zinc-800" />
                                    )}
                                    <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/5 rounded-full text-[9px] font-black text-white uppercase tracking-wider">
                                        {course.level}
                                    </div>
                                    <div className="absolute bottom-6 right-6 px-3 py-1 bg-[#92E3A9] rounded-lg text-[10px] font-black text-black uppercase shadow-lg">
                                        {course.price === "0" || !course.price ? "Free" : `$${course.price}`}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1 text-[#92E3A9]">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-[10px] font-bold">{course.rating || "5.0"}</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                        <div className="flex items-center gap-1 text-zinc-500">
                                            <Users className="w-3 h-3" />
                                            <span className="text-[10px] font-bold">{course.enrolledCount}+ Students</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#92E3A9] transition-colors">{course.title}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium mb-8">
                                        {course.subtitle || course.description}
                                    </p>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-900">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-[#92E3A9]">
                                                {course.instructorName?.[0] || "I"}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-white">{course.instructorName}</p>
                                                <p className="text-[8px] font-bold text-zinc-600 uppercase">Sensei</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
                {!loading && filteredCourses.length === 0 && (
                    <div className="h-80 border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center gap-6 text-zinc-600">
                        <Globe className="w-12 h-12 opacity-10" />
                        <div className="text-center">
                            <p className="font-bold text-lg">No matching modules found.</p>
                            <p className="text-sm">Try broadening your search parameters.</p>
                        </div>
                    </div>
                )}
            </main>

            <footer className="w-full bg-[#0A0A0A] border-t border-zinc-900 py-16 px-6 md:px-24">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                        <span className="text-sm font-black text-[#92E3A9] uppercase tracking-tighter">Student Forge</span>
                        <p className="text-zinc-600 text-xs max-w-sm">The official technical curriculum for the Forge builder community. Sydney Node v4.2 stable access.</p>
                    </div>
                    <div className="flex gap-12">
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Network</span>
                            <Link href="/about" className="text-xs font-bold text-zinc-400 hover:text-[#92E3A9] transition-colors">About</Link>
                            <Link href="/careers" className="text-xs font-bold text-zinc-400 hover:text-[#92E3A9] transition-colors">Careers</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
