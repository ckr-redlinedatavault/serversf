import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Added for button icon

export default function Resources() {
  const cards = [
    {
      title: "Courses",
      desc: "Industry-standard engineering tracks designed for students.",
      href: "/courses",
      image: "https://ik.imagekit.io/dypkhqxip/Course%20app-rafiki.svg"
    },
    {
      title: "Abroad Guidance", // Renamed for clarity
      desc: "Global pathways for higher education and career development.",
      href: "/aboard",
      image: "https://ik.imagekit.io/dypkhqxip/Study%20abroad-rafiki.svg" // Added a placeholder image
    },
    {
      title: "Internships",
      desc: "Practical experience within our corporate ecosystem.",
      href: "/internships",
      image: "https://ik.imagekit.io/dypkhqxip/Job%20hunt-rafiki.svg" // Added a placeholder image
    },
    {
      title: "Startup Ecosystem", // Renamed for clarity
      desc: "Strategic network of mentors, startups, and innovation.",
      href: "/ecosystem",
      image: "https://ik.imagekit.io/dypkhqxip/Startup%20life-rafiki.svg" // Added a placeholder image
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 bg-gray-50"> {/* Reduced padding */}
      {/* Slanted Separator - This creates the visual break *below* the section */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-white transform -skew-y-2 origin-bottom-left"
        style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 0 }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-full h-32 bg-white transform skew-y-2 origin-bottom-right"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)', zIndex: 0 }}
      ></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="mb-12 text-center"> {/* Reduced margin */}
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl mb-4 leading-tight">
            Explore Our <span className="text-[#0055FF]">Resources</span>
          </h2>
          <p className="text-base text-gray-600 font-medium max-w-xl mx-auto">
            Navigate through our core offerings and accelerate your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className="group relative overflow-hidden flex flex-col h-full bg-white border border-gray-200 rounded-none p-8 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300"
              >
                {/* Illustration Container - Sharp Edged */}
                <div className={`h-48 w-full bg-gray-100 rounded-none mb-8 flex items-center justify-center overflow-hidden relative`}>
                  {card.image ? (
                    <img src={card.image} alt={card.title} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-2 w-12 bg-gray-300 rounded-full animate-pulse" />
                      <p className="text-xs font-semibold text-gray-400 capitalize tracking-widest relative z-10">Coming Soon</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium mb-8">
                    {card.desc}
                  </p>
                </div>

                {/* Sharp Edged Blue Button */}
                <Link
                  href={card.href}
                  className="w-full h-12 bg-[#0055FF] text-white text-base font-semibold flex items-center justify-center rounded-none transition-all hover:bg-blue-700 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Details <ArrowRight size={18} />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}