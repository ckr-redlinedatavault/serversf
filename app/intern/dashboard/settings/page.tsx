"use client";

import { useEffect, useState } from "react";
import { Lock, Bell, Moon, Globe, ShieldAlert, Monitor } from "lucide-react";

export default function InternSettings() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("intern_user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    if (!user) return null;

    return (
        <div className="p-12 md:p-24 max-w-5xl mx-auto">
            <div className="space-y-16">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-black leading-none">Settings Configuration</h1>
                    <p className="text-zinc-400 text-lg font-medium leading-relaxed">Customize your intern workspace and security preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="col-span-1 space-y-4">
                        <h3 className="text-[12px] font-bold text-black uppercase tracking-[0.2em]">Workspace Customization</h3>
                        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">Adjust your global environment settings and node synchronization.</p>
                    </div>

                    <div className="col-span-2 space-y-4">
                        {[
                            { label: "Interface Language", value: "English (US)", icon: Globe },
                            { label: "Notification Channels", value: "Email, Browser", icon: Bell },
                            { label: "Theme Preset", value: "Modern Light", icon: Moon },
                            { label: "Display Resolution", value: "Native / High", icon: Monitor },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white border border-zinc-100 hover:border-[#92E3A9] transition-all group group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-black transition-colors">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-zinc-600 group-hover:text-black transition-colors">{item.label}</span>
                                </div>
                                <span className="text-[11px] font-bold text-[#92E3A9] uppercase tracking-widest">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-zinc-100 mt-16 pb-16">
                    <div className="col-span-1 space-y-4">
                        <h3 className="text-[12px] font-bold text-black uppercase tracking-[0.2em]">Privacy & Security</h3>
                        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">Update password and manage your active security sessions.</p>
                    </div>

                    <div className="col-span-2 space-y-6">
                        <div className="p-8 bg-black text-white space-y-10 group relative transition-all overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#92E3A9]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-[#92E3A9]/10 flex items-center justify-center text-[#92E3A9]">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold tracking-tight">Credential Security</h4>
                                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">Last changed: March 20, 2026</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <button className="h-12 flex-1 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#92E3A9] transition-all">Update Password</button>
                                <button className="h-12 flex-1 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:border-white/30 transition-all">Two-Factor Setup</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-6 bg-red-50/10 border border-red-500/10 text-red-500 rounded-lg group hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                            <ShieldAlert size={18} />
                            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">Deactivate Professional Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
