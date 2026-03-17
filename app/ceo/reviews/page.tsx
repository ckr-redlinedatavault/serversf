"use client";

import { useEffect, useState } from "react";
import { Star, Activity, ChevronRight, Search, Clock, MapPin, MessageSquare } from "lucide-react";

export default function CEOReviews() {
    return (
        <div className="p-10 max-w-[1400px] mx-auto w-full">
            <div className="mb-12">
                <h1 className="text-3xl font-semibold mb-2">Public Context</h1>
                <p className="text-zinc-500 text-sm">Real-time sentiment and feedback analysis from the global ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MetricCard label="Global Rating" value="4.94" trend="+0.02%" />
                <MetricCard label="Total Feedback" value="382" trend="Verified" />
                <MetricCard label="Advocacy Ratio" value="98%" trend="Peak" />
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Latest Feedback</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                            <input type="text" placeholder="Search content..." className="bg-zinc-900 border border-zinc-800 rounded-full px-8 py-1.5 text-[10px] outline-none focus:border-[#92E3A9] w-48" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <ReviewItem user="Rohan K." team="Core Forge" review="The ecosystem has completely transformed our production speed. Zero friction." rating={5} time="2h ago" />
                    <ReviewItem user="Sarah J." team="DevOps Elite" review="Perfect implementation of the mailer system. Scaling was effortless." rating={5} time="5h ago" />
                    <ReviewItem user="David L." team="Web Masters" review="Support was instant when we hit a database bottleneck. 10/10." rating={4} time="Yesterday" />
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

function ReviewItem({ user, team, review, rating, time }: { user: string, team: string, review: string, rating: number, time: string }) {
    return (
        <div className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-[2rem] group hover:border-[#92E3A9]/30 transition-all">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-[#92E3A9]">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold">{user}</h4>
                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">{team}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < rating ? "text-[#92E3A9] fill-[#92E3A9]" : "text-zinc-800"} />
                    ))}
                    <span className="ml-4 text-[10px] text-zinc-600 font-bold uppercase">{time}</span>
                </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-medium italic">"{review}"</p>
        </div>
    );
}
