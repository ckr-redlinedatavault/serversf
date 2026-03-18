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
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Quote,
    Inbox,
    BookOpen
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminReviewsPage() {
    const router = useRouter();
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem("forge_super_admin");
        if (isAuth !== "true") {
            router.push("/admin/login");
        }
        fetchReviews();
    }, [router]);

    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async () => {
        try {
            setError(null);
            const res = await fetch(`/api/events/review?t=${Date.now()}`);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server status ${res.status}: ${text.slice(0, 100)}`);
            }

            const data = await res.json();

            if (data.success) {
                setReviews(data.reviews);
                if (data.warning) {
                    setError("Review table needs to be created. Please run the SQL provided.");
                }
            } else {
                setError(data.error || "Failed to load reviews");
            }
        } catch (error: any) {
            console.error("Fetch Error:", error.message);
            setError(error.message || "Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("forge_super_admin");
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard" },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews", active: true },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-[#92E3A9] h-screen fixed left-0 top-0 z-50 border-r border-black/5">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-zinc-900 tracking-tight leading-none">Admin Panel</span>
                            <span className="text-[10px] font-semibold text-zinc-900/60 uppercase tracking-widest mt-1">Maintenance</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-2">
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
                        className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all font-bold shadow-xl shadow-red-500/10 active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Logout</span>
                    </button>
                    <div className="mt-4 p-4 rounded-xl bg-zinc-900 text-white border border-white/5 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        System Live
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col">
                <div className="mb-12">
                    <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Reviews" }]} />
                    <h1 className="text-4xl font-bold tracking-tight text-white mt-4">Event Reviews</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Read what participants are saying about the hackathons.</p>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center text-zinc-500 font-medium">
                        Loading reviews...
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-red-500/80 bg-red-500/5 border border-red-500/10 p-12 rounded-[2.5rem] max-w-2xl">
                        <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                        <h3 className="text-lg font-bold text-white mb-2">Sync Error</h3>
                        <p className="text-sm text-zinc-500 text-center mb-8">{error}</p>
                        <button
                            onClick={fetchReviews}
                            className="px-6 py-3 bg-zinc-900 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            Retry Sync
                        </button>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                        <MessageSquare className="w-12 h-12 mb-4 opacity-10" />
                        <p className="font-medium text-sm">No reviews submitted yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-5xl">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-zinc-900/20 border border-zinc-900 rounded-3xl overflow-hidden hover:border-[#92E3A9]/20 transition-all duration-300">
                                <div
                                    className="p-8 cursor-pointer flex items-start justify-between gap-6"
                                    onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-2 w-2 rounded-full bg-[#92E3A9]" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92E3A9]">Team {review.teamName}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{review.userName}</h3>
                                        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                                            {new Date(review.createdAt).toLocaleDateString()} • {review.teamMembers?.length || 0} Members
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-4">
                                        <div className="h-10 w-10 flex items-center justify-center bg-zinc-900 rounded-xl">
                                            {expandedId === review.id ? <ChevronUp className="w-4 h-4 text-[#92E3A9]" /> : <ChevronDown className="w-4 h-4 text-zinc-600" />}
                                        </div>
                                    </div>
                                </div>

                                {expandedId === review.id && (
                                    <div className="px-8 pb-8 pt-2 border-t border-zinc-900 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Event Experience</h4>
                                                    <div className="bg-zinc-900/40 p-6 rounded-2xl relative border border-white/5">
                                                        <Quote className="absolute top-4 right-4 w-4 h-4 text-zinc-800" />
                                                        <p className="text-sm text-zinc-300 leading-relaxed font-medium">"{review.eventReview}"</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Jury Feedback</h4>
                                                    <p className="text-sm text-zinc-400 leading-relaxed pl-4 border-l-2 border-zinc-800">{review.juryFeedback}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">The Journey</h4>
                                                    <p className="text-sm text-zinc-400 leading-relaxed">{review.hackathonJourney}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Team Members</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {review.teamMembers?.map((member: string, i: number) => (
                                                            <span key={i} className="px-3 py-1.5 bg-zinc-900 rounded-lg text-xs font-bold text-zinc-300 border border-white/5">
                                                                {member}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
