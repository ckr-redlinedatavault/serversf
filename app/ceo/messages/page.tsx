"use client";

import { useEffect, useState } from "react";
import { Mail, Activity, ChevronRight, Search, Clock, MapPin, MessageSquare, ShieldAlert } from "lucide-react";

export default function CEOMessages() {
    return (
        <div className="p-10 max-w-[1400px] mx-auto w-full">
            <div className="mb-12">
                <h1 className="text-3xl font-semibold mb-2">Global Communications</h1>
                <p className="text-zinc-500 text-sm">Direct inbox for student support and platform enquiries.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MetricCard label="Open Messages" value="12" trend="+3 New" />
                <MetricCard label="Avg Response" value="1.2h" trend="Fast" />
                <MetricCard label="Resolved" value="142" trend="All time" />
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Inbox Matrix</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Search emails..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <MessageItem sender="Alice Johnson" subject="Program Inquiry" preview="I'm interested in the DevOps Core backend forge, but I have a few questions about..." time="45m ago" status="New" />
                    <MessageItem sender="Bob Smith" subject="Technical Support" preview="We're hitting some issues with the mailer personalization tags. Our tags are..." time="3h ago" status="Responded" />
                    <MessageItem sender="Charlie Brown" subject="Partnership Proposal" preview="On behalf of the Servers team, I'd like to propose a collaborative workshop for..." time="Yesterday" status="Pending" />
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

function MessageItem({ sender, subject, preview, time, status }: { sender: string, subject: string, preview: string, time: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl group hover:border-[#92E3A9]/30 transition-all border-l-2 border-l-transparent hover:border-l-[#92E3A9]">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#92E3A9]" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{sender}</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{subject}</p>
                </div>
            </div>
            <div className="flex-1 px-10 hidden lg:block">
                <p className="text-[10px] text-zinc-500 line-clamp-1 italic font-medium">"{preview}"</p>
            </div>
            <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${status === 'New' ? 'text-[#92E3A9]' : 'text-zinc-600'}`}>{status}</p>
                    <p className="text-[10px] text-zinc-600 font-bold mt-1 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" strokeWidth={3} />
                        {time}
                    </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
            </div>
        </div>
    );
}
