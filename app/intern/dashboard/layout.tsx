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

                <nav className="flex-1 px-8 space-y-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.slug;
                        return (
                            <Link 
                                key={item.name}
                                href={item.slug} 
                                className={`block transition-all ${
                                    isActive 
                                    ? "text-[#92E3A9] font-bold" 
                                    : "text-zinc-500 hover:text-white font-medium"
                                }`}
                            >
                                <span className="text-[13px] uppercase tracking-widest">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-900 text-zinc-400 text-[10px] font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest"
                    >
                        <span>Logout Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Simplified Green Top Navigation Bar - No Icons */}
                <header className="h-14 bg-[#92E3A9] border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-black rounded-full" />
                        <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Verified Intern Session</span>
                    </div>

                    <div className="flex items-center pr-2">
                        <div className="text-right">
                            <p className="text-[11px] font-bold text-black leading-none">{user.name}</p>
                            <p className="text-[9px] font-bold text-black/50 uppercase tracking-widest mt-0.5">Global Node 1</p>
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
