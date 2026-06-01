import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import Experience from "./Experience";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Scene */}
      <Experience />

      <motion.div
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block px-4 py-1.5 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
            Available for new projects
          </span>
        </motion.div>

        <h1 className="text-[clamp(2.5rem,15vw,10rem)] leading-[0.9] font-display font-black uppercase tracking-tighter mb-8 text-balance">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block"
          >
            Creative
          </motion.span>
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block text-accent"
          >
            Developer
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base md:text-xl text-white/50 font-light leading-relaxed mb-10 md:mb-12"
        >
          Skilled in building modern, user-friendly digital experiences.
          Focused on solving real-world problems through creative solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-accent text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform">
            View Projects
          </button>
          <button className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all">
            Get In Touch
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
}
