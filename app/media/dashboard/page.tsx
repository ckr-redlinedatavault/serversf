"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    Image as ImageIcon, 
    Video, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    User,
    Sparkles
} from "lucide-react";

export default function MediaDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("media_user");
        if (!storedUser) {
            router.push("/media/signin");
            return;
        }
        const parsed = JSON.parse(storedUser);
        
        // Strict check: Must be MEDIA_TEAM and must be APPROVED
        if (parsed.role !== "MEDIA_TEAM" || !parsed.isApproved) {
            localStorage.removeItem("media_user"); // Clear invalid/unapproved session
            router.push("/media/signin?error=pending");
            return;
        }
        
        setUser(parsed);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("media_user");
        router.push("/media/signin");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} border-r border-zinc-900 bg-[#0A0A0A] flex flex-col transition-all duration-300 z-50`}>
                <div className="p-6 flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#92E3A9] animate-pulse" />
                            <span className="text-xs font-black tracking-widest text-[#92E3A9] uppercase">Media Hub</span>
                        </div>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active open={sidebarOpen} />
                    <NavItem icon={<ImageIcon size={20} />} label="Assets" open={sidebarOpen} />
                    <NavItem icon={<Video size={20} />} label="Productions" open={sidebarOpen} />
                    <div className="pt-4 mt-4 border-t border-zinc-900">
                        <NavItem icon={<Settings size={20} />} label="Settings" open={sidebarOpen} />
                    </div>
                </nav>

                <div className="p-4 mt-auto border-t border-zinc-900">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="text-sm font-bold">Disconnect</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Top Nav */}
                <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
                    <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Team Console / <span className="text-white">Overview</span></h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-white">{user.name}</p>
                            <p className="text-[10px] font-bold text-[#92E3A9]">MEDIA TEAM ACTIVE</p>
                        </div>
                        <div className="w-10 h-10 bg-[#92E3A9] rounded-xl flex items-center justify-center text-black font-black">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <div className="p-8 sm:p-12 max-w-5xl mx-auto">
                    <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-zinc-800 p-12 overflow-hidden shadow-2xl">
                        {/* Abstract background blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#92E3A9]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 text-[#92E3A9]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#92E3A9]">Access Granted</span>
                            </div>
                            
                            <h1 className="text-5xl font-black mb-6 tracking-tighter leading-none">
                                Welcome back, <br />
                                <span className="text-[#92E3A9]">{user.name.split(' ')[0]}</span>.
                            </h1>
                            
                            <p className="text-xl text-zinc-400 font-medium max-w-xl leading-relaxed mb-10">
                                Your identity has been verified by the CTO. You now have full access to the Media Team dashboard and production assets.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <StatCard label="Active Projects" value="12" />
                                <StatCard label="Stored Assets" value="1.4k" />
                                <StatCard label="Team Members" value="08" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false, open }: { icon: any, label: string, active?: boolean, open: boolean }) {
    return (
        <button className={`
            w-full flex items-center gap-4 p-3 rounded-xl transition-all
            ${active ? 'bg-[#92E3A9] text-black shadow-[0_10px_20px_rgba(146,227,169,0.15)]' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}
        `}>
            {icon}
            {open && <span className="text-sm font-bold">{label}</span>}
        </button>
    );
}

function StatCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors cursor-default">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-white">{value}</p>
        </div>
    );
}
