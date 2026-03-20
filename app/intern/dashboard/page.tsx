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
        <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 flex font-sans">
            {/* Minimalist Side Navbar */}
            <aside className="w-64 flex flex-col bg-white border-r border-zinc-100 h-screen sticky top-0">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-[#92E3A9] flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-[15px] font-bold tracking-tight">Intern Portal</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link 
                        href="/intern/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 bg-zinc-50 text-black font-semibold rounded-lg transition-all"
                    >
                        <LayoutDashboard size={18} strokeWidth={1.5} />
                        <span className="text-[13px]">Dashboard</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-lg transition-all">
                        <User size={18} strokeWidth={1.5} />
                        <span className="text-[13px]">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-lg transition-all">
                        <Settings size={18} strokeWidth={1.5} />
                        <span className="text-[13px]">Settings</span>
                    </button>
                </nav>

                <div className="p-6 mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white text-[12px] font-bold hover:opacity-90 transition-opacity"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center items-center">
                {/* Branding Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#92E3A9]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#92E3A9]/5 rounded-full blur-[100px] -ml-32 -mb-32" />

                <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#92E3A9]/10 border border-[#92E3A9]/20 rounded-full">
                            <Sparkles size={14} className="text-[#92E3A9]" />
                            <span className="text-[11px] font-bold text-[#4BA862] uppercase tracking-[0.1em]">Verification Successful</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
                            Thanks for onboarding, <span className="text-zinc-400 underline decoration-[#92E3A9] underline-offset-8 decoration-4">{user.name?.split(' ')[0] || 'Intern'}</span>.
                        </h1>
                        
                        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
                            Your professional journey at Forge Academy starts here. We're finalizing your workspace and modules.
                        </p>
                    </div>

                    <div className="p-10 bg-white border border-zinc-100 shadow-2xl space-y-8">
                        <div className="flex items-center justify-between pb-6 border-b border-zinc-50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-black flex items-center justify-center">
                                    <Clock className="text-white" size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Estimated Access</p>
                                    <p className="text-[16px] font-bold text-black">22 - 03 - 2026</p>
                                </div>
                            </div>
                            <div className="h-12 w-12 border-4 border-zinc-100 border-t-[#92E3A9] rounded-full animate-spin" />
                        </div>

                        <div className="space-y-4 text-left">
                            <h3 className="font-bold text-lg text-black">Next Steps</h3>
                            <ul className="space-y-3">
                                {[
                                    "Complete your internal profile details",
                                    "Review the Forge Code of Conduct",
                                    "Wait for module assignment confirmation"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-zinc-500 text-sm">
                                        <div className="h-1.5 w-1.5 bg-[#92E3A9]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4">
                            <p className="text-[12px] text-zinc-400 font-medium">
                                Direct support is available at <span className="text-black font-bold">internship@studentforge.in</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                         <div className="flex -space-x-2">
                             {[1,2,3,4].map(i => (
                                 <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-zinc-100" />
                             ))}
                         </div>
                         <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Join 1,200+ interns active today</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
