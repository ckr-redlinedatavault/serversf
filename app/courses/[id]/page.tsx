"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    Star, Users, Clock, Globe, BookOpen, GraduationCap, 
    ShieldCheck, Zap, FileText, CheckCircle, ChevronDown, 
    MessageCircle, PlayCircle, Loader2, IndianRupee, HelpCircle,
    ArrowLeft, Award, Briefcase, Sparkles
} from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [openModule, setOpenModule] = useState<number | null>(0);

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
        <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-zinc-700">
            <Loader2 className="w-10 h-10 animate-spin text-[#92E3A9]" />
            <p className="text-[10px] font-black animate-pulse">Accessing Secure Records...</p>
        </div>
    );

    if (!course) return (
        <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 text-zinc-600">
            <ShieldCheck className="w-16 h-16 opacity-10" />
            <div className="text-center">
                <p className="font-black text-xl text-white mb-2 tracking-tighter">Authorization Failed</p>
                <p className="text-sm font-medium">This module address does not exist in our main records.</p>
                <Link href="/courses" className="mt-8 inline-block text-[10px] font-black text-[#92E3A9] underline tracking-widest">Back to Directory</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Minimal Sub-Navbar */}
            <nav className="w-full bg-[#92E3A9] px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
                <Link href="/courses" className="flex items-center gap-3 group">
                    <ArrowLeft className="w-4 h-4 text-zinc-900 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-tight text-zinc-900">Back to Modules</span>
                </Link>
                <div className="flex gap-4 md:gap-8 items-center">
                    <div className="hidden sm:flex items-center gap-6 mr-6">
                        <span className="text-[10px] font-black text-zinc-900/40">Instructor: <span className="text-zinc-900">{course.instructorName}</span></span>
                    </div>
                    <button className="bg-zinc-900 text-[#92E3A9] px-6 py-2.5 rounded-xl font-black text-[10px] hover:bg-black transition-all shadow-xl shadow-black/10">
                        Enroll Now
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="px-6 md:px-24 py-16 md:py-24 border-b border-zinc-900">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <div className="px-3 py-1 bg-[#92E3A9]/10 border border-[#92E3A9]/20 rounded-full text-[10px] font-black text-[#92E3A9]">
                                {course.level} Specialization
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold">
                                <Clock className="w-3 h-3 text-[#92E3A9]" />
                                Updated {new Date(course.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 text-balance">
                            {course.title}
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                            {course.subtitle || course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#92E3A9] mb-1 opacity-60">Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                    <span className="text-sm font-black text-white">Live Mission</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#92E3A9] mb-1 opacity-60">Rating</span>
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-[#92E3A9] fill-current" />
                                    <span className="text-lg font-black text-white">{course.rating || "5.0"}</span>
                                    <span className="text-xs font-bold text-zinc-700">({course.ratingCount || "342"} Reviews)</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#92E3A9] mb-1 opacity-60">Enrolled</span>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-zinc-600" />
                                    <span className="text-lg font-black text-white">{course.enrolledCount}+ Units</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                         <div className="aspect-[16/10] bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl relative shadow-[#92E3A9]/5">
                             {course.thumbnail && <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                             <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-20 h-20 bg-[#92E3A9] rounded-full flex items-center justify-center text-black shadow-2xl">
                                    <PlayCircle className="w-10 h-10" />
                                </div>
                             </button>
                             <div className="absolute bottom-10 left-10">
                                <span className="bg-black/80 backdrop-blur-md px-4 py-2 border border-white/5 rounded-xl text-[10px] font-black text-[#92E3A9] uppercase tracking-widest">Preview Session</span>
                             </div>
                         </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 py-16 md:py-24">
                    {/* Left 2 Columns */}
                    <div className="lg:col-span-2 space-y-24">
                        {/* 2. Overview */}
                        <section>
                            <SectionHeader num="01" title="Mission Parameters" />
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 text-lg font-medium leading-[1.8] mb-12">
                                {course.description}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="p-10 bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] hover:border-[#92E3A9]/30 transition-all">
                                    <h4 className="text-[#92E3A9] font-black text-[10px] mb-6">What you will learn</h4>
                                    <ul className="space-y-4">
                                        {course.outcomes?.map((outcome: string, idx: number) => (
                                            <li key={idx} className="flex gap-4 text-sm font-bold text-white group">
                                                <CheckCircle className="w-5 h-5 text-[#92E3A9] shrink-0" />
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-10 bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] hover:border-[#92E3A9]/30 transition-all">
                                    <h4 className="text-[#92E3A9] font-black text-[10px] mb-6">Target Audience</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {course.targetAudience?.map((aud: string, idx: number) => (
                                            <div key={idx} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400">
                                                {aud}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Curriculum */}
                        <section>
                            <SectionHeader num="02" title="Operational Map" />
                            <div className="space-y-4">
                                {course.curriculum?.map((module: any, mIdx: number) => (
                                    <div key={mIdx} className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl overflow-hidden hover:border-zinc-800 transition-all">
                                        <button 
                                            onClick={() => setOpenModule(openModule === mIdx ? null : mIdx)}
                                            className="w-full p-8 flex items-center justify-between text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:text-[#92E3A9] transition-colors">
                                                    W{mIdx + 1}
                                                </div>
                                                <div>
                                                    <h5 className="text-xl font-bold group-hover:text-[#92E3A9] transition-colors">{module.moduleTitle}</h5>
                                                    <p className="text-[10px] font-black text-zinc-700 mt-1">{module.lessons?.length} Phases Assigned</p>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-6 h-6 text-zinc-800 transition-transform duration-500 ${openModule === mIdx ? 'rotate-180 text-[#92E3A9]' : ''}`} />
                                        </button>
                                        
                                        {openModule === mIdx && (
                                            <div className="p-8 pt-0 border-t border-zinc-900 space-y-2">
                                                {module.lessons?.map((lesson: any, lIdx: number) => (
                                                    <div key={lIdx} className="flex items-center justify-between p-4 bg-zinc-900/20 border border-white/0 hover:border-white/5 rounded-2xl hover:bg-zinc-900/40 transition-all group/it">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-800 group-hover/it:text-[#92E3A9]">
                                                                <PlayCircle className="w-5 h-5" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-zinc-400 group-hover/it:text-white transition-colors">{lesson.title}</span>
                                                                {lesson.level && (
                                                                    <span className="text-[8px] font-black text-[#92E3A9]/60 uppercase tracking-tighter">{lesson.level}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-bold text-zinc-800 tabular-nums">{lesson.duration}</span>
                                                            {lesson.preview && (
                                                                <span className="text-[9px] font-black bg-[#92E3A9]/10 text-[#92E3A9] px-2 py-0.5 rounded">Preview</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Instructor */}
                        <section className="p-12 bg-[#92E3A9] rounded-[3.5rem] text-zinc-900">
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                                 <div className="md:col-span-1">
                                      <div className="aspect-square bg-zinc-900 rounded-[2rem] overflow-hidden border-4 border-white overflow-hidden shadow-2xl">
                                          {course.instructorImage ? <img src={course.instructorImage} /> : <div className="h-full w-full flex items-center justify-center text-white text-5xl font-black">{course.instructorName[0]}</div>}
                                      </div>
                                 </div>
                                 <div className="md:col-span-3">
                                      <span className="text-[10px] font-black text-black/50 mb-2 block">Instruction Lead</span>
                                      <h3 className="text-4xl font-black tracking-tighter mb-4">{course.instructorName}</h3>
                                      <p className="text-sm font-bold text-zinc-900/80 leading-relaxed mb-6">
                                          {course.instructorBio || "Dedicated industry expert sharing years of technical mastery to forge the next generation of builders."}
                                      </p>
                                      <div className="flex flex-wrap gap-6">
                                          <div className="flex flex-col">
                                              <span className="text-[9px] font-black text-black/40">Experience</span>
                                              <span className="text-sm font-black">{course.instructorExp || "10+ Years"}</span>
                                          </div>
                                          <div className="flex flex-col">
                                              <span className="text-[9px] font-black text-black/40">Specialization</span>
                                              <span className="text-sm font-black">High-End Systems</span>
                                          </div>
                                      </div>
                                 </div>
                             </div>
                        </section>

                        {/* 11. FAQs */}
                        <section>
                            <SectionHeader num="03" title="Base FAQ" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {course.faqs?.map((faq: any, idx: number) => (
                                    <div key={idx} className="p-8 bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem]">
                                        <h5 className="text-base font-bold mb-3 flex items-center gap-3">
                                            <HelpCircle className="w-5 h-5 text-[#92E3A9]" />
                                            {faq.question}
                                        </h5>
                                        <p className="text-xs text-zinc-500 font-medium leading-relaxed italic">"{faq.answer}"</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sticky Column */}
                    <div className="space-y-8 h-fit lg:sticky lg:top-32">
                         <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl">
                             <h4 className="text-[10px] font-black text-zinc-500 mb-8">Access Requirements</h4>
                             
                             <div className="space-y-8 mb-10">
                                 <div className="flex items-start gap-4">
                                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                                         <Award className="w-4 h-4 text-[#92E3A9]" />
                                     </div>
                                     <div>
                                         <p className="text-xs font-black text-white uppercase tracking-widest">Certified Outcome</p>
                                         <p className="text-[10px] text-zinc-500 font-bold mt-1">Verified Certificate of Mastery included.</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start gap-4">
                                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                                         <Sparkles className="w-4 h-4 text-[#92E3A9]" />
                                     </div>
                                     <div>
                                         <p className="text-xs font-black text-white uppercase tracking-widest">Industry Standard</p>
                                         <p className="text-[10px] text-zinc-500 font-bold mt-1">Assignments vetted by Google & OpenAI Leads.</p>
                                     </div>
                                 </div>
                                 <div className="flex items-start gap-4">
                                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                                         <Briefcase className="w-4 h-4 text-[#92E3A9]" />
                                     </div>
                                     <div>
                                         <p className="text-xs font-black text-white uppercase tracking-widest">Project Intensive</p>
                                         <p className="text-[10px] text-zinc-500 font-bold mt-1">{course.projectsCount || "4"} Production-Grade Projects.</p>
                                     </div>
                                 </div>
                             </div>

                             <div className="pt-8 border-t border-zinc-900 flex flex-col gap-4">
                                  <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black text-zinc-600">Valuation</span>
                                      <span className="text-3xl font-black text-[#92E3A9]">{course.price === "0" || !course.price ? "Open Access" : `₹${course.price}`}</span>
                                  </div>
                                  <button className="w-full bg-[#92E3A9] text-black py-5 rounded-2xl font-black text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10">
                                      Initialize Enrollment
                                  </button>
                                  <p className="text-[9px] font-bold text-center text-zinc-700 leading-relaxed px-4">Instant system access after verification.</p>
                             </div>
                         </div>

                         <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] p-10">
                             <h4 className="text-[10px] font-black text-zinc-500 mb-6">Prerequisites</h4>
                             <ul className="space-y-4">
                                 {course.requirements?.map((req: string, idx: number) => (
                                     <li key={idx} className="flex gap-4 items-center">
                                         <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                                         <span className="text-[11px] font-bold text-zinc-500">{req}</span>
                                     </li>
                                 ))}
                             </ul>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ num, title }: { num: string, title: string }) {
    return (
        <div className="flex items-center gap-6 mb-12">
            <span className="text-xs font-black text-[#92E3A9] border border-[#92E3A9]/20 px-3 py-1 rounded bg-[#92E3A9]/5">{num}</span>
            <div className="h-[1px] flex-1 bg-zinc-900" />
            <h2 className="text-xs font-black text-zinc-600">{title}</h2>
        </div>
    );
}
