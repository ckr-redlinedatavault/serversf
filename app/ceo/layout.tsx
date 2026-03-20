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
    Search,
    BookOpen,
    FileText,
    ChevronDown
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
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans selection:bg-[#92E3A9] selection:text-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-900 bg-[#0A0A0A] flex flex-col z-50 fixed h-screen shadow-2xl">
                {/* Brand Section */}
                <div className="p-8">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-[#92E3A9] rounded-xl flex items-center justify-center shadow-lg shadow-[#92E3A9]/10">
                            <Crown className="w-5 h-5 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white tracking-tight">Forge CEO</span>
                            <span className="text-[10px] font-medium text-[#92E3A9] mt-0.5">Control Terminal</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar pb-10">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        <SidebarNavItem 
                            href="/ceo/dashboard"
                            icon={<LayoutDashboard size={18} />} 
                            label="Dashboard" 
                            active={pathname === "/ceo/dashboard"} 
                        />
                        <SidebarNavItem 
                            href="/ceo/cto"
                            icon={<ShieldCheck size={18} />} 
                            label="CTO Management" 
                            active={pathname === "/ceo/cto"}
                            badge={stats?.ctos} 
                        />
                        <SidebarNavItem 
                            href="/ceo/media"
                            icon={<User size={18} />} 
                            label="Media Core" 
                            active={pathname === "/ceo/media"}
                            badge={stats?.media} 
                        />
                        <SidebarNavItem 
                            href="/ceo/students"
                            icon={<Users size={18} />} 
                            label="Student Database" 
                            active={pathname === "/ceo/students"}
                            badge={stats?.students} 
                        />
                    </div>

                    {/* Feedback & Communications */}
                    <div className="space-y-1">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-bold text-zinc-700 tracking-widest uppercase">Communication</span>
                        </div>
                        <SidebarNavItem 
                            href="/ceo/reviews"
                            icon={<Star size={18} />} 
                            label="Public Feedback" 
                            active={pathname === "/ceo/reviews"}
                            badge={stats?.reviews} 
                        />
                        <SidebarNavItem 
                            href="/ceo/messages"
                            icon={<Mail size={18} />} 
                            label="Global Inbound" 
                            active={pathname === "/ceo/messages"}
                            badge={stats?.messages} 
                        />
                    </div>

                    {/* Security & Monitoring */}
                    <div className="space-y-1">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-bold text-zinc-700 tracking-widest uppercase">Monitoring</span>
                        </div>
                        <SidebarNavItem 
                            href="/ceo/logs"
                            icon={<ShieldCheck size={18} />} 
                            label="System Logs" 
                            active={pathname === "/ceo/logs"}
                        />
                    </div>

                    {/* Data Capture / Forms */}
                    <div className="space-y-1">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-bold text-zinc-700 tracking-widest uppercase">Intake Systems</span>
                        </div>
                        <SidebarNavGroup 
                            label="Forms & Portals" 
                            icon={<FileText size={18} />}
                            isOpen={pathname.includes("/ceo/forms")}
                        >
                            <SidebarNavItem 
                                href="/ceo/forms/intern"
                                icon={<Users size={14} />} 
                                label="Intern Applications" 
                                active={pathname === "/ceo/forms/intern"}
                                badge={stats?.interns}
                                isNested
                            />
                        </SidebarNavGroup>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-zinc-900/50 bg-[#0A0A0A]">
                    <button 
                        onClick={handleLogout}
                        className="w-full h-12 flex items-center gap-3 px-4 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-xl transition-all group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col">
                <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex flex-col">
                        <h2 className="text-xs font-bold text-zinc-600">Secure Administrative Gateway</h2>
                        <p className="text-[10px] font-bold text-zinc-500 mt-0.5">
                            {mounted ? (
                                <>
                                    {currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : "Synchronizing..."}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-700 group-focus-within:text-[#92E3A9] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Global Search..." 
                                className="bg-zinc-950 border border-zinc-900 rounded-xl px-9 py-2 text-[11px] font-bold outline-none focus:border-[#92E3A9]/30 transition-all w-56 text-white placeholder:text-zinc-800" 
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#050505]">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarNavItem({ href, icon, label, active = false, badge, isNested = false }: { href: string, icon: any, label: string, active?: boolean, badge?: number, isNested?: boolean }) {
    return (
        <Link href={href} className={`
            w-full flex items-center justify-between p-3 rounded-xl transition-all
            ${active ? 'bg-[#92E3A9] text-black font-bold shadow-lg shadow-[#92E3A9]/10' : 'text-zinc-500 hover:text-white hover:bg-zinc-900 font-semibold'}
            ${isNested ? 'pl-11 py-2.5 mt-0.5' : ''}
        `}>
            <div className="flex items-center gap-3">
                <div className={`${active ? 'text-black' : 'text-zinc-500 group-hover:text-white'}`}>
                    {icon}
                </div>
                <span className="text-xs">{label}</span>
            </div>
            {badge !== undefined && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${active ? 'bg-black/10' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}

function SidebarNavGroup({ label, icon, children, isOpen: initialOpen = false }: { label: string, icon: any, children: React.ReactNode, isOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    
    return (
        <div className="space-y-1">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between p-3 rounded-xl transition-all
                    text-zinc-500 hover:text-white hover:bg-zinc-900 font-semibold
                `}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-xs">{label}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-zinc-700`} />
            </button>
            {isOpen && (
                <div className="flex flex-col">
                    {children}
                </div>
            )}
        </div>
    );
}
