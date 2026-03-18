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
            {/* Main Navbar Sync */}
            <nav className="w-full bg-[#92E3A9] px-12 py-3 sm:px-24 flex items-center justify-between z-50 sticky top-0 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <span className="text-sm font-semibold tracking-tight text-zinc-900">Student Forge</span>
                        <div className="h-4 w-[1px] bg-zinc-900/20" />
                        <span className="text-[10px] font-semibold text-zinc-900/70">Academy</span>
                    </Link>
                </div>
                <div className="flex gap-8">
                    <Link href="/" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Home</Link>
                    <Link href="/courses" className="text-xs font-bold text-zinc-900 border-b-2 border-zinc-900 pb-1">Courses</Link>
                    <Link href="/docs" className="text-xs font-semibold text-zinc-900/80 hover:text-zinc-900 transition-colors">Documentation</Link>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-12 md:px-24 py-12 md:py-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="text-[#92E3A9] w-6 h-6" />
                            <span className="text-[10px] font-semibold text-[#92E3A9]">Learning Academy</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4">
                            Expand Your <span className="text-[#92E3A9]">Technical Skills.</span>
                        </h1>
                        <p className="text-zinc-500 text-base leading-relaxed font-medium">
                            Professional courses designed to help you build better software and master your craft.
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#92E3A9] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
                            className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl py-3 pl-11 pr-6 text-sm outline-none focus:border-[#92E3A9] transition-all placeholder:text-zinc-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4 text-zinc-800">
                        <Loader2 className="w-8 h-8 animate-spin text-[#92E3A9]" />
                        <p className="text-xs font-medium">Loading courses...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <Link 
                                href={`/courses/${course.id}`} 
                                key={course.id}
                                className="group bg-[#0A0A0A] border border-zinc-900 rounded-2xl overflow-hidden hover:border-[#92E3A9]/40 transition-all flex flex-col hover:-translate-y-1 duration-300"
                            >
                                <div className="aspect-video relative bg-zinc-900 flex items-center justify-center overflow-hidden">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <BookOpen className="w-10 h-10 text-zinc-800" />
                                    )}
                                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-semibold text-white">
                                        {course.level}
                                    </div>
                                    <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-[#92E3A9] rounded-lg text-[10px] font-semibold text-black shadow-lg">
                                        {course.price === "0" || !course.price ? "Free" : `$${course.price}`}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-1 text-[#92E3A9]">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-[10px] font-medium">{course.rating || "5.0"}</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                        <div className="flex items-center gap-1 text-zinc-500">
                                            <Users className="w-3 h-3" />
                                            <span className="text-[10px] font-medium">{course.enrolledCount}+ Students</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 leading-tight group-hover:text-[#92E3A9] transition-colors">{course.title}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-6 font-normal">
                                        {course.subtitle || course.description}
                                    </p>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-zinc-900">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-semibold text-[#92E3A9]">
                                                {course.instructorName?.[0] || "I"}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-white">{course.instructorName}</p>
                                                <p className="text-[8px] text-zinc-600">Instructor</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
                {!loading && filteredCourses.length === 0 && (
                    <div className="h-64 border border-zinc-900 rounded-3xl flex flex-col items-center justify-center gap-4 text-zinc-600">
                        <Globe className="w-10 h-10 opacity-20" />
                        <div className="text-center">
                            <p className="font-semibold text-base">No courses found.</p>
                            <p className="text-xs">Try searching for something else.</p>
                        </div>
                    </div>
                )}
            </main>

            <footer className="w-full bg-[#0A0A0A] border-t border-zinc-900 py-12 px-12 md:px-24">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                        <span className="text-sm font-semibold text-[#92E3A9]">Student Forge Academy</span>
                        <p className="text-zinc-600 text-[10px] max-w-sm font-medium">Professional curriculum for student developers and builders.</p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/about" className="text-xs font-medium text-zinc-500 hover:text-[#92E3A9] transition-colors">About</Link>
                        <Link href="/support" className="text-xs font-medium text-zinc-500 hover:text-[#92E3A9] transition-colors">Support</Link>
                        <span className="text-[10px] font-semibold text-zinc-700">© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
