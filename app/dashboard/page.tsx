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
    Activity,
    ShieldCheck,
    Clock,
    CalendarDays,
    Star,
    Inbox,
    Server,
    Zap,
    BookOpen
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminDashboard() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({
        students: 0,
        events: 0,
        reviews: 0,
        contacts: 0
    });
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats");
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

        fetchStats();

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
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard", active: true },
        { name: "Approvals", icon: ShieldCheck, slug: "/dashboard/approvals" },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
        { name: "Courses", icon: BookOpen, slug: "/ceo/courses" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar - Green Forge Look */}
            <aside className="w-64 flex flex-col bg-[#92E3A9] h-screen fixed left-0 top-0 z-50 border-r border-black/5">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-zinc-900 tracking-tight leading-none">Forge Admin</span>
                            <span className="text-[10px] font-semibold text-zinc-900/60 mt-1 uppercase tracking-tighter">Servers</span>
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
                        className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all font-bold active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs font-semibold">Logout</span>
                    </button>

                    <div className="mt-4 p-3 rounded-xl bg-zinc-900 text-white border border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold opacity-60">System Live</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-6 md:p-10 min-h-screen flex flex-col">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin" }, { label: "Dashboard" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">{mounted ? getGreeting() : "Hello"}, Admin</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">
                            Today is {mounted ? (
                                <>
                                    {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}, {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </>
                            ) : "..."}
                        </p>
                    </div>

                    <div className="hidden lg:flex flex-col items-end text-right">
                        <div className="flex items-center gap-2 text-zinc-400 mb-1">
                            <CalendarDays className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-[11px] font-bold">
                                {currentTime.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
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

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 text-left">
                    {[
                        { label: "Total Students", value: stats.students, desc: "Academic Database" },
                        { label: "Lab Events", value: stats.events, desc: "Platform Events" },
                        { label: "Inquiries", value: stats.contacts, desc: "Support Tickets" },
                        { label: "User Reviews", value: stats.reviews, desc: "Public Feedback" }
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl border border-zinc-900 bg-zinc-900/10 group hover:border-[#92E3A9]/50 transition-all duration-500">
                            <span className="text-[10px] font-bold text-zinc-500 mb-3 block">{stat.label}</span>
                            <div className="flex items-end gap-2 mb-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-white">{loading ? "..." : stat.value}</h2>
                                <Activity className="w-4 h-4 mb-2 text-[#92E3A9]" />
                            </div>
                            <p className="text-[10px] font-medium text-zinc-700">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* System Status - Cleaned up */}
                <div className="flex-1 flex flex-col gap-6 text-left">
                    <div className="flex-1 p-8 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-900 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-bold text-[#92E3A9]">Node Status</h3>
                            <button
                                onClick={fetchStats}
                                className="h-9 px-5 bg-zinc-900 text-white rounded-xl text-[10px] font-bold hover:bg-[#92E3A9] hover:text-black transition-all border border-white/5"
                            >
                                Refresh Core
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-5 rounded-2xl bg-zinc-900/20 border border-white/5 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-zinc-500 mb-3">Database Connection</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                            <span className="text-xs font-bold text-white">Connected</span>
                                        </div>
                                    </div>
                                    <Server className="w-5 h-5 text-zinc-800 mt-4 self-end" />
                                </div>
                                <div className="p-5 rounded-2xl bg-zinc-900/20 border border-white/5 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-zinc-500 mb-3">Email Protocol</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                            <span className="text-xs font-bold text-white">Operational</span>
                                        </div>
                                    </div>
                                    <Mail className="w-5 h-5 text-zinc-800 mt-4 self-end" />
                                </div>
                                <div className="p-5 rounded-2xl bg-zinc-900/20 border border-white/5 flex flex-col justify-between group hover:border-[#92E3A9]/50 transition-all cursor-pointer" onClick={() => router.push('/dashboard/approvals')}>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-[#92E3A9] mb-3">Pending Approvals</h4>
                                        <div className="flex items-center gap-3">
                                            <Zap className="w-4 h-4 text-[#92E3A9] animate-pulse" />
                                            <span className="text-xs font-bold text-white underline decoration-[#92E3A9]/30 underline-offset-4">Check Requests</span>
                                        </div>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 text-[#92E3A9] mt-4 self-end opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                        </div>

                        <div className="mt-auto flex gap-6 pt-8 border-t border-zinc-900">
                            <Link href="/mailer" className="text-[10px] font-bold text-[#92E3A9] hover:text-white transition-colors">Launch System Mailer</Link>
                            <Link href="/dashboard/approvals" className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors">Access Control</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
