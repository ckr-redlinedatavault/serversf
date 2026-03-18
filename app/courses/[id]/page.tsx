"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
    Star, 
    Users, 
    Clock, 
    BookOpen, 
    Globe, 
    ChevronRight, 
    CheckCircle2, 
    Search,
    PlayCircle,
    FileText,
    HelpCircle,
    ArrowRight,
    ShieldCheck,
    Loader2
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/home/Footer";

export default function CourseDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${id}`);
                const data = await res.json();
                if (data.success) setCourse(data.course);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return (
        <div className="h-screen bg-white flex items-center justify-center text-zinc-300">
            <Loader2 className="w-8 h-8 animate-spin" strokeWidth={1.5} />
        </div>
    );

    if (!course) return <div className="p-24 text-center">Course not found.</div>;

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
            {/* Minimal Navbar - Sharp Edges */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
                        <span className="text-[15px] tracking-tight">Student Forge</span>
                        <div className="h-3 w-[1px] bg-zinc-200" />
                        <span className="text-[13px] text-zinc-400">Academy</span>
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link href="/courses" className="text-[12px] text-zinc-500 hover:text-black">Courses</Link>
                        <Link href={`/courses/${id}/enroll`} className="bg-black text-white px-5 h-9 flex items-center justify-center text-[11px] font-medium transition-opacity hover:opacity-90">
                            Register for course
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {/* Header Section - Sharp Black */}
                <div className="bg-black py-8 lg:py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Breadcrumbs items={[{ label: "Academy", href: "/courses" }, { label: course.title }]} />
                        
                        <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl tracking-tight text-white mb-6">
                                    {course.title}
                                </h1>
                                <p className="text-zinc-400 text-[16px] leading-relaxed line-clamp-2">
                                    {course.subtitle || course.description}
                                </p>
                                
                                <div className="mt-8 flex flex-wrap gap-6 items-center">
                                    <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                                        <Star className="w-4 h-4 text-[#92E3A9] fill-current" />
                                        <span className="text-white font-medium">{course.rating || "5.0"}</span>
                                        <span>Course Rating</span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-zinc-800" />
                                    <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                                        <Users className="w-4 h-4" />
                                        <span className="text-white font-medium">{course.enrolledCount}+</span>
                                        <span>Students Enrolled</span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-zinc-800" />
                                    <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                                        <Globe className="w-4 h-4" />
                                        <span>English</span>
                                    </div>
                                </div>
                            </div>

                            {/* Minimal Search Bar in Header */}
                            <div className="relative w-full lg:w-80 group">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" strokeWidth={1.5} />
                                <input 
                                    type="text" 
                                    placeholder="Search in course..." 
                                    className="h-10 w-full border border-zinc-800 bg-zinc-900 px-10 text-[12px] text-white outline-none transition-colors focus:border-[#92E3A9]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content Side */}
                        <div className="lg:col-span-8 space-y-16">
                            {/* Overview */}
                            <section>
                                <h2 className="text-[20px] font-bold tracking-tight mb-6 flex items-center gap-3">
                                    Course Overview
                                    <div className="h-[1px] flex-1 bg-zinc-100" />
                                </h2>
                                <div className="prose prose-zinc max-w-none text-[15px] leading-relaxed text-zinc-600 space-y-4">
                                    <p>{course.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                        {(course.targetAudience?.length > 0 ? course.targetAudience : ["Engineering students"]).map((item: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 p-4 border border-zinc-50 bg-zinc-50/30">
                                                <CheckCircle2 className="w-4 h-4 text-[#92E3A9] shrink-0 mt-0.5" />
                                                <span className="text-[13px] font-medium text-zinc-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Curriculum */}
                            <section>
                                <h2 className="text-[20px] font-bold tracking-tight mb-6 flex items-center gap-3">
                                    What you will learn
                                    <div className="h-[1px] flex-1 bg-zinc-100" />
                                </h2>
                                <div className="border border-zinc-100 divide-y divide-zinc-100">
                                    {[1, 2, 3, 4].map((module) => (
                                        <div key={module} className="p-6 flex items-center justify-between group hover:bg-zinc-50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                <span className="text-[12px] font-bold text-zinc-300">0{module}</span>
                                                <div className="space-y-1">
                                                    <h3 className="text-[14px] font-bold text-zinc-900">Module name {module}</h3>
                                                    <p className="text-[11px] text-zinc-400">Detailed topics covered in this module.</p>
                                                </div>
                                            </div>
                                            <PlayCircle className="w-4 h-4 text-zinc-200 group-hover:text-black transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Requirements */}
                            <section>
                                <h2 className="text-[20px] font-bold tracking-tight mb-6 flex items-center gap-3">
                                    Prerequisites
                                    <div className="h-[1px] flex-1 bg-zinc-100" />
                                </h2>
                                <ul className="space-y-3">
                                    {(course.requirements?.length > 0 ? course.requirements : ["Course completion certificate", "Real-time projects access"]).map((req: string, i: number) => (
                                        <li key={i} className="flex items-center gap-4 text-[14px] text-zinc-600">
                                            <div className="h-1 w-1 bg-zinc-300" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
                            <div className="border border-zinc-100 bg-white shadow-sm overflow-hidden">
                                <div className="aspect-video relative bg-zinc-50 border-b border-zinc-100 flex items-center justify-center">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <BookOpen className="w-10 h-10 text-zinc-100" />
                                    )}
                                    <div className="absolute inset-0 bg-black/5" />
                                </div>

                                <div className="p-8">
                                    <div className="flex items-end gap-2 mb-8">
                                        <span className="text-3xl font-bold tracking-tighter">₹{course.price || "1499"}</span>
                                        <span className="text-zinc-400 text-sm line-through mb-1">₹{parseInt(course.price || "1499") + 2000}</span>
                                        <span className="bg-[#92E3A9] text-black text-[10px] font-bold px-2 py-0.5 ml-2 mb-1.5">SPECIAL PRICE</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <SidebarItem icon={<Clock className="w-4 h-4" />} text="Lifetime Access" />
                                        <SidebarItem icon={<BookOpen className="w-4 h-4" />} text="Detailed Modules" />
                                        <SidebarItem icon={<ShieldCheck className="w-4 h-4" />} text="Verified Certificate" />
                                        <SidebarItem icon={<Globe className="w-4 h-4" />} text="Online Access" />
                                        <SidebarItem icon={<PlayCircle className="w-4 h-4" />} text="Real-time projects" />
                                        <SidebarItem icon={<FileText className="w-4 h-4" />} text="Course completion certificate" />
                                    </div>

                                    <button 
                                        onClick={() => router.push(`/courses/${id}/enroll`)}
                                        className="w-full bg-black text-white h-12 flex items-center justify-center gap-3 text-[13px] font-bold transition-opacity hover:opacity-90"
                                    >
                                        Register for course
                                        <ArrowRight size={16} />
                                    </button>
                                    
                                    <p className="mt-6 text-center text-[11px] text-zinc-400">
                                        Secure payment powered by Student Forge Academy.
                                    </p>
                                </div>
                            </div>

                            {/* Instructor Card */}
                            <div className="p-8 border border-zinc-100">
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-6">Instructor</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-lg font-bold text-zinc-400">
                                        {course.instructorName?.[0] || "I"}
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-zinc-900">{course.instructorName}</p>
                                        <p className="text-[12px] text-zinc-500">Professional Staff</p>
                                    </div>
                                </div>
                                <p className="text-[13px] text-zinc-500 leading-relaxed italic">
                                    "Committed to helping students master modern software engineering through direct mentorship."
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function SidebarItem({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-3 text-zinc-600">
            <div className="text-zinc-300">
                {icon}
            </div>
            <span className="text-[13px] font-medium">{text}</span>
        </div>
    );
}
