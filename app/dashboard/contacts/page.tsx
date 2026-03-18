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
    BookOpen
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function AdminContactsPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem("forge_super_admin");
        if (isAuth !== "true") {
            router.push("/admin/login");
        }
        fetchContacts();
    }, [router]);

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (data.success) {
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Failed to fetch contacts");
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
        { name: "Students", icon: Users, slug: "/dashboard" },
        { name: "Events", icon: Calendar, slug: "/events" },
        { name: "Mailer", icon: Mail, slug: "/mailer" },
        { name: "Reviews", icon: Star, slug: "/dashboard/reviews" },
        { name: "Contacts", icon: Inbox, slug: "/dashboard/contacts", active: true },
        { name: "Courses", icon: BookOpen, slug: "/dashboard/courses" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-[#92E3A9] h-screen fixed left-0 top-0 z-50 border-r border-black/5">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#92E3A9]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-zinc-900 tracking-tight leading-none">Admin Panel</span>
                            <span className="text-[10px] font-semibold text-zinc-900/60 uppercase tracking-widest mt-1">Maintenance</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.slug}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                                ${item.active
                                    ? 'bg-zinc-900 text-white shadow-xl'
                                    : 'text-zinc-900/70 hover:bg-zinc-900/10 hover:text-zinc-900'}`
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs font-semibold">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all font-bold shadow-xl shadow-red-500/10 active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Logout</span>
                    </button>
                    <div className="mt-4 p-4 rounded-xl bg-zinc-900 text-white border border-white/5 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        System Live
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen flex flex-col">
                <div className="mb-12">
                    <Breadcrumbs items={[{ label: "Admin", href: "/dashboard" }, { label: "Inquiries" }]} />
                    <h1 className="text-4xl font-bold tracking-tight text-white mt-4">Direct Inquiries</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage incoming transmissions from the public contact relay.</p>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center text-zinc-500 font-medium animate-pulse">
                        Scanning transmission logs...
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                        <Inbox className="w-12 h-12 mb-4 opacity-10" />
                        <p className="font-medium text-sm">No inquiries found.</p>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-5xl">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] overflow-hidden hover:border-[#92E3A9]/20 transition-all duration-500 group">
                                <div
                                    className="p-8 cursor-pointer flex items-center justify-between gap-6"
                                    onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                >
                                    <div className="flex-1 flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-[#92E3A9] font-bold text-lg group-hover:scale-110 transition-all duration-500">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{contact.name}</h3>
                                                <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-white/5">INCOMING</span>
                                            </div>
                                            <p className="text-zinc-400 text-sm font-medium mb-1">Subject: <span className="text-white">{contact.subject}</span></p>
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                                <Clock className="w-3 h-3" />
                                                {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-4">
                                        <div className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 ${expandedId === contact.id ? 'bg-[#92E3A9] text-black' : 'bg-zinc-900 text-zinc-600'}`}>
                                            {expandedId === contact.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </div>
                                </div>

                                {expandedId === contact.id && (
                                    <div className="px-8 pb-8 pt-2 border-t border-zinc-900 animate-in fade-in slide-in-from-top-2 duration-500">
                                        <div className="mt-6 p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                                            <div className="mb-6">
                                                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Sender Payload</h4>
                                                <p className="text-[#92E3A9] font-bold text-sm tracking-tight">{contact.email}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Transmission Detail</h4>
                                                <p className="text-sm text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap italic">
                                                    "{contact.message}"
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-3">
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="px-6 h-12 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:bg-[#92E3A9] transition-all"
                                            >
                                                Open Relay (Reply)
                                            </a>
                                            <button
                                                className="px-6 h-12 bg-zinc-900 text-zinc-500 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center border border-white/5 hover:text-white transition-all"
                                            >
                                                Archive Transmission
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
