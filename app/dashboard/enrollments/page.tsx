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
    Loader2,
    BookOpen,
    Clock,
    CalendarDays,
    ChevronRight,
    CreditCard,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    ArrowUpDown,
    Eye
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminEnrollmentsPage() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchEnrollments = async () => {
        try {
            const res = await fetch("/api/courses/enroll");
            const data = await res.json();
            if (data.success) setEnrollments(data.enrollments);
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

        fetchEnrollments();

        return () => clearInterval(timer);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("forge_super_admin");
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard" },
        { name: "Approvals", icon: ShieldCheck, slug: "/dashboard/approvals" },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses" },
        { name: "Enrollments", icon: CreditCard, slug: "/dashboard/enrollments", active: true },
    ];

    const filtered = enrollments.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             e.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             e.course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || e.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-[#92E3A9] h-screen fixed left-0 top-0 z-50 border-r border-black/5">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div className="flex flex-col text-left">
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
                        <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Enrollments" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">Candidate Registrations</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Verify and manage technical curriculum enrollments.</p>
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard label="Total Submissions" value={enrollments.length} />
                    <StatCard label="Awaiting Verification" value={enrollments.filter(e => e.status === "pending").length} theme="warning" />
                    <StatCard label="Verified Seats" value={enrollments.filter(e => e.status === "verified").length} theme="success" />
                    <StatCard label="Rejected Claims" value={enrollments.filter(e => e.status === "rejected").length} theme="danger" />
                </div>

                <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 flex-1 flex flex-col min-h-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                            <input 
                                type="text"
                                placeholder="Search by name, email, or reference..."
                                className="w-full bg-zinc-950 border border-zinc-900 rounded-xl py-3 pl-12 pr-6 text-xs outline-none focus:border-[#92E3A9] transition-all"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <select 
                                className="bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs font-bold outline-none cursor-pointer"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-zinc-900">
                                <tr className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                    <th className="px-4 py-6">Candidate / Course</th>
                                    <th className="px-4 py-6">Contact / Institution</th>
                                    <th className="px-4 py-6">Transaction Detail</th>
                                    <th className="px-4 py-6">Status</th>
                                    <th className="px-4 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#92E3A9] opacity-20" />
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-zinc-700 font-bold uppercase tracking-tighter italic">
                                            No enrollment records found.
                                        </td>
                                    </tr>
                                ) : filtered.map((enrollment) => (
                                    <tr key={enrollment.id} className="group hover:bg-zinc-900/20 transition-all duration-300">
                                        <td className="px-4 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white group-hover:text-[#92E3A9] transition-colors">{enrollment.name}</span>
                                                <span className="text-[10px] font-bold text-zinc-600 mt-1 uppercase italic tracking-tighter">
                                                    {enrollment.course.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-zinc-400">{enrollment.email}</span>
                                                <span className="text-[10px] font-bold text-zinc-600 mt-1 uppercase tracking-[0.1em]">
                                                    {enrollment.college} ({enrollment.year} Year)
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-[#92E3A9]">₹{enrollment.amount}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{enrollment.bankName}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-zinc-700 mt-1 tracking-widest">
                                                    REF: {enrollment.referenceId}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6">
                                            <StatusBadge status={enrollment.status} />
                                        </td>
                                        <td className="px-4 py-6 text-right">
                                            <button 
                                                onClick={() => router.push(`/dashboard/enrollments/${enrollment.id}`)}
                                                className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <footer className="mt-8 pt-8 border-t border-zinc-900 flex justify-between items-center text-zinc-700">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Registry Hub v1.2.0</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#92E3A9]/40">Student Forge Maintenance</span>
                </footer>
            </main>
        </div>
    );
}

function StatCard({ label, value, theme = "neutral" }: any) {
    const themes: any = {
        neutral: "text-white border-zinc-900",
        success: "text-[#92E3A9] border-[#92E3A9]/20",
        warning: "text-amber-500 border-amber-500/20",
        danger: "text-red-500 border-red-500/20"
    };
    return (
        <div className={`p-8 bg-zinc-900/10 border rounded-[2.5rem] ${themes[theme]}`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{label}</p>
            <p className="text-4xl font-black italic tracking-tighter">{value}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "verified") return (
        <div className="flex items-center gap-2 text-[10px] font-black text-[#92E3A9] bg-[#92E3A9]/10 px-3 py-1 rounded-full border border-[#92E3A9]/20 uppercase">
            <CheckCircle2 className="w-3 h-3" /> Verified
        </div>
    );
    if (status === "rejected") return (
        <div className="flex items-center gap-2 text-[10px] font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 uppercase">
            <XCircle className="w-3 h-3" /> Rejected
        </div>
    );
    return (
        <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase">
            <Clock className="w-3 h-3" /> Awaiting
        </div>
    );
}
