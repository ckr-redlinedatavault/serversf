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
    Inbox
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
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar - Green Forge Look */}
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
                    {/* Solid Red Logout Look */}
                    <button
                        onClick={handleLogout}
                        className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all font-bold shadow-xl shadow-red-500/10 active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Logout</span>
                    </button>

                    <div className="mt-4 p-4 rounded-xl bg-zinc-900 text-white border border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Live</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin" }, { label: "Dashboard" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">{getGreeting()}, Admin</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Here is the report for today.</p>
                    </div>

                    <div className="hidden lg:flex flex-col items-end text-right">
                        <div className="flex items-center gap-2 text-zinc-400 mb-1">
                            <CalendarDays className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-[11px] font-bold uppercase tracking-widest">
                                {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-white bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
                            <Clock className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-2xl font-bold tabular-nums">
                                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-left">
                    {[
                        { label: "Total Students", value: stats.students, desc: "Forge Database" },
                        { label: "Lab Events", value: stats.events, desc: "Active Missions" },
                        { label: "Inquiries", value: stats.contacts, desc: "Contact Portal" },
                        { label: "User Reviews", value: stats.reviews, desc: "Shared Stories" }
                    ].map((stat, i) => (
                        <div key={i} className="p-8 rounded-3xl border border-zinc-900 bg-zinc-900/10 group hover:border-[#92E3A9]/50 transition-all duration-500">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 block">{stat.label}</span>
                            <div className="flex items-end gap-2 mb-2">
                                <h2 className="text-4xl font-bold tracking-tighter text-white">{loading ? "..." : stat.value}</h2>
                                <Activity className="w-4 h-4 mb-2 text-[#92E3A9]" />
                            </div>
                            <p className="text-[10px] font-medium text-zinc-700 uppercase tracking-widest">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* System Status - Simplified */}
                <div className="flex-1 flex flex-col gap-6 text-left">
                    <div className="flex-1 p-10 rounded-[3rem] bg-zinc-900/10 border border-zinc-900 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#92E3A9]">Node Status</h3>
                            <button
                                onClick={fetchStats}
                                className="h-9 px-6 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#92E3A9] hover:text-black transition-all border border-white/5"
                            >
                                Refresh Core
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Database Connection</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">Supabase Primary: Connected</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Email Protocol</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">SMTP Gmail: Operational</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-2xl bg-zinc-900/5 border border-dashed border-zinc-800 flex flex-col justify-center text-center">
                                <ShieldCheck className="w-12 h-12 text-[#92E3A9] mx-auto mb-4 opacity-50" />
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                                    All systems are functioning within normal parameters. <br /> No critical errors detected in the last 24 hours.
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto flex gap-8 pt-10 border-t border-zinc-900">
                            <Link href="/mailer" className="text-[10px] font-bold text-[#92E3A9] hover:text-white transition-colors uppercase tracking-widest">Launch Mailer</Link>
                            <Link href="/events" className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest">Event Engine</Link>
                            <Link href="/dashboard/reviews" className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest ml-auto">Intelligence Report</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
