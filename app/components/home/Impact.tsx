"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Layers, HeartPulse } from "lucide-react";

const stats = [
  {
    label: "Students Empowered",
    value: "1,200+",
    icon: <Users className="w-5 h-5 text-[#0055FF]" />,
    description: "Active learners growing their technical skills from all backgrounds."
  },
  {
    label: "Expert-Led Courses",
    value: "45+",
    icon: <BookOpen className="w-5 h-5 text-[#0055FF]" />,
    description: "Curated content designed by industry professionals for students."
  },
  {
    label: "Projects Completed",
    value: "850+",
    icon: <Layers className="w-5 h-5 text-[#0055FF]" />,
    description: "Real-world applications built by our community members."
  },
  {
    label: "Success Rate",
    value: "94%",
    icon: <HeartPulse className="w-5 h-5 text-[#0055FF]" />,
    description: "Students who successfully complete their certification."
  }
];

export default function Impact() {
  return (
    <section className="bg-white py-12 lg:py-16 relative overflow-hidden" id="impact">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Our Impact</span>
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
            Empowering the Next Generation
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-zinc-500 max-w-2xl font-medium">
            We are more than just a platform. We are a community dedicated to building 
            the future of engineering, one student at a time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-[#0055FF]/5 p-2.5 rounded-none flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-[13px] font-bold text-zinc-900 uppercase tracking-wide">{stat.label}</span>
              </div>
              
              <div className="mb-2">
                <span className="text-4xl font-normal tracking-tight text-zinc-900 lg:text-5xl">{stat.value}</span>
              </div>
              
              <p className="text-[13px] leading-relaxed text-zinc-500 font-medium">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Divider */}
        <div className="mt-16 border-t border-zinc-100 w-full" />
      </div>

      {/* Subtle Background Geometry */}
      <div className="absolute bottom-0 right-0 h-[200px] w-[200px] bg-[#0055FF] opacity-[0.015] pointer-events-none translate-x-1/4 translate-y-1/4" />
    </section>
  );
}
