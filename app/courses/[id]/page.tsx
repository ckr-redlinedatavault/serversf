"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    Star, Users, Clock, Globe, BookOpen, GraduationCap, 
    ShieldCheck, Zap, FileText, CheckCircle, ChevronDown, 
    Loader2, IndianRupee, HelpCircle,
    ArrowLeft, Award, Briefcase, Sparkles, Book
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
            <p className="text-[10px] font-medium animate-pulse">Accessing Records...</p>
        </div>
    );

    if (!course) return (
        <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 text-zinc-600">
            <ShieldCheck className="w-16 h-16 opacity-10" />
            <div className="text-center">
                <p className="font-semibold text-xl text-white mb-2 tracking-tighter">Module Not Found</p>
                <p className="text-sm font-medium">This course does not exist in our records.</p>
                <Link href="/courses" className="mt-8 inline-block text-[10px] font-bold text-[#92E3A9] underline tracking-widest uppercase">Back to Directory</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Minimal Navbar */}
            <nav className="w-full bg-[#0A0A0A] border-b border-zinc-900 px-6 py-4 md:px-24 flex items-center justify-between sticky top-0 z-50">
                <Link href="/courses" className="flex items-center gap-3 group">
                    <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-[#92E3A9] transition-colors" />
                    <span className="text-[10px] font-bold tracking-tight text-white uppercase">Back to Modules</span>
                </Link>
                <div className="flex gap-4 md:gap-8 items-center">
                    <div className="hidden sm:flex items-center gap-6 mr-6">
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Instructor: <span className="text-white">{course.instructorName}</span></span>
                    </div>
                    <Link 
                        href={`/courses/${id}/enroll`}
                        className="bg-[#92E3A9] text-black px-6 py-2.5 rounded-lg font-bold text-[10px] hover:bg-white transition-all uppercase tracking-widest no-underline"
                    >
                        Initialize Enrollment
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="px-6 md:px-24 py-16 md:py-20 border-b border-zinc-900 bg-zinc-950/20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest">
                                {course.level} Specialization
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-medium uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                Updated {new Date(course.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                            {course.title}
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                            {course.subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Rating</span>
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-[#92E3A9] fill-current" />
                                    <span className="text-lg font-bold text-white">{course.rating || "5.0"}</span>
                                    <span className="text-xs font-medium text-zinc-700">({course.ratingCount || "0"} Reviews)</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Enrolled</span>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-zinc-600" />
                                    <span className="text-lg font-bold text-white">{course.enrolledCount}+ Students</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Duration</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-zinc-600" />
                                    <span className="text-lg font-bold text-white">{course.totalHours || "Self-paced"} Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                         <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
                             {course.thumbnail ? (
                                 <img src={course.thumbnail} className="w-full h-full object-cover opacity-60" alt="Course Thumbnail" />
                             ) : (
                                 <div className="w-full h-full flex items-center justify-center">
                                     <BookOpen className="w-16 h-16 text-zinc-800" />
                                 </div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                         </div>
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 py-16">
                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-20">
                        {/* 1. Overview */}
                        <section>
                            <SectionHeader title="Course Overview" />
                            <div className="text-zinc-400 text-lg font-normal leading-[1.8] mb-12">
                                {course.description}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="p-8 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                                    <h4 className="text-[#92E3A9] font-bold text-[10px] uppercase tracking-widest mb-6 px-1">What you will learn</h4>
                                    <ul className="space-y-4">
                                        {course.outcomes?.map((outcome: string, idx: number) => (
                                            <li key={idx} className="flex gap-4 text-sm font-medium text-zinc-300">
                                                <CheckCircle className="w-5 h-5 text-[#92E3A9] shrink-0 opacity-50" />
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                                    <h4 className="text-[#92E3A9] font-bold text-[10px] uppercase tracking-widest mb-6 px-1">Target Audience</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.targetAudience?.map((aud: string, idx: number) => (
                                            <div key={idx} className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                                                {aud}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10">
                                        <h4 className="text-[#92E3A9] font-bold text-[10px] uppercase tracking-widest mb-4 px-1">Skills Gained</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {course.skills?.map((skill: string, idx: number) => (
                                                <div key={idx} className="px-3 py-1.5 bg-[#92E3A9]/5 border border-[#92E3A9]/10 rounded-lg text-[10px] font-medium text-[#92E3A9]">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Curriculum */}
                        <section>
                            <SectionHeader title="Course Curriculum" />
                            <div className="space-y-4">
                                {course.curriculum?.map((module: any, mIdx: number) => (
                                    <div key={mIdx} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden active:border-[#92E3A9]/30 transition-all">
                                        <button 
                                            onClick={() => setOpenModule(openModule === mIdx ? null : mIdx)}
                                            className="w-full p-6 flex items-center justify-between text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover:text-[#92E3A9] transition-colors">
                                                    #{mIdx + 1}
                                                </div>
                                                <div>
                                                    <h5 className="text-lg font-bold group-hover:text-white transition-colors">{module.moduleTitle}</h5>
                                                    <p className="text-[10px] font-medium text-zinc-600 mt-1 uppercase tracking-widest">{module.lessons?.length} lessons included</p>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-zinc-600 transition-transform duration-300 ${openModule === mIdx ? 'rotate-180 text-[#92E3A9]' : ''}`} />
                                        </button>
                                        
                                        {openModule === mIdx && (
                                            <div className="px-6 pb-6 pt-0 border-t border-zinc-900/50">
                                                <div className="mt-4 space-y-1">
                                                    {module.lessons?.map((lesson: any, lIdx: number) => (
                                                        <div key={lIdx} className="flex items-center justify-between p-4 hover:bg-zinc-900/50 rounded-xl transition-all group/l">
                                                            <div className="flex items-center gap-4">
                                                                <FileText className="w-4 h-4 text-zinc-700 group-hover/l:text-[#92E3A9]" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium text-zinc-400 group-hover/l:text-white transition-colors">{lesson.title}</span>
                                                                    {lesson.level && (
                                                                        <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">{lesson.level}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-[10px] font-medium text-zinc-600 tabular-nums">{lesson.duration}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Timeline & Commitment */}
                        {(course.timeline?.weeklyPlan?.length > 0 || course.timeline?.totalDuration) && (
                            <section>
                                <SectionHeader title="Learning Timeline" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Schedule Type</span>
                                            <span className="text-sm font-bold text-[#92E3A9]">{course.timeline?.scheduleType || "Flexible"}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Weekly Commitment</span>
                                            <span className="text-sm font-bold text-[#92E3A9]">{course.timeline?.studyTimePerWeek || "5-10 Hours"}</span>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-8">
                                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Strategic Roadmap</h4>
                                        <div className="space-y-6">
                                            {course.timeline?.weeklyPlan?.map((plan: any, idx: number) => (
                                                <div key={idx} className="flex gap-6 relative">
                                                    {idx !== course.timeline.weeklyPlan.length - 1 && (
                                                        <div className="absolute left-3 top-8 bottom-0 w-[1px] bg-zinc-800" />
                                                    )}
                                                    <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10">
                                                        <span className="text-[8px] font-bold text-zinc-500">{plan.week}</span>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-xs font-bold text-white mb-1 uppercase tracking-tight">Phase {plan.week}</h6>
                                                        <p className="text-[11px] font-medium text-zinc-500">{plan.topic}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 4. Instructor */}
                        <section className="p-10 bg-[#0A0A0A] border border-zinc-900 rounded-3xl">
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                                 <div className="md:col-span-1">
                                      <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
                                          {course.instructorImage ? <img src={course.instructorImage} alt="Instructor" className="w-full h-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">{course.instructorName[0]}</div>}
                                      </div>
                                 </div>
                                 <div className="md:col-span-3">
                                      <span className="text-[10px] font-bold text-zinc-600 mb-2 block uppercase tracking-widest">Instruction Lead</span>
                                      <h3 className="text-3xl font-bold tracking-tighter mb-4">{course.instructorName}</h3>
                                      <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-6">
                                          {course.instructorBio}
                                      </p>
                                      <div className="flex flex-wrap gap-8">
                                          <div className="flex flex-col">
                                              <span className="text-[9px] font-bold text-zinc-600 uppercase mb-1">Experience</span>
                                              <span className="text-sm font-bold">{course.instructorExp || "Expert"}</span>
                                          </div>
                                      </div>
                                 </div>
                             </div>
                        </section>

                        {/* FAQs */}
                        {course.faqs && course.faqs.length > 0 && (
                            <section>
                                <SectionHeader title="Base FAQ" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {course.faqs?.map((faq: any, idx: number) => (
                                        <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
                                            <h5 className="text-sm font-bold mb-3 flex items-start gap-3">
                                                <HelpCircle className="w-4 h-4 text-[#92E3A9] mt-0.5 shrink-0" />
                                                {faq.question}
                                            </h5>
                                            <p className="text-xs text-zinc-500 font-medium leading-relaxed italic">"{faq.answer}"</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8 h-fit lg:sticky lg:top-32">
                         <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
                             <h4 className="text-[10px] font-bold text-zinc-600 mb-8 uppercase tracking-widest">Enrollment Meta</h4>
                             
                             <div className="space-y-6 mb-10">
                                 <div className="flex items-center gap-4">
                                     <Book className="w-4 h-4 text-[#92E3A9]" />
                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{course.lecturesCount || "0"} Active Lectures</span>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <Sparkles className="w-4 h-4 text-[#92E3A9]" />
                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{course.downloadableResources || "0"} Master Resources</span>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <Award className="w-4 h-4 text-[#92E3A9]" />
                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{course.hasCertificate ? `Issued by ${course.issuerName || "Student Forge"}` : "Non-Certificate Path"}</span>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <Briefcase className="w-4 h-4 text-[#92E3A9]" />
                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{course.projectsCount || "4"} Intensive Projects</span>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <Clock className="w-4 h-4 text-[#92E3A9]" />
                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{course.access || "Lifetime"} Access</span>
                                 </div>
                             </div>

                             <div className="pt-8 border-t border-zinc-900 flex flex-col gap-4">
                                  <div className="flex items-center justify-between px-1">
                                      <span className="text-[10px] font-bold text-zinc-600 uppercase">Price</span>
                                      <span className="text-3xl font-bold text-white tracking-tighter">
                                          {course.price === "0" || !course.price ? "Free" : `₹${course.price}`}
                                      </span>
                                  </div>
                                  <Link 
                                       href={`/courses/${id}/enroll`}
                                       className="w-full bg-[#92E3A9] text-black py-4 rounded-xl font-bold text-[11px] hover:bg-white transition-all text-center no-underline uppercase tracking-widest mt-2"
                                   >
                                       Initialize Enrollment
                                   </Link>
                                  <p className="text-[9px] font-medium text-center text-zinc-600 mt-2 px-4 italic leading-relaxed">System access granted after registration.</p>
                             </div>
                         </div>

                         <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-8">
                             <h4 className="text-[10px] font-bold text-zinc-600 mb-6 uppercase tracking-widest">Prerequisites</h4>
                             <ul className="space-y-4">
                                 {(course.requirements || []).length > 0 ? course.requirements.map((req: string, idx: number) => (
                                     <li key={idx} className="flex gap-4 items-center">
                                         <div className="w-1.5 h-1.5 bg-[#92E3A9]/40 rounded-full shrink-0" />
                                         <span className="text-[11px] font-medium text-zinc-500">{req}</span>
                                     </li>
                                 )) : (
                                     <li className="text-[11px] font-medium text-zinc-600 italic">No specific prerequisites mentioned.</li>
                                 )}
                             </ul>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-6 mb-10">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] shrink-0">{title}</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
    );
}
