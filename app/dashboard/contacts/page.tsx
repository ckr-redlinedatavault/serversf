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
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Inbox,
    Clock,
    BookOpen,
    Search,
    RefreshCw,
    Filter,
    ArrowRight,
    CreditCard
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminContactsPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const isAuth = localStorage.getItem("forge_super_admin");
        if (isAuth !== "true") {
            router.push("/admin/login");
        }
        fetchContacts();
    }, [router]);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (data.success) {
                // Ensure data is mapped correctly based on the updated API response
                setContacts(data.contacts || []);
            }
        } catch (error) {
            console.error("Transmission Leak detected while fetching inquiry logs.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("forge_super_admin");
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, slug: "/dashboard" },
        { name: "Approvals", icon: ShieldCheck, slug: "/dashboard/approvals" },
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts", active: true },
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses" },
        { name: "Enrollments", icon: CreditCard, slug: "/dashboard/enrollments" },
    ];

    const filteredContacts = (contacts || []).filter(c => 
        (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full bg-[#080808] text-white flex font-sans selection:bg-[#92E3A9]/30">
            {/* Sidebar - Precision Engineering Look */}
            <aside className="w-64 flex flex-col bg-[#0A0A0A] h-screen fixed left-0 top-0 z-50 border-r border-white/5 shadow-2xl">
                <div className="p-8">
                    <div className="flex items-center gap-3 group">
                        <div className="h-10 w-10 bg-[#92E3A9] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-[0_0_20px_rgba(146,227,169,0.3)]">
                            <ShieldCheck className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-white tracking-tight leading-none">Forge Hub</span>
                            <span className="text-[9px] font-bold text-[#92E3A9] mt-1 uppercase tracking-[0.2em]">Super Admin</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.slug}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                                ${item.active
                                    ? 'bg-[#92E3A9]/10 text-[#92E3A9]'
                                    : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`
                            }
                        >
                            <item.icon className={`w-4 h-4 transition-colors ${item.active ? 'text-[#92E3A9]' : 'group-hover:text-[#92E3A9]'}`} />
                            <span className="text-xs font-semibold">{item.name}</span>
                            {item.active && <div className="absolute right-4 w-1 h-1 rounded-full bg-[#92E3A9] shadow-[0_0_8px_rgba(146,227,169,0.8)]" />}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full h-11 flex items-center justify-center gap-3 rounded-xl bg-zinc-900 text-zinc-400 hover:bg-red-500 hover:text-white transition-all duration-500 font-bold active:scale-[0.98] border border-white/5"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#92E3A9]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Inquiries" }]} />
                        <h1 className="text-4xl font-bold tracking-tight text-white mt-4">Inquiry Transmissions</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Manage incoming communication logs from the Forge network.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-[#92E3A9] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Sync logs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-56 bg-zinc-900 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-[11px] outline-none focus:border-[#92E3A9]/30 transition-all font-bold"
                            />
                        </div>
                        <button 
                            onClick={fetchContacts}
                            className="h-11 w-11 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-[#92E3A9] transition-all hover:border-[#92E3A9]/30"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="h-12 w-12 border-2 border-[#92E3A9]/20 border-t-[#92E3A9] rounded-full animate-spin" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Initializing Link...</span>
                    </div>
                ) : filteredContacts.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 py-20">
                        <div className="h-20 w-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                            <Inbox className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-[0.1em]">No transmissions detected</p>
                        <p className="text-[10px] text-zinc-700 mt-2">Check back later for incoming public logs.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 relative z-10">
                        {filteredContacts.map((contact) => (
                            <div 
                                key={contact.id} 
                                className={`bg-zinc-900/20 border transition-all duration-700 overflow-hidden group
                                    ${expandedId === contact.id ? 'border-[#92E3A9]/40 bg-zinc-900/40 rounded-[2rem]' : 'border-white/5 rounded-[1.5rem] hover:border-[#92E3A9]/20 hover:bg-zinc-900/30'}`
                                }
                            >
                                <div
                                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-500
                                            ${expandedId === contact.id ? 'bg-[#92E3A9] border-[#92E3A9] text-black shadow-[0_0_20px_rgba(146,227,169,0.3)]' : 'bg-zinc-900 border-white/5 text-zinc-600'}`
                                        }>
                                            <span className="font-bold text-sm tracking-tighter">
                                                {contact.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-[14px] font-bold text-white uppercase tracking-tight group-hover:text-[#92E3A9] transition-colors">{contact.name}</h3>
                                                <div className="px-2 py-0.5 bg-[#92E3A9]/10 rounded-full border border-[#92E3A9]/20">
                                                    <span className="text-[8px] font-bold text-[#92E3A9] uppercase tracking-widest">Incoming</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-[11px] font-medium text-zinc-500 truncate max-w-[200px] md:max-w-xs">{contact.subject}</p>
                                                <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-700">
                                                    <Clock size={12} />
                                                    {new Date(contact.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 self-end md:self-auto">
                                        <div className="hidden lg:flex flex-col items-end">
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Transmission Time</span>
                                            <span className="text-[11px] font-medium text-zinc-400">{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className={`h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-300 ${expandedId === contact.id ? 'bg-[#92E3A9]/10 text-[#92E3A9]' : 'bg-zinc-900/50 text-zinc-700'}`}>
                                            {expandedId === contact.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    </div>
                                </div>

                                {expandedId === contact.id && (
                                    <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-700">
                                        <div className="p-8 rounded-[1.5rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group/box">
                                            {/* Accent glow on expand */}
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#92E3A9]/30" />
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Sender Node</h4>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#92E3A9]">
                                                                <Mail size={14} />
                                                            </div>
                                                            <span className="text-[13px] font-bold text-white tracking-tight">{contact.email}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Subject Header</h4>
                                                        <p className="text-[13px] font-medium text-zinc-400 italic">"{contact.subject}"</p>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Transmission Payload</h4>
                                                    <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/5 text-[13px] text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
                                                        {contact.message}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="px-6 h-11 bg-[#92E3A9] text-black rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_15px_rgba(146,227,169,0.2)]"
                                                >
                                                    Open Relay (Reply) <ArrowRight size={14} />
                                                </a>
                                                <button
                                                    className="px-6 h-11 bg-white/5 text-zinc-400 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center border border-white/10 hover:text-white hover:bg-white/10 transition-all"
                                                >
                                                    Archive Transmission
                                                </button>
                                                <div className="ml-auto text-zinc-700 text-[9px] font-bold uppercase tracking-widest self-center italic">
                                                    Transmission Protocol: SECURED-LINK-SF
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
