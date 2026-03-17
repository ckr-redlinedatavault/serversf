"use client";

import { useEffect, useState } from "react";
import { User, Activity, ChevronRight, Search, Clock, ShieldCheck, Mail } from "lucide-react";

export default function CEOMediaTeam() {
    return (
        <div className="p-10 max-w-[1400px] mx-auto w-full">
            <div className="mb-12">
                <h1 className="text-3xl font-semibold mb-2">Media Team Hub</h1>
                <p className="text-zinc-500 text-sm">Direct management and operational review of the creative core.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MetricCard label="Active Agents" value="8" trend="Live" />
                <MetricCard label="Scripts Submitted" value="24" trend="Pending Review" />
                <MetricCard label="Task Success" value="94%" trend="Optimal" />
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Media Workforce</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Search agents..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <TeamItem name="Rohan Kalapala" role="Media Hub Operations" status="Active" join="Mar 17" />
                    <TeamItem name="Sarah Chen" role="Lead Production" status="Active" join="Mar 16" />
                    <TeamItem name="David Miller" role="Script Analysis" status="Offline" join="Mar 15" />
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, trend }: { label: string, value: string, trend: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-zinc-900 p-8 rounded-3xl">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{label}</p>
            <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-white">{value}</p>
                <span className="text-[10px] font-bold text-[#92E3A9] uppercase">{trend}</span>
            </div>
        </div>
    );
}

function TeamItem({ name, role, status, join }: { name: string, role: string, status: string, join: string }) {
    return (
        <div className="flex items-center justify-between p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl group hover:border-[#92E3A9]/30 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-[#92E3A9]">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-base font-bold text-white">{name}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">{role}</p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${status === 'Active' ? 'text-green-500' : 'text-zinc-600'}`}>{status}</p>
                    <p className="text-[10px] text-zinc-600 font-medium lowercase italic mt-1">Joined {join}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 border border-zinc-700 rounded-xl text-zinc-400 group-hover:text-[#92E3A9] group-hover:border-[#92E3A9]/30 transition-all">
                        <Mail className="w-4 h-4" />
                    </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
            </div>
        </div>
    );
}
