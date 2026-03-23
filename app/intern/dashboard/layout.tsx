"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    LogOut, 
    User, 
    Settings,
    ChevronRight,
    Briefcase,
    Calendar,
    ShieldCheck,
    Hand
} from "lucide-react";

export default function InternDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [isTogglingHand, setIsTogglingHand] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem("intern_user");
        if (!storedUser) {
            router.push("/intern/signin");
            return;
        }
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setHandRaised(userData.handRaised || false);
    }, [router]);

    useEffect(() => {
        if (!user) return;
        const sendPulse = async () => {
            try {
                await fetch("/api/intern/pulse", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id })
                });
            } catch (err) {
                // Ignore silent errors
            }
        };
        sendPulse(); // Initial
        const interval = setInterval(sendPulse, 30000); // Every 30s
        return () => clearInterval(interval);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("intern_user");
        router.push("/intern/signin");
    };

    const toggleHand = async () => {
        if (!user) return;
        setIsTogglingHand(true);
        try {
            const res = await fetch("/api/intern/hand", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ internId: user.id, raised: !handRaised }),
            });
            const data = await res.json();
            if (data.success) {
                setHandRaised(data.handRaised);
                // Update local storage too
                const updatedUser = { ...user, handRaised: data.handRaised };
                localStorage.setItem("intern_user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (error) {
            console.error("Failed to toggle hand");
        } finally {
            setIsTogglingHand(false);
        }
    };

    if (!mounted || !user) return null;

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/intern/dashboard" },
        { name: "Assignments", icon: Briefcase, slug: "/intern/dashboard?view=tasks" },
        { name: "Schedule", icon: Calendar, slug: "/intern/dashboard/schedule" },
        { name: "Attendance Hist.", icon: Calendar, slug: "/intern/dashboard?view=attendance" },
        { name: "Settings", icon: Settings, slug: "/intern/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 flex font-sans">
            {/* Sharp Blue Sidebar */}
            <aside className="w-20 lg:w-64 flex flex-col bg-[#0055FF] h-screen sticky top-0 z-50 text-white shadow-2xl rounded-none">
                <div className="p-8 pb-10 flex items-center gap-3">
                    <img 
                        src="/sf-next-logo.png" 
                        alt="Student Forge Logo" 
                        className="h-8 w-8 object-contain"
                    />
                    <span className="hidden lg:block text-lg font-bold tracking-tight">Intern Portal</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.slug || (item.name === "Overview" && pathname === "/intern/dashboard");
                        return (
                            <Link 
                                key={item.name}
                                href={item.slug} 
                                className={`flex items-center justify-center lg:justify-start h-12 px-4 gap-4 rounded-none transition-all ${
                                    isActive 
                                    ? "bg-white text-[#0055FF] font-bold shadow-lg shadow-black/10" 
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="hidden lg:block text-[14px]">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto border-t border-white/10 space-y-3">
                    <button 
                        onClick={toggleHand}
                        disabled={isTogglingHand}
                        className={`w-full h-12 flex items-center justify-center lg:justify-start px-4 gap-4 rounded-none font-bold transition-all shadow-lg ${
                            handRaised 
                            ? "bg-amber-500 text-black hover:bg-amber-600" 
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                    >
                        {isTogglingHand ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full mx-auto lg:mx-0" />
                        ) : (
                            <Hand size={20} className={handRaised ? "animate-bounce" : ""} />
                        )}
                        <span className="hidden lg:block text-[14px]">
                            {handRaised ? "Lower Hand" : "Raise Hand"}
                        </span>
                    </button>

                    <button 
                        onClick={handleLogout}
                        className="w-full h-12 flex items-center justify-center lg:justify-start px-4 gap-4 bg-red-600 text-white rounded-none font-bold hover:bg-red-700 transition-all shadow-lg shadow-black/10"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block text-[14px]">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-zinc-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-zinc-400">Portal</span>
                        <ChevronRight size={14} className="text-zinc-300" />
                        <span className="text-[12px] font-bold text-zinc-900 capitalize">
                           {pathname.includes("tasks") ? "Assignments" : "Overview"}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 pr-4 border-r border-zinc-100">
                            <div className="text-right">
                               <p className="text-sm font-bold text-black leading-none">{user.name}</p>
                               <p className="text-[10px] text-zinc-400 font-medium mt-1 uppercase">Global session</p>
                            </div>
                            <div className="h-9 w-9 bg-[#0055FF] rounded-none flex items-center justify-center text-white text-xs font-bold">
                                {user.name[0]}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
