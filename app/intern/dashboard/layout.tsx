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
    ShieldCheck
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
        { name: "Overview", icon: LayoutDashboard, slug: "/intern/dashboard" },
        { name: "Assignments", icon: Briefcase, slug: "/intern/dashboard?view=tasks" },
        { name: "Settings", icon: Settings, slug: "/intern/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 flex font-sans">
            {/* Blue Sidebar with Normal Font Case */}
            <aside className="w-20 lg:w-64 flex flex-col bg-[#0055FF] h-screen sticky top-0 z-50 text-white shadow-2xl">
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
                                className={`flex items-center justify-center lg:justify-start h-12 px-4 gap-4 rounded-xl transition-all ${
                                    isActive 
                                    ? "bg-white text-[#0055FF] shadow-lg shadow-black/10 font-semibold" 
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="hidden lg:block text-[14px]">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="w-full h-12 flex items-center justify-center lg:justify-start px-4 gap-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg shadow-black/10"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block text-[14px]">Terminate session</span>
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
                               <p className="text-[10px] text-zinc-400 font-medium mt-1">Global node active</p>
                            </div>
                            <div className="h-9 w-9 bg-[#0055FF] rounded-xl flex items-center justify-center text-white text-xs font-bold">
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
