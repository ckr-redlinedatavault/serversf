"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#0055FF] py-12 lg:py-20 relative overflow-hidden">
      {/* Decorative Blur and Texture */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute inset-0 bg-black/5 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-center text-center">
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-4xl leading-[1.1]"
            >
                Ready to forge <br className="hidden md:block" /> your future?
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6 text-lg font-medium text-white/80 max-w-xl"
            >
                Join thousands of students building the next generation of 
                engineering. Start your journey with Student Forge today.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
                <Link href="/courses" className="h-16 px-12 bg-white text-black text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-black hover:text-white">
                    Get Started Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/support" className="h-16 px-12 border border-white/40 text-white text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-white/10">
                    Contact Sales
                </Link>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
