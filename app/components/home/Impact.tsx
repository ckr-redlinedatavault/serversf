import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Students", value: 1000, suffix: "+" },
  { label: "Internships", value: 100, suffix: "+" },
  { label: "Colleges", value: 20, suffix: "+" },
  { label: "Events", value: 50, suffix: "+" }
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
    <span ref={ref} className="text-4xl font-medium tracking-tight text-white lg:text-5xl tabular-nums">
      <motion.span>{displayValue}</motion.span>
      <span className="text-white/70 ml-1">{suffix}</span>
    </span>
  );
}

export default function Impact() {
  return (
    <section className="relative overflow-hidden bg-[#0055FF]" id="impact">
      <div className="mx-auto max-w-7xl relative z-10 px-6 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center pt-20 mb-12">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-2 mb-6"
           >
             <div className="h-1.5 w-1.5 bg-white rounded-none" />
             <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">Global Reach</span>
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             viewport={{ once: true }}
             className="text-4xl font-semibold tracking-tight text-white lg:text-6xl"
           >
             Our Impact
           </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch pb-20">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative group p-12 lg:p-16 flex flex-col items-center justify-center text-center">
              {/* Slanted Divider (Full Height) */}
              {index < stats.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-[1px] bg-white/20 transform -skew-x-[15deg] origin-center translate-x-1/2" />
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-[14px] font-medium text-white/70 capitalize tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}