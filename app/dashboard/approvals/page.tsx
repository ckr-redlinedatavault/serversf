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
    CheckCircle2,
    XCircle,
    Loader2,
    Search,
    RefreshCw
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function ApprovalsPage() {
    const router = useRouter();
    const [pendingUsers, setPendingUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/cto/pending");
            const data = await res.json();
            setPendingUsers(data.users || []);
        } catch (error) {
            console.error("Failed to fetch pending users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAuth = localStorage.getItem("forge_super_admin");
        if (isAuth !== "true") {
            router.push("/admin/login");
        }
        fetchPending();
    }, [router]);

    const handleApprove = async (id: string) => {
        setApprovingId(id);
        try {
            const res = await fetch("/api/cto/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id }),
            });
            if (res.ok) {
                setPendingUsers(prev => prev.filter(u => u.id !== id));
            }
        } catch (error) {
            console.error("Approval failed");
        } finally {
            setApprovingId(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("forge_super_admin");
        router.push("/admin/login");
    };

    const filteredUsers = pendingUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard" },
        { name: "Approvals", icon: ShieldCheck, slug: "/dashboard/approvals", active: true },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts" },
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
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Approvals" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">Pending Approvals</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Verify and authorize new team members.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input 
                                type="text"
                                placeholder="Search requests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl px-10 py-2.5 text-xs outline-none focus:border-[#92E3A9] transition-all w-64"
                            />
                        </div>
                        <button 
                            onClick={fetchPending}
                            className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all text-[#92E3A9]"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden">
                    {loading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-zinc-600 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-[#92E3A9]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Querying database...</span>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-zinc-600 gap-4">
                            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
                                <CheckCircle2 className="w-8 h-8 opacity-20" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">No pending authorization requests</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map((user) => (
                                <div key={user.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl hover:border-[#92E3A9]/30 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <ShieldCheck size={48} />
                                    </div>
                                    
                                    <div className="mb-6">
                                        <div className="w-10 h-10 bg-[#92E3A9] rounded-lg mb-4 flex items-center justify-center text-black font-black text-xs uppercase">
                                            {user.name.charAt(0)}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
                                        <p className="text-xs text-zinc-500 font-medium truncate">{user.email}</p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
                                        <button
                                            onClick={() => handleApprove(user.id)}
                                            disabled={!!approvingId}
                                            className="flex-1 bg-[#92E3A9] text-black h-11 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                                        >
                                            {approvingId === user.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin mx-auto text-black" />
                                            ) : (
                                                "Authorize"
                                            )}
                                        </button>
                                        <button
                                            className="w-11 h-11 bg-zinc-800 text-zinc-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-zinc-700/50 hover:border-red-400"
                                        >
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <footer className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center opacity-40">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Node Maintenance v4.2.0</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Forge Super Admin Control</span>
                </footer>
            </main>
        </div>
    );
}
