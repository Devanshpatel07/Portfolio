import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
              01 — About Me
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-medium leading-tight mb-8">
              Turning complex ideas into <br />
              <span className="italic font-serif">elegant solutions.</span>
            </h2>
            <div className="w-20 h-1 bg-accent/30 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 text-base md:text-xl text-white/60 font-light leading-relaxed"
          >
            <p>
              Creative Developer and passionate B.Tech student with a strong interest in technology.
              Focused on blockchain development, software engineering, and innovative digital solutions.
            </p>

            <p>
              Enjoy building useful platforms and applications that solve real-world problems.
              Skilled in learning new technologies and adapting quickly to challenges.
              Dedicated to improving programming, communication, and teamwork skills every day.
              Interested in creating modern, user-friendly, and impactful digital experiences.
              Motivated to grow as a developer while exploring entrepreneurship and innovation.
              Always curious, creative, and ready to turn ideas into meaningful projects.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-8 pt-8">
              <div>
                <div className="text-xl md:text-2xl font-display font-bold text-white mb-2">10+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">Projects Completed</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-display font-bold text-white mb-2">2+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">Years Experience</div>
              </div>
            </div>

            <p className="pt-4 md:pt-8">
              When I'm not coding, you'll find me experimenting with new design tools,
              contributing to open-source projects, or exploring the latest in spatial computing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
