"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Activity, ChevronRight, Search, Clock } from "lucide-react";

export default function CEOCTOPerformance() {
    return (
        <div className="p-10 max-w-[1400px] mx-auto w-full">
            <div className="mb-12">
                <h1 className="text-3xl font-semibold mb-2">CTO Performance</h1>
                <p className="text-zinc-500 text-sm">Deep inspection of technical leadership and infrastructure scaling.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MetricCard label="Uptime Score" value="99.99%" trend="Nominal" />
                <MetricCard label="Tickets Resolved" value="142" trend="+8%" />
                <MetricCard label="API Latency" value="42ms" trend="Optimal" />
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Technical Operations</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Search logs..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <LogItem title="Core Database Migrated" time="2h ago" type="Success" />
                    <LogItem title="Supabase Storage Expansion" time="5h ago" type="Audit" />
                    <LogItem title="Security Handover Protocol" time="Yesterday" type="System" />
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

function LogItem({ title, time, type }: { title: string, time: string, type: string }) {
    return (
        <div className="flex items-center justify-between p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl group hover:border-[#92E3A9]/30 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#92E3A9]" />
                </div>
                <div>
                    <h4 className="text-sm font-bold">{title}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">{type}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-zinc-600 flex items-center gap-1.5 justify-end">
                        <Clock className="w-3 h-3" />
                        {time}
                    </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
            </div>
        </div>
    );
}
