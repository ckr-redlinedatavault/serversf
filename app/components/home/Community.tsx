"use client";

import { motion } from "framer-motion";
import { Users, MessagesSquare, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Community() {
  return (
    <section className="bg-white py-12 lg:py-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#fafafa_100%)]" id="community">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-20">
          
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-2 mb-6"
            >
              <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Global Ecosystem</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 leading-[1.1]"
            >
              Where student leaders meet <span className="text-zinc-400 italic font-normal">the future.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 text-[15px] leading-relaxed text-zinc-500 max-w-lg font-medium"
            >
              Don't just learn alone. Join a global network of ambitious builders, creators, and innovators. 
              From deep-tech discussions to career networking, the forge starts here.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link href="/community" className="group h-14 px-8 bg-black text-white text-[12px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#0055FF] transition-all">
                Explore Community <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="h-14 px-8 border border-zinc-200 text-black text-[12px] font-bold uppercase tracking-widest hover:border-black transition-all">
                Join Discord
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:max-w-md pb-2"
          >
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 transition-all group">
                 <div className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0055FF]">
                    <Users className="w-4 h-4" />
                 </div>
                 <h3 className="text-[11px] font-bold uppercase tracking-widest mb-1">Chapters</h3>
                 <p className="text-2xl font-medium tracking-tight">120+ Regions</p>
               </div>
               
               <div className="p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 transition-all group">
                 <div className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0055FF]">
                    <MessagesSquare className="w-4 h-4" />
                 </div>
                 <h3 className="text-[11px] font-bold uppercase tracking-widest mb-1">Weekly Events</h3>
                 <p className="text-2xl font-medium tracking-tight">45+ Sessions</p>
               </div>
               
               <div className="sm:col-span-2 p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 transition-all group flex items-center justify-between">
                 <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest mb-1">Active Forum</h3>
                    <p className="text-2xl font-medium tracking-tight">10k+ Threads</p>
                 </div>
                 <div className="h-12 w-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                 </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
