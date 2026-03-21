"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Students", value: 1200, suffix: "+" },
  { label: "Courses", value: 45, suffix: "+" },
  { label: "Projects", value: 850, suffix: "+" },
  { label: "Success Rate", value: 94, suffix: "%" }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return (
    <span ref={ref} className="text-4xl font-normal tracking-tighter text-white lg:text-5xl tabular-nums">
      <motion.span>{displayValue}</motion.span>
      <span className="text-white/60 ml-0.5">{suffix}</span>
    </span>
  );
}

export default function Impact() {
  return (
    <section className="bg-[#0055FF] py-12 lg:py-16 relative overflow-hidden" id="impact">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Section Heading */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-6 bg-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Momentum</span>
                <div className="h-[1px] w-6 bg-white" />
            </div>
            <h2 className="text-3xl font-normal tracking-tighter text-white md:text-4xl">
              Our <span>impact</span> <span className="text-white/50 italic">captured</span> in numbers.
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-5xl">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative z-10 border border-white/20 bg-white/5 p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                  <div className="relative">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
