"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-[#0055FF] py-6 lg:py-10">
      {/* Decorative Blur and Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="mx-auto max-w-5xl px-6 lg:px-10 relative z-10 text-center">
        {/* Quote Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="mb-4 flex justify-center"
        >
          <div className="bg-white/10 p-5 rounded-full backdrop-blur-sm border border-white/20">
            <Quote className="text-white w-8 h-8 rotate-180" />
          </div>
        </motion.div>

        {/* The Quote */}
        <motion.blockquote
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-lg font-normal leading-tight tracking-tight text-white md:text-xl lg:text-2xl lg:leading-[1.1]">
            "Programs must be written for people to read, and only incidentally for machines to execute."
          </p>
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-col items-center gap-2"
          >
            <div className="h-px w-12 bg-white/30" />
            <cite className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/70 not-italic">
              Harold Abelson
            </cite>
          </motion.footer>
        </motion.blockquote>
      </div>

      {/* Background Animated Scroller for "Student Forge" text (Subtle) */}
      <div className="absolute bottom-10 left-0 w-full opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-9xl font-black text-white px-10"
        >
          STUDENT FORGE ACADEMY STUDENT FORGE ACADEMY STUDENT FORGE ACADEMY
        </motion.div>
      </div>
    </section>
  );
}
