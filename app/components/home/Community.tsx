"use client";

import { motion } from "framer-motion";
import { Users, MessagesSquare, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Community() {
  return (
    <section className="bg-white py-12 lg:py-16 relative overflow-hidden" id="community">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <div className="max-w-lg"> {/* Reduced content size */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-2 mb-6"
            >
              <div className="h-1.5 w-1.5 bg-[#0055FF] rounded-none" />
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Global Ecosystem</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1]"
            >
              Where student leaders meet <span className="text-zinc-400">the future.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 text-[15px] leading-relaxed text-zinc-500 font-medium"
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
              <Link href="/community" className="group h-14 px-8 bg-[#0055FF] text-white text-[14px] font-semibold flex items-center gap-3 hover:bg-blue-700 transition-all rounded-none">
                Explore Community <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="https://discord.gg/9ZAnhkXD" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 border border-zinc-200 text-black text-[14px] font-semibold hover:border-black transition-all rounded-none flex items-center justify-center gap-3"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0775.0095c.1201.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.0683.0683 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
                Join Discord
              </Link>
              <Link 
                href="https://chat.whatsapp.com/BnSL7MfVELqF5ggbQ7yPtd?mode=gi_t" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-14 px-8 border border-zinc-200 text-black text-[14px] font-semibold hover:border-[#25D366] hover:text-[#25D366] transition-all rounded-none flex items-center justify-center gap-3"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join WhatsApp
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Illustration - Larger and Fully Visible */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:max-w-2xl flex justify-center lg:justify-end"
          >
             <div className="relative w-full aspect-[4/3] h-full flex items-center justify-center">
                <img 
                  src="https://ik.imagekit.io/dypkhqxip/Group%20discussion-rafiki.svg" 
                  alt="Community Illustration" 
                  className="w-full h-full object-contain scale-110 md:scale-125"
                />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
