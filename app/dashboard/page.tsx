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
    BookOpen,
    CreditCard,
    ArrowRight,
    Search,
    Bell,
    Settings
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
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses" },
        { name: "Enrollments", icon: CreditCard, slug: "/dashboard/enrollments" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#080808] text-white flex font-sans selection:bg-[#92E3A9]/30">
            {/* Sidebar - Precision Engineering Look */}
            <aside className="w-64 flex flex-col bg-[#0A0A0A] h-screen fixed left-0 top-0 z-50 border-r border-white/5 shadow-2xl">
                <div className="p-8">
                    <div className="flex items-center gap-3 group">
                        <div className="h-10 w-10 bg-[#92E3A9] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-[0_0_20px_rgba(146,227,169,0.3)]">
                            <ShieldCheck className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-white tracking-tight leading-none">Forge Hub</span>
                            <span className="text-[9px] font-bold text-[#92E3A9] mt-1 uppercase tracking-[0.2em]">Super Admin</span>
                        </div>
                    </div>
                </div>

                <div className="px-6 mb-6">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600 group-focus-within:text-[#92E3A9] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Quick Search..." 
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-[10px] outline-none focus:border-[#92E3A9]/30 transition-all font-medium"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
                    <p className="px-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3 mt-4">Navigation</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.slug}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                                ${item.active
                                    ? 'bg-[#92E3A9]/10 text-[#92E3A9]'
                                    : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`
                            }
                        >
                            <item.icon className={`w-4 h-4 transition-colors ${item.active ? 'text-[#92E3A9]' : 'group-hover:text-[#92E3A9]'}`} />
                            <span className="text-xs font-semibold">{item.name}</span>
                            {item.active && <div className="absolute right-4 w-1 h-1 rounded-full bg-[#92E3A9] shadow-[0_0_8px_rgba(146,227,169,0.8)]" />}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 mt-auto space-y-4">
                    <button
                        onClick={handleLogout}
                        className="w-full h-11 flex items-center justify-center gap-3 rounded-xl bg-zinc-900 text-zinc-400 hover:bg-red-500 hover:text-white transition-all duration-500 font-bold active:scale-[0.98] border border-white/5"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-widest">Logout Session</span>
                    </button>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#92E3A9]/10 to-transparent border border-[#92E3A9]/5">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#92E3A9] animate-pulse" />
                            <span className="text-[9px] font-bold text-[#92E3A9] uppercase tracking-widest">System Online</span>
                        </div>
                        <p className="text-[8px] text-zinc-600 font-medium leading-tight">All systems operational. No critical errors detected.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#92E3A9]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                <header className="mb-12 flex justify-between items-start relative z-10">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin" }, { label: "Overview" }]} />
                        <div className="flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold tracking-tight text-white">{mounted ? getGreeting() : "Hello"}, Admin</h1>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                                <Star className="w-3 h-3 text-[#92E3A9] fill-[#92E3A9]" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Premium Access</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium mt-2">
                            Today is {mounted ? (
                                <span className="text-zinc-300">
                                    {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}, {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            ) : "..."}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="h-10 w-10 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#92E3A9] rounded-full border-2 border-[#0A0A0A]" />
                        </button>
                        <div className="h-10 w-10 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                            <Settings className="w-4 h-4" />
                        </div>
                        <div className="h-10 px-4 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-3">
                            <Clock className="w-4 h-4 text-[#92E3A9]" />
                            <span className="text-sm font-bold tabular-nums">
                                {mounted ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : "--:--:--"}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Status Ticker */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 mb-10 flex items-center gap-8 relative overflow-hidden group">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <div className="h-2 w-2 rounded-full bg-[#92E3A9] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Global Pulse:</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-[11px] font-medium text-zinc-400 animate-marquee whitespace-nowrap">
                            New enrollment for Next.js Mastery • 4 inquiries pending response • Database latency: 12ms • Server cluster Alpha optimized • SSL certificates valid
                        </div>
                    </div>
                    <Link href="/dashboard/approvals" className="flex items-center gap-2 text-[10px] font-bold text-[#92E3A9] uppercase tracking-widest hover:underline transition-all">
                        View Alerts <ArrowRight size={12} />
                    </Link>
                </div>

                {/* Grid Stats - Modern Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Total Students", value: stats.students, desc: "Academic Database", icon: Users, color: "text-blue-500" },
                        { label: "Lab Events", value: stats.events, desc: "Platform Events", icon: Zap, color: "text-yellow-500" },
                        { label: "Inquiries", value: stats.contacts, desc: "Support Tickets", icon: Inbox, color: "text-[#92E3A9]" },
                        { label: "User Reviews", value: stats.reviews, desc: "Public Feedback", icon: Star, color: "text-purple-500" }
                    ].map((stat, i) => (
                        <div key={i} className="p-7 rounded-[2rem] border border-white/5 bg-zinc-900/20 group hover:bg-[#92E3A9]/[0.02] hover:border-[#92E3A9]/30 transition-all duration-700 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl bg-zinc-900 border border-white/10 ${stat.color} transition-transform group-hover:scale-110 duration-500 shadow-xl`}>
                                    <stat.icon size={20} />
                                </div>
                                <Activity className="w-4 h-4 text-zinc-800 group-hover:text-[#92E3A9]/30 transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-4xl font-bold tracking-tighter text-white">{loading ? "..." : stat.value.toLocaleString()}</h2>
                                <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                            </div>
                            <div className="mt-6 flex items-center gap-2">
                                <div className="h-1 flex-1 bg-zinc-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#92E3A9]/40 w-[65%]" />
                                </div>
                                <span className="text-[9px] font-bold text-zinc-600">+12%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* System Monitoring Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
                    <div className="lg:col-span-2 p-8 rounded-[3rem] bg-zinc-900/20 border border-white/5 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-white mb-1">System Architecture</h3>
                                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Node-based Performance Monitor</p>
                            </div>
                            <button
                                onClick={fetchStats}
                                className="px-6 py-2.5 bg-[#92E3A9] text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(146,227,169,0.3)]"
                            >
                                Refresh Core
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 flex flex-col justify-between group hover:border-[#92E3A9]/20 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Database Protocol</h4>
                                    <Server className="w-4 h-4 text-zinc-700 group-hover:text-[#92E3A9] transition-colors" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-[#92E3A9] shadow-[0_0_10px_rgba(146,227,169,0.5)]" />
                                        <span className="text-xs font-bold text-white tracking-widest uppercase">PostgreSQL Connected</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-600 font-medium">AWS-1 Registry • Sydney Node • 12ms Latency</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 flex flex-col justify-between group hover:border-[#92E3A9]/20 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Services</h4>
                                    <Mail className="w-4 h-4 text-zinc-700 group-hover:text-[#92E3A9] transition-colors" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-[#92E3A9] shadow-[0_0_10px_rgba(146,227,169,0.5)]" />
                                        <span className="text-xs font-bold text-white tracking-widest uppercase">NodeMailer Active</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-600 font-medium">G-Cloud SMTP • SSL Secured • Queue Empty</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-transparent border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                                </div>
                                <div>
                                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Security Engine</h5>
                                    <p className="text-[10px] text-zinc-500 font-medium tracking-tight">Vulnerability scan completed. 0 threats found.</p>
                                </div>
                            </div>
                            <Link href="/dashboard/approvals" className="px-5 py-2 bg-white/5 text-zinc-400 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors">Audit Logs</Link>
                        </div>
                    </div>

                    <div className="p-8 rounded-[3rem] bg-zinc-900/20 border border-white/5 flex flex-col">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Pending Tasks</h3>
                        <div className="space-y-6 flex-1">
                            {[
                                { title: "Review Inquiries", date: "Today", icon: Inbox, color: "bg-[#92E3A9]/10" },
                                { title: "Approve Students", date: "Today", icon: ShieldCheck, color: "bg-blue-500/10" },
                                { title: "Verify Payments", date: "Tomorrow", icon: CreditCard, color: "bg-purple-500/10" },
                                { title: "System Maintenance", date: "Weekend", icon: Server, color: "bg-orange-500/10" }
                            ].map((task, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className={`h-11 w-11 rounded-full ${task.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                        <task.icon size={16} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">{task.title}</h6>
                                        <p className="text-[10px] text-zinc-600 font-medium">{task.date}</p>
                                    </div>
                                    <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                </div>
                            ))}
                        </div>
                        <Link href="/mailer" className="mt-8 w-full py-4 bg-zinc-900 rounded-[1.5rem] border border-white/5 flex items-center justify-center gap-3 group">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-[#92E3A9] transition-colors">Open System Mailer</span>
                             <Mail size={14} className="text-zinc-600 group-hover:text-[#92E3A9] transition-colors" />
                        </Link>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
