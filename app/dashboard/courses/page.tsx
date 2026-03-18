"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Mail,
    LogOut,
    ShieldCheck,
    Star,
    Inbox,
    Plus,
    Trash2,
    Save,
    Loader2,
    BookOpen,
    Search,
    Clock,
    CalendarDays,
    GraduationCap,
    ChevronRight,
    SearchIcon,
    Globe
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminCoursesPage() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    
    // Course Management States
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        instructorName: "",
        instructorBio: "",
        instructorExp: "",
        instructorImage: "",
        thumbnail: "",
        videoUrl: "",
        price: "",
        level: "Beginner",
        language: "English",
        description: "",
        outcomes: [""],
        skills: [""],
        targetAudience: [""],
        requirements: [""],
        projectsCount: 0,
        hasRealWorldProjects: true,
        hasCapstone: false,
        practiceExercises: "",
        hasCertificate: true,
        isShareableLinkedIn: true,
        issuerName: "Student Forge",
        totalHours: "",
        lecturesCount: 0,
        downloadableResources: 0,
        access: "Lifetime",
        curriculum: [{ moduleTitle: "", lessons: [{ title: "", duration: "", type: "Video", preview: false, level: "Beginner" }] }],
        timeline: { totalDuration: "", weeklyPlan: [{ week: "1", topic: "" }], studyTimePerWeek: "", scheduleType: "Flexible" },
        faqs: [{ question: "", answer: "" }]
    });

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

    useEffect(() => {
        setMounted(true);
        const isAuth = localStorage.getItem("forge_super_admin");
        if (isAuth !== "true") {
            router.push("/admin/login");
        }

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        fetchCourses();

        return () => clearInterval(timer);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("forge_super_admin");
        router.push("/admin/login");
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard" },
        { name: "Approvals", icon: ShieldCheck, slug: "/dashboard/approvals" },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses", active: true },
    ];

    // Form Handlers
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setIsAdding(false);
                fetchCourses();
                // Reset form
                setFormData({
                    title: "", subtitle: "", instructorName: "", instructorBio: "", instructorExp: "", instructorImage: "", thumbnail: "", videoUrl: "", price: "", level: "Beginner", language: "English", description: "",
                    outcomes: [""], skills: [""], targetAudience: [""], requirements: [""], projectsCount: 0, hasRealWorldProjects: true, hasCapstone: false, practiceExercises: "", hasCertificate: true, isShareableLinkedIn: true, issuerName: "Student Forge", totalHours: "", lecturesCount: 0, downloadableResources: 0, access: "Lifetime",
                    curriculum: [{ moduleTitle: "", lessons: [{ title: "", duration: "", type: "Video", preview: false, level: "Beginner" }] }],
                    timeline: { totalDuration: "", weeklyPlan: [{ week: "1", topic: "" }], studyTimePerWeek: "", scheduleType: "Flexible" },
                    faqs: [{ question: "", answer: "" }]
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const addListField = (field: "outcomes" | "skills" | "targetAudience" | "requirements") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeListField = (field: "outcomes" | "skills" | "targetAudience" | "requirements", index: number) => {
        const newList = [...formData[field]];
        newList.splice(index, 1);
        setFormData({ ...formData, [field]: newList });
    };

    const updateListField = (field: "outcomes" | "skills" | "targetAudience" | "requirements", index: number, value: string) => {
        const newList = [...formData[field]];
        newList[index] = value;
        setFormData({ ...formData, [field]: newList });
    };

    const addModule = () => {
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { moduleTitle: "", lessons: [{ title: "", duration: "", type: "Video", preview: false, level: "Beginner" }] }]
        });
    };

    const addLesson = (mIdx: number) => {
        const newCurr = [...formData.curriculum];
        newCurr[mIdx].lessons.push({ title: "", duration: "", type: "Video", preview: false, level: "Beginner" });
        setFormData({ ...formData, curriculum: newCurr });
    };

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-[#92E3A9] h-screen fixed left-0 top-0 z-50 border-r border-black/5">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-zinc-900 tracking-tight leading-none">Forge Admin</span>
                            <span className="text-[10px] font-semibold text-zinc-900/60 mt-1 uppercase tracking-tighter">Maintenance</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.slug}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                                ${item.active
                                    ? 'bg-zinc-900 text-white shadow-xl'
                                    : 'text-zinc-900/70 hover:bg-zinc-900/10 hover:text-zinc-900'}`
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs font-semibold">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all font-bold active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs font-semibold">Logout</span>
                    </button>
                    <div className="mt-4 p-3 rounded-xl bg-zinc-900 text-white border border-white/5 text-[10px] font-bold opacity-60">
                        System Live
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-6 md:p-10 min-h-screen flex flex-col">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Course Studio" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">{mounted ? getGreeting() : "Hello"}, Admin</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Manage and deploy professional technical curriculum.</p>
                    </div>

                    <div className="hidden lg:flex flex-col items-end text-right">
                        <div className="flex items-center gap-2 text-zinc-400 mb-1">
                            <CalendarDays className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-[11px] font-bold uppercase tracking-tighter">
                                {currentTime.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-white bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
                            <Clock className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-2xl font-bold tabular-nums">
                                {mounted ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : "--:--:--"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Curriculum Lab</h2>
                            <p className="text-xs text-zinc-600">Forge Academic Management System</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-[#92E3A9] text-black px-6 py-3 rounded-xl font-bold text-xs hover:bg-white transition-all shadow-lg active:scale-95"
                    >
                        {isAdding ? "Close Editor" : <><Plus size={16} /> Create Course</>}
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#92E3A9]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Syncing with Node...</span>
                    </div>
                ) : isAdding ? (
                    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Section 1: Core */}
                        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 lg:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-bold text-[#92E3A9]">01</div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#92E3A9]">Core Identity</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Course Title</label>
                                    <input 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. System Architecture & High-Scale Design" required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Pricing (Locked ₹)</label>
                                    <input 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 49.99"
                                    />
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Marketing Tagline</label>
                                    <input 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Give potential students a reason to enroll..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Lead Instructor</label>
                                    <input 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        value={formData.instructorName} onChange={e => setFormData({...formData, instructorName: e.target.value})} placeholder="Name" required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Difficulty Level</label>
                                    <select 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all appearance-none"
                                        value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Language</label>
                                    <input 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                        value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                                    />
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Thumbnail CDN Link</label>
                                    <div className="relative">
                                        <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                                        <input 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-14 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                            value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Details */}
                        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 lg:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-bold text-[#92E3A9]">02</div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#92E3A9]">Expanded Syllabus</h3>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Deep Description</label>
                                    <textarea 
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all resize-none"
                                        rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Full course details..." required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ListInput label="Outcomes" items={formData.outcomes} 
                                        onAdd={() => addListField("outcomes")} 
                                        onRemove={(idx) => removeListField("outcomes", idx)}
                                        onUpdate={(idx, val) => updateListField("outcomes", idx, val)}
                                    />
                                    <ListInput label="Target Skills" items={formData.skills} 
                                        onAdd={() => addListField("skills")} 
                                        onRemove={(idx) => removeListField("skills", idx)}
                                        onUpdate={(idx, val) => updateListField("skills", idx, val)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Curriculum */}
                        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 lg:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-bold text-[#92E3A9]">03</div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#92E3A9]">Content Architecture</h3>
                                </div>
                                <button type="button" onClick={addModule} className="text-[10px] font-bold text-[#92E3A9] hover:underline flex items-center gap-2">
                                    <Plus className="w-3 h-3" /> New Module
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {formData.curriculum.map((module, mIdx) => (
                                    <div key={mIdx} className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-3xl group/module">
                                        <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
                                            <input 
                                                className="bg-transparent text-lg font-bold outline-none flex-1 focus:text-[#92E3A9] transition-colors"
                                                value={module.moduleTitle} placeholder="Module Title (e.g. Protocol Implementation)"
                                                onChange={e => {
                                                    const newCurr = [...formData.curriculum];
                                                    newCurr[mIdx].moduleTitle = e.target.value;
                                                    setFormData({...formData, curriculum: newCurr});
                                                }}
                                            />
                                            <span className="text-[10px] font-bold text-zinc-700 italic">M-0{mIdx + 1}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {module.lessons.map((lesson, lIdx) => (
                                                <div key={lIdx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-zinc-900/10 p-4 rounded-xl border border-white/5">
                                                    <div className="md:col-span-5">
                                                        <input 
                                                            className="w-full bg-transparent text-xs font-medium outline-none"
                                                            value={lesson.title} placeholder="Lesson Name"
                                                            onChange={e => {
                                                                const newCurr = [...formData.curriculum];
                                                                newCurr[mIdx].lessons[lIdx].title = e.target.value;
                                                                setFormData({...formData, curriculum: newCurr});
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <select
                                                            className="w-full bg-transparent text-[10px] font-bold outline-none uppercase text-[#92E3A9]"
                                                            value={lesson.level}
                                                            onChange={e => {
                                                                const newCurr = [...formData.curriculum];
                                                                newCurr[mIdx].lessons[lIdx].level = e.target.value;
                                                                setFormData({...formData, curriculum: newCurr});
                                                            }}
                                                        >
                                                            <option className="bg-zinc-900">Beginner</option>
                                                            <option className="bg-zinc-900">Intermediate</option>
                                                            <option className="bg-zinc-900">Advanced</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-3">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-3 h-3 text-zinc-700" />
                                                            <input 
                                                                className="w-full bg-transparent text-[10px] font-bold outline-none uppercase"
                                                                value={lesson.duration} placeholder="15m"
                                                                onChange={e => {
                                                                    const newCurr = [...formData.curriculum];
                                                                    newCurr[mIdx].lessons[lIdx].duration = e.target.value;
                                                                    setFormData({...formData, curriculum: newCurr});
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-2 flex justify-end items-center gap-3">
                                                        <label className="text-[9px] font-bold text-zinc-600 uppercase">Preview</label>
                                                        <input 
                                                            type="checkbox" checked={lesson.preview}
                                                            className="accent-[#92E3A9]"
                                                            onChange={e => {
                                                                const newCurr = [...formData.curriculum];
                                                                newCurr[mIdx].lessons[lIdx].preview = e.target.checked;
                                                                setFormData({...formData, curriculum: newCurr});
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                type="button" 
                                                onClick={() => addLesson(mIdx)} 
                                                className="w-full py-3 rounded-xl border border-dashed border-zinc-800 text-[10px] font-bold text-zinc-500 hover:border-[#92E3A9] hover:text-[#92E3A9] transition-all mt-4"
                                            >
                                                + Segment Assignment
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-6 pt-10 border-t border-zinc-900">
                             <button 
                                type="button" 
                                onClick={() => setIsAdding(false)} 
                                className="text-xs font-bold text-zinc-500 hover:text-white transition-colors"
                             >
                                Abort Deployment
                             </button>
                             <button 
                                disabled={saving}
                                className="bg-[#92E3A9] text-black px-10 py-4 rounded-xl font-bold text-xs hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10 flex items-center gap-3"
                             >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save & Push Live</>}
                             </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
                        {courses.map(course => (
                            <div key={course.id} className="group bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden hover:border-[#92E3A9]/30 transition-all flex flex-col relative">
                                <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                                    {course.thumbnail && (
                                        <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={course.title} />
                                    )}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-bold text-[#92E3A9] uppercase border border-white/5">
                                            {course.level}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                                </div>
                                <div className="p-6 flex flex-col flex-1 relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{course.instructorName}</span>
                                        <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                        <span className="text-[10px] font-bold text-[#92E3A9]">{course.price === "0" || !course.price ? "OPEN ACCESS" : `₹${course.price}`}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-[#92E3A9] transition-colors">{course.title}</h3>
                                    <p className="text-[11px] text-zinc-500 line-clamp-2 mb-6 font-medium leading-relaxed">{course.subtitle || course.description}</p>
                                    
                                    <div className="mt-auto pt-5 border-t border-zinc-900/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-[#92E3A9]">
                                                <Users className="w-3 h-3" />
                                                <span className="text-[10px] font-bold">{course.enrolledCount || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-zinc-600">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="text-[10px] font-bold">{course.rating || "5.0"}</span>
                                            </div>
                                        </div>
                                        <Link href={`/courses/${course.id}`} className="p-2 bg-zinc-900 rounded-lg hover:bg-white hover:text-black transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {courses.length === 0 && (
                            <div className="col-span-full h-80 bg-zinc-900/5 border-2 border-dashed border-zinc-900 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-zinc-700">
                                <BookOpen size={48} className="opacity-10" />
                                <div className="text-center">
                                    <p className="font-bold text-sm">No Curriculum Data</p>
                                    <p className="text-[10px] uppercase font-bold text-zinc-800 tracking-tighter">Initialize first course to start</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <footer className="mt-auto pt-10 border-t border-zinc-900 flex justify-between items-center text-zinc-700">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Academic Hub v1.0.4</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#92E3A9]/40">Student Forge Maintenance</span>
                </footer>
            </main>
        </div>
    );
}

function ListInput({ label, items, onAdd, onRemove, onUpdate }: { label: string, items: string[], onAdd: () => void, onRemove: (i: number) => void, onUpdate: (i: number, v: string) => void }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
                <button type="button" onClick={onAdd} className="text-[9px] font-bold text-[#92E3A9] uppercase hover:underline">+ New Point</button>
            </div>
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center group/item">
                        <div className="flex-1 relative">
                            <input 
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-3 text-xs outline-none focus:border-[#92E3A9] transition-all"
                                value={item} onChange={e => onUpdate(idx, e.target.value)} 
                            />
                        </div>
                        <button type="button" onClick={() => onRemove(idx)} className="p-2 text-zinc-800 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
