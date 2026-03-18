"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, IndianRupee, Globe, Users, Star, Clock, BookOpen, CheckCircle, HelpCircle } from "lucide-react";

export default function CourseManagement() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Main Form State
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
        curriculum: [{ moduleTitle: "", lessons: [{ title: "", duration: "", type: "Video", preview: false }] }],
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
        fetchCourses();
    }, []);

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
                // Reset form optionally
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

    // Curriculum Helpers
    const addModule = () => {
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { moduleTitle: "", lessons: [{ title: "", duration: "", type: "Video", preview: false }] }]
        });
    };

    const addLesson = (mIdx: number) => {
        const newCurr = [...formData.curriculum];
        newCurr[mIdx].lessons.push({ title: "", duration: "", type: "Video", preview: false });
        setFormData({ ...formData, curriculum: newCurr });
    };

    if (loading) return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#92E3A9]" />
        </div>
    );

    return (
        <div className="p-10 max-w-7xl mx-auto pb-40">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Course Studio</h1>
                    <p className="text-zinc-500 text-sm mt-1">Design and deploy world-class learning experiences.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#92E3A9] text-black px-6 py-3 rounded-2xl font-bold text-xs hover:bg-white transition-all"
                >
                    {isAdding ? "Cancel" : <><Plus size={16} /> New Course</>}
                </button>
            </div>

            {isAdding ? (
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* section 1: Core */}
                    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#92E3A9]/10 rounded-lg flex items-center justify-center text-[#92E3A9] text-sm">1</span>
                            Core Course Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Course Title</label>
                                <input 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Masterclass in Applied AI" required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Price ($ or Free)</label>
                                <input 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 49.99"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Tagline / Subtitle</label>
                                <input 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="A concise hook for your course..."
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Instructor Name</label>
                                <input 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.instructorName} onChange={e => setFormData({...formData, instructorName: e.target.value})} placeholder="Dr. Sarah Johnson" required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Level</label>
                                <select 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all appearance-none"
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
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Thumbnail URL</label>
                                <input 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all"
                                    value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} placeholder="Link to display image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* section 2: Overview */}
                    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#92E3A9]/10 rounded-lg flex items-center justify-center text-[#92E3A9] text-sm">2</span>
                            Detailed Overview
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Course Description</label>
                                <textarea 
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#92E3A9] transition-all resize-none"
                                    rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the depth of the course..." required
                                />
                            </div>
                            
                            <ListInput label="What You Will Learn" items={formData.outcomes} 
                                onAdd={() => addListField("outcomes")} 
                                onRemove={(idx) => removeListField("outcomes", idx)}
                                onUpdate={(idx, val) => updateListField("outcomes", idx, val)}
                            />

                            <ListInput label="Skills You'll Gain" items={formData.skills} 
                                onAdd={() => addListField("skills")} 
                                onRemove={(idx) => removeListField("skills", idx)}
                                onUpdate={(idx, val) => updateListField("skills", idx, val)}
                            />
                        </div>
                    </div>

                    {/* section 3: Curriculum */}
                    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <span className="w-8 h-8 bg-[#92E3A9]/10 rounded-lg flex items-center justify-center text-[#92E3A9] text-sm">3</span>
                                Course Curriculum
                            </h2>
                            <button type="button" onClick={addModule} className="text-[10px] font-bold text-[#92E3A9] uppercase flex items-center gap-2 hover:underline">
                                <Plus size={14} /> Add Module
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {formData.curriculum.map((module, mIdx) => (
                                <div key={mIdx} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem]">
                                    <input 
                                        className="bg-transparent text-lg font-bold outline-none border-b border-zinc-800 mb-6 w-full pb-2 focus:border-[#92E3A9]"
                                        value={module.moduleTitle} placeholder="Module Title (e.g. Intro to Neural Networks)"
                                        onChange={e => {
                                            const newCurr = [...formData.curriculum];
                                            newCurr[mIdx].moduleTitle = e.target.value;
                                            setFormData({...formData, curriculum: newCurr});
                                        }}
                                    />
                                    <div className="space-y-4">
                                        {module.lessons.map((lesson, lIdx) => (
                                            <div key={lIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                <div className="md:col-span-2">
                                                    <input 
                                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none"
                                                        value={lesson.title} placeholder="Lesson Title"
                                                        onChange={e => {
                                                            const newCurr = [...formData.curriculum];
                                                            newCurr[mIdx].lessons[lIdx].title = e.target.value;
                                                            setFormData({...formData, curriculum: newCurr});
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none"
                                                        value={lesson.duration} placeholder="Duration (e.g. 15m)"
                                                        onChange={e => {
                                                            const newCurr = [...formData.curriculum];
                                                            newCurr[mIdx].lessons[lIdx].duration = e.target.value;
                                                            setFormData({...formData, curriculum: newCurr});
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3 h-full pb-3">
                                                    <label className="text-[9px] font-bold text-zinc-600 uppercase">Preview?</label>
                                                    <input 
                                                        type="checkbox" checked={lesson.preview}
                                                        onChange={e => {
                                                            const newCurr = [...formData.curriculum];
                                                            newCurr[mIdx].lessons[lIdx].preview = e.target.checked;
                                                            setFormData({...formData, curriculum: newCurr});
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addLesson(mIdx)} className="text-[9px] font-bold text-zinc-500 uppercase hover:text-white mt-4">
                                            + Add Lesson
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-6">
                         <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-5 rounded-2xl font-bold text-sm text-zinc-500 hover:text-white transition-all">Discard</button>
                         <button 
                            disabled={saving}
                            className="bg-[#92E3A9] text-black px-12 py-5 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-xl shadow-[#92E3A9]/10 flex items-center gap-3"
                         >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save size={18} /> Deploy Course</>}
                         </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <div key={course.id} className="group bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] overflow-hidden hover:border-[#92E3A9]/30 transition-all flex flex-col shadow-2xl">
                            <div className="aspect-video bg-zinc-900 relative">
                                {course.thumbnail && <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all" />}
                                <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/5 rounded-full text-[10px] font-bold text-[#92E3A9] uppercase">
                                    {course.level}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-[#92E3A9] transition-colors">{course.title}</h3>
                                <p className="text-sm text-zinc-500 line-clamp-2 mb-6">{course.subtitle}</p>
                                
                                <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#92E3A9]">
                                            {course.instructorName[0]}
                                        </div>
                                        <span className="text-xs font-bold text-zinc-400">{course.instructorName}</span>
                                    </div>
                                    <span className="text-lg font-black text-white">{course.price === "0" || !course.price ? "FREE" : `$${course.price}`}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {courses.length === 0 && (
                        <div className="col-span-full h-80 border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-zinc-600">
                             <BookOpen size={40} className="opacity-20" />
                             <p className="font-medium">No courses deployed yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ListInput({ label, items, onAdd, onRemove, onUpdate }: { label: string, items: string[], onAdd: () => void, onRemove: (i: number) => void, onUpdate: (i: number, v: string) => void }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
                <button type="button" onClick={onAdd} className="text-[9px] font-black text-[#92E3A9] uppercase">+ Add Line</button>
            </div>
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                        <input 
                            className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-3 text-xs outline-none focus:border-[#92E3A9]"
                            value={item} onChange={e => onUpdate(idx, e.target.value)} 
                        />
                        <button type="button" onClick={() => onRemove(idx)} className="p-3 text-zinc-700 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
