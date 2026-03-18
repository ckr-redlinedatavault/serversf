"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    LogOut, 
    User,
    Users,
    Mail,
    ShieldCheck,
    Star,
    Loader2,
    Crown,
    Activity,
    Search,
    BookOpen
} from "lucide-react";
import Link from "next/link";

export default function CEOLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/ceo/overview");
            const data = await res.json();
            if (data.success) setStats(data.data);
        } catch (error) {
            console.error("Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        if (pathname === "/ceo/signin") {
            setLoading(false);
            return;
        }

        const storedUser = localStorage.getItem("ceo_user");
        if (!storedUser) {
            router.push("/ceo/signin");
            return;
        }
        setUser(JSON.parse(storedUser));
        
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchStats();
        return () => clearInterval(timer);
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("ceo_user");
        router.push("/");
    };

    if (pathname === "/ceo/signin") return <>{children}</>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-900 bg-[#0A0A0A] flex flex-col z-50 fixed h-screen">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-[#92E3A9] rounded-lg flex items-center justify-center">
                            <Crown className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white tracking-tight leading-none">Forge CEO</span>
                            <span className="text-[10px] font-bold text-[#92E3A9] uppercase tracking-tighter mt-1">Operational Control</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarNavItem 
                        href="/ceo/dashboard"
                        icon={<LayoutDashboard size={18} />} 
                        label="Overview" 
                        active={pathname === "/ceo/dashboard"} 
                    />
                    <SidebarNavItem 
                        href="/ceo/cto"
                        icon={<ShieldCheck size={18} />} 
                        label="CTO Performance" 
                        active={pathname === "/ceo/cto"}
                        badge={stats?.ctos} 
                    />
                    <SidebarNavItem 
                        href="/ceo/media"
                        icon={<User size={18} />} 
                        label="Media Team" 
                        active={pathname === "/ceo/media"}
                        badge={stats?.media} 
                    />
                    <SidebarNavItem 
                        href="/ceo/students"
                        icon={<Users size={18} />} 
                        label="Student Base" 
                        active={pathname === "/ceo/students"}
                        badge={stats?.students} 
                    />
                    <SidebarNavItem 
                        href="/ceo/reviews"
                        icon={<Star size={18} />} 
                        label="Public Reviews" 
                        active={pathname === "/ceo/reviews"}
                        badge={stats?.reviews} 
                    />
                    <SidebarNavItem 
                        href="/ceo/messages"
                        icon={<Mail size={18} />} 
                        label="Global Messages" 
                        active={pathname === "/ceo/messages"}
                        badge={stats?.messages} 
                    />
                </nav>

                <div className="p-4 mt-auto border-t border-zinc-900">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-semibold">Exit Portal</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex flex-col">
                        <h2 className="text-xs font-bold text-zinc-500">CEO Management Gateway</h2>
                        <p className="text-[10px] font-medium text-zinc-500">
                            {mounted ? (
                                <>
                                    {currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : "..."}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Global search..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-[#92E3A9]" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarNavItem({ href, icon, label, active = false, badge }: { href: string, icon: any, label: string, active?: boolean, badge?: number }) {
    return (
        <Link href={href} className={`
            w-full flex items-center justify-between p-3 rounded-xl transition-all
            ${active ? 'bg-[#92E3A9] text-black font-bold' : 'text-zinc-500 hover:text-white hover:bg-zinc-800 font-semibold'}
        `}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            {badge !== undefined && (
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${active ? 'bg-black/20' : 'bg-zinc-800 text-[#92E3A9]'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
