"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    LogOut, 
    User, 
    Settings,
    ArrowLeft,
    Bell,
    Search
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

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, slug: "/intern/dashboard" },
        { name: "Profile", icon: User, slug: "/intern/dashboard/profile" },
        { name: "Settings", icon: Settings, slug: "/intern/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex font-sans">
            {/* Black Sidebar */}
            <aside className="w-64 flex flex-col bg-black h-screen sticky top-0 z-50 shadow-2xl">
                <div className="p-10 pb-12">
                    <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#92E3A9] uppercase tracking-[0.3em]">Identity</span>
                        <span className="text-[16px] font-bold text-white tracking-tight mt-1">Intern Portal</span>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.slug;
                        return (
                            <Link 
                                key={item.name}
                                href={item.slug} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActive 
                                    ? "bg-white/5 text-[#92E3A9] font-bold" 
                                    : "text-zinc-500 hover:text-white"
                                }`}
                            >
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[13px]">{item.name}</span>
                            </Link>
                        );
                    })}
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

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Simplified Green Top Navigation Bar */}
                <header className="h-14 bg-[#92E3A9] border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-black rounded-full" />
                        <span className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">Verified Session</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-black leading-none">{user.name}</p>
                            <p className="text-[9px] font-bold text-black/50 uppercase tracking-widest mt-0.5">Intern</p>
                        </div>
                        <div className="h-8 w-8 bg-black text-[#92E3A9] flex items-center justify-center font-bold text-xs ring-4 ring-black/5">
                            {user.name?.charAt(0)}
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
