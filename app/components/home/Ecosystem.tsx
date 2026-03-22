import { Rocket, Users, Globe, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Ecosystem() {
  const offerings = [
    {
      title: "Startup Support",
      desc: "Get initial funding, legal aid, and technical resources to launch your venture.",
      icon: <Rocket className="text-orange-600" />,
      href: "/startup",
      color: "bg-orange-50"
    },
    {
      title: "1-on-1 Mentorship",
      desc: "Connect with industry leaders from top tech companies for career guidance.",
      icon: <Users className="text-blue-600" />,
      href: "/mentorship",
      color: "bg-blue-50"
    },
    {
      title: "Global Community",
      desc: "Join a network of 10k+ students and professionals across 20+ countries.",
      icon: <Globe className="text-green-600" />,
      href: "/community",
      color: "bg-green-50"
    },
    {
      title: "Global Ops",
      desc: "Access exclusive internship and job opportunities across the world.",
      icon: <Lightbulb className="text-purple-600" />,
      href: "/aboard",
      color: "bg-purple-50"
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 leading-tight">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-[#0F172A] md:text-4xl mb-4">
              Beyond Learning – <span className="text-[#0055FF]">We Support You</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              We go beyond just providing courses. Our ecosystem is built to ensure you succeed in every step of your career.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerings.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link 
                href={item.href}
                className="p-10 rounded-none group flex flex-col md:flex-row gap-8 bg-white border border-zinc-200 h-full hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className={`h-20 w-20 ${item.color} flex-shrink-0 flex items-center justify-center rounded-none group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{item.title}</h3>
                  <p className="text-[15px] text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-600 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
