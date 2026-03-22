import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, ChevronRight, BookOpen } from "lucide-react";

export default function Resources() {
  const cards = [
    {
      title: "Core Engineering",
      subtitle: "Industry-standard engineering tracks designed for students.",
      href: "/courses",
      image: "https://ik.imagekit.io/dypkhqxip/Course%20app-rafiki.svg",
      tag: "Academy",
      rating: "5.0",
      enrolled: "1.2k+",
      instructor: "Staff"
    },
    {
      title: "Career Guidance",
      subtitle: "Global pathways for higher education and career development.",
      href: "/contact",
      image: "https://ik.imagekit.io/dypkhqxip/Study%20abroad-rafiki.svg",
      tag: "Support",
      rating: "4.9",
      enrolled: "800+",
      instructor: "Mentor"
    },
    {
      title: "Internships",
      subtitle: "Practical experience within our corporate ecosystem.",
      href: "/intern-form",
      image: "https://ik.imagekit.io/dypkhqxip/Job%20hunt-rafiki.svg",
      tag: "Professional",
      rating: "5.0",
      enrolled: "450+",
      instructor: "Staff"
    },
    {
      title: "Startup Lifecycle",
      subtitle: "Strategic network of mentors, startups, and innovation.",
      href: "/ecosystem",
      image: "https://ik.imagekit.io/dypkhqxip/Startup%20life-rafiki.svg",
      tag: "Ecosystem",
      rating: "4.8",
      enrolled: "120+",
      instructor: "Founder"
    }
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-white" id="resources">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Digital Assets</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1]">
              Explore Our <span className="text-[#0055FF]">Resources</span>
            </h2>
          </div>
          <p className="text-[15px] text-zinc-500 font-medium max-w-xs leading-relaxed">
            Navigate through our core offerings and accelerate your learning journey with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link 
                  href={card.href} 
                  className="group flex flex-col bg-white border border-zinc-100 transition-all hover:border-black active:scale-[0.99] h-full"
              >
                  <div className="aspect-[16/10] relative bg-zinc-50 flex items-center justify-center overflow-hidden border-b border-zinc-100">
                      <img src={card.image} alt={card.title} className="w-full h-full object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500" />
                      <div className="absolute top-4 left-4 border border-zinc-800 bg-black/80 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-widest">
                          {card.tag}
                      </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                              <Star className="w-3 h-3 text-[#0055FF] fill-current" />
                              <span className="text-zinc-900 font-bold">{card.rating}</span>
                          </div>
                          <div className="h-3 w-[1px] bg-zinc-100" />
                          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                              <Users className="w-3 h-3" />
                              <span>{card.enrolled} enrolled</span>
                          </div>
                      </div>
                      
                      <h3 className="text-[18px] font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors mb-2 leading-tight">
                          {card.title}
                      </h3>
                      <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed mb-8">
                          {card.subtitle}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100">
                          <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-400 uppercase">
                                  {card.instructor[0]}
                              </div>
                              <div>
                                  <p className="text-[11px] font-bold text-zinc-900 leading-none">{card.instructor}</p>
                                  <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Personnel</p>
                              </div>
                          </div>
                          <div className="text-[12px] font-bold text-zinc-900">
                              Access
                          </div>
                      </div>
                  </div>

                  {/* Enrollment Banner */}
                  <div className="h-12 w-full bg-black flex items-center justify-between px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity group-hover:bg-[#0055FF]">
                      <span>Check Details</span>
                      <ChevronRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                  </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}