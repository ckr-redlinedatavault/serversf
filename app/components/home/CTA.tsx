"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#0055FF] py-12 lg:py-16 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-none translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-start text-left">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl leading-[1.1]"
          >
            Your Career <br className="hidden md:block" /> Starts Here 🚀
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg font-medium text-white/90 max-w-2xl"
          >
            Join thousands of students and engineers building the future.
            Unlock high-impact internships and global opportunities today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link
              href="/get-started"
              className="h-16 px-12 bg-black text-white text-[16px] font-semibold flex items-center justify-center gap-3 transition-all hover:bg-zinc-900 active:scale-[0.98] rounded-none"
            >
              Join Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/mentorship"
              className="h-16 px-12 border border-white/40 bg-white/10 backdrop-blur-sm text-white text-[16px] font-semibold flex items-center justify-center gap-3 transition-all hover:bg-white/20 active:scale-[0.98] rounded-none"
            >
              Book Free Mentorship
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
