"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    LogOut, 
    ShieldCheck, 
    Calendar,
    Settings,
    User,
    Clock,
    Sparkles,
    ArrowRight
} from "lucide-react";

export default function InternDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem("intern_user");
        if (!storedUser) {
            router.push("/intern/signin");
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("intern_user");
        router.push("/intern/signin");
    };

    if (!mounted || !user) return null;

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex font-sans">
            {/* Minimalist Side Navbar - Simple Black Side */}
            <aside className="w-64 flex flex-col bg-black h-screen sticky top-0 shadow-2xl">
                <div className="p-10">
                    <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#92E3A9] uppercase tracking-[0.3em]">Identity</span>
                        <span className="text-[16px] font-bold text-white tracking-tight mt-1">Intern Portal</span>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-1">
                    <Link 
                        href="/intern/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 bg-white/5 text-[#92E3A9] font-bold rounded-lg transition-all"
                    >
                        <LayoutDashboard size={18} strokeWidth={2} />
                        <span className="text-[13px]">Dashboard</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-all">
                        <User size={18} strokeWidth={2} />
                        <span className="text-[13px]">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-all">
                        <Settings size={18} strokeWidth={2} />
                        <span className="text-[13px]">Settings</span>
                    </button>
                </nav>

                <div className="p-8 mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex h-11 items-center justify-center gap-2 bg-zinc-900 text-zinc-400 text-[11px] font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content - Simplified Look */}
            <main className="flex-1 p-12 md:p-24 relative overflow-hidden flex flex-col justify-center max-w-5xl mx-auto">
                <div className="space-y-12 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-[#92E3A9]" />
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Onboarding Complete</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.1]">
                            Welcome to the Forge, <span className="text-zinc-300">{user.name?.split(' ')[0] || 'Intern'}</span>.
                        </h1>
                        
                        <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                            Thank you for joining our ecosystem. Access to all professional training modules and dashboards will be deployed shortly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-100 mt-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-black flex items-center justify-center">
                                    <Clock className="text-[#92E3A9]" size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Full Access Date</p>
                                    <p className="text-[18px] font-bold text-black tracking-tight">22 March, 2026</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Support Line</p>
                            <p className="text-[15px] font-bold text-black">internship@studentforge.in</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-10">
                         <p className="text-[11px] font-bold text-[#92E3A9] uppercase tracking-[0.2em] px-4 py-2 border border-[#92E3A9]/20 bg-[#92E3A9]/5">System Deployment Pending</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
