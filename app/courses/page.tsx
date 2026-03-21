"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Star, Users, BookOpen, GraduationCap, ChevronRight, Loader2, Globe, Home } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/home/Footer";

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
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 group transition-all">
                        <img src="/sf-next-logo.png" alt="Student Forge Logo" className="h-9 w-9 object-contain transition-transform group-hover:scale-105 duration-300" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <span className="text-[14px] font-bold tracking-tight text-zinc-900 leading-none">Student Forge</span>
                            <div className="hidden sm:block h-3 w-[1px] bg-zinc-200" />
                            <span className="hidden sm:block text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-0.5">Academy</span>
                        </div>
                    </Link>
                    <div className="flex gap-8">
                        <Link href="/courses" className="text-[12px] text-black font-bold uppercase tracking-widest border-b border-black">Courses</Link>
                        <Link href="/docs" className="text-[12px] text-zinc-400 font-bold uppercase tracking-widest hover:text-black transition-colors">Docs</Link>
                        <Link href="/support" className="text-[12px] text-zinc-400 font-bold uppercase tracking-widest hover:text-black transition-colors">Help</Link>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-[#0055FF] py-12 lg:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs white items={[{ label: "Academy", href: "/" }, { label: "Courses" }]} />

                        <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-1.5 w-1.5 bg-[#0055FF]" />
                                    <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Academy</span>
                                </div>
                                <h1 className="mb-4 text-4xl tracking-tight text-white md:text-5xl">
                                    Our Courses
                                </h1>
                                <p className="max-w-md text-[14px] leading-relaxed text-white/70">
                                    Learn how to build better software with our expert-led courses and projects.
                                </p>
                            </div>

                            {/* Sharp Dark Search Bar */}
                            <div className="relative w-full lg:w-96 group">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" strokeWidth={1.5} />
                                <input 
                                    type="text" 
                                    placeholder="Find a course or instructor..." 
                                    className="h-11 w-full border border-white/10 bg-white/10 px-11 text-[13px] text-white outline-none transition-colors focus:bg-white/15 placeholder:text-white/30"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
                    {loading ? (
                        <div className="flex h-96 flex-col items-center justify-center gap-4">
                            <Loader2 className="h-6 w-6 animate-spin text-zinc-300" strokeWidth={1.5} />
                            <p className="text-[13px] text-zinc-400">Loading courses...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                            {filteredCourses.map((course) => (
                                <Link 
                                    href={`/courses/${course.id}`} 
                                    key={course.id}
                                    className="group flex flex-col bg-white border border-zinc-100 transition-all hover:border-black active:scale-[0.99]"
                                >
                                    <div className="aspect-[16/10] relative bg-zinc-50 flex items-center justify-center overflow-hidden border-b border-zinc-100">
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500" />
                                        ) : (
                                            <BookOpen className="w-10 h-10 text-zinc-100" />
                                        )}
                                        <div className="absolute top-4 left-4 border border-zinc-800 bg-black/80 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-widest">
                                            {course.level}
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                                                <Star className="w-3 h-3 text-[#0055FF] fill-current" />
                                                <span className="text-zinc-900 font-bold">{course.rating || "5.0"}</span>
                                            </div>
                                            <div className="h-3 w-[1px] bg-zinc-100" />
                                            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                                                <Users className="w-3 h-3" />
                                                <span>{course.enrolledCount}+ enrolled</span>
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-[18px] font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors mb-2 leading-tight">
                                            {course.title}
                                        </h3>
                                        <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed mb-8">
                                            {course.subtitle || course.description}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-400">
                                                    {course.instructorName?.[0] || "I"}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-bold text-zinc-900">{course.instructorName}</p>
                                                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Staff</p>
                                                </div>
                                            </div>
                                            <div className="text-[13px] font-bold text-zinc-900">
                                                {course.price === "0" || !course.price ? "Free" : `₹${course.price}`}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enrollment Banner */}
                                    <div className="h-12 w-full bg-black flex items-center justify-between px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90">
                                        <span>View Details</span>
                                        <ChevronRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    
                    {!loading && filteredCourses.length === 0 && (
                        <div className="h-96 border border-dashed border-zinc-100 flex flex-col items-center justify-center gap-4 text-center">
                            <Globe className="w-10 h-10 text-zinc-100" strokeWidth={1} />
                            <div className="max-w-xs">
                                <p className="text-[15px] text-zinc-500 font-bold">No courses found.</p>
                                <p className="text-[12px] text-zinc-400 mt-1">Try a different search or word.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
