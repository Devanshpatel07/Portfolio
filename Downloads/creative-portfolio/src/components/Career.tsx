import { motion } from "motion/react";

const experiences = [
  {
    year: "2024 — 2025",
    company: "TechNova Solutions",
    role: "Aspiring Frontend Engineer",
    description: "Worked on creating responsive and user-friendly web interfaces using HTML, CSS, and JavaScript while improving UI/UX experiences for modern web applications."
  },
  {
    year: "2025 — 2026",
    company: "Creative Pulse Studio",
    role: "Blockchain Developer",
    description: "Developed modern Web3-based applications and interactive web experiences, focusing on blockchain integration and innovative frontend solutions."
  },
  {
    year: "2026 — Present",
    company: "Problem Solver",
    role: "FullStack Developer",
    description: "Building scalable full-stack platforms with modern frontend technologies and powerful backend systems while solving real-world development challenges."
  }
];

export default function Career() {
  return (
    <section id="career" className="py-24 md:py-40 bg-[#050505] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <div className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
              05 — Career Path
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-medium leading-tight">
              A journey of <br />
              <span className="text-white/20">constant growth.</span>
            </h2>
          </div>

          <div className="lg:w-2/3 space-y-12 md:space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                  <div className="text-white/30 font-display font-medium whitespace-nowrap pt-1 text-sm md:text-base">
                    {exp.year}
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-3xl font-display font-bold group-hover:text-accent transition-colors">
                      {exp.company}
                    </h3>
                    <div className="text-[10px] md:text-sm uppercase tracking-widest text-white/50 font-bold">
                      {exp.role}
                    </div>
                    <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
                {i < experiences.length - 1 && (
                  <div className="absolute -bottom-6 md:-bottom-12 lg:-bottom-24 left-0 w-full h-px bg-white/5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
