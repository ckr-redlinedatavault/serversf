"use client";

import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, Calendar, MapPin, Briefcase } from "lucide-react";

export default function InternProfile() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("intern_user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    if (!user) return null;

    return (
        <div className="p-12 md:p-24 max-w-5xl mx-auto">
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-100">
                    <div className="flex items-center gap-6">
                        <div className="h-24 w-24 bg-black text-[#92E3A9] flex items-center justify-center text-3xl font-bold">
                            {user.name?.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
                            <p className="text-zinc-400 font-medium">Intern Candidate • ID: {user.id?.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                    <button className="bg-black text-white px-8 py-3 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-zinc-600">
                                    <Mail size={18} className="text-[#92E3A9]" />
                                    <span className="text-sm font-medium">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-zinc-600">
                                    <MapPin size={18} className="text-[#92E3A9]" />
                                    <span className="text-sm font-medium">Sydney, Australia (Remote Node)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Professional Status</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-zinc-600">
                                    <Briefcase size={18} className="text-[#92E3A9]" />
                                    <span className="text-sm font-medium">Incoming Engineering Intern</span>
                                </div>
                                <div className="flex items-center gap-4 text-zinc-600">
                                    <Calendar size={18} className="text-[#92E3A9]" />
                                    <span className="text-sm font-medium">Member since March 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black p-8 text-white space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-[#92E3A9] flex items-center justify-center">
                                <ShieldCheck className="text-black" size={20} />
                            </div>
                            <h4 className="font-bold tracking-tight">Security Audit</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10 text-[12px]">
                                <span className="text-zinc-500 font-medium uppercase tracking-widest">Verification</span>
                                <span className="text-[#92E3A9] font-bold">ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10 text-[12px]">
                                <span className="text-zinc-500 font-medium uppercase tracking-widest">Two-Factor</span>
                                <span className="text-zinc-400 font-bold italic">Disabled</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-zinc-500 font-medium uppercase tracking-widest">Access Tier</span>
                                <span className="text-white font-bold">BASIC</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">
                            Your identity has been verified against our global security protocols. Keep your credentials confidential.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
