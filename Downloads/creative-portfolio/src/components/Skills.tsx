import { motion } from "motion/react";

const skills = [
  "React", "TypeScript", "Three.js", "Java", "Javascript", "Blockchain",
  "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "AWS"
];

const Row = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
  <div className="flex overflow-hidden py-2 md:py-4 border-y border-white/5 bg-[#080808]">
    <motion.div
      animate={{ x: reverse ? [-1000, 0] : [0, -1000] }}
      transition={{
        repeat: Infinity,
        duration: 30,
        ease: "linear"
      }}
      className="flex whitespace-nowrap"
    >
      {[...items, ...items, ...items].map((item, index) => (
        <div
          key={index}
          className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter px-6 md:px-12 text-white/10 hover:text-accent transition-all duration-300 transform hover:scale-110 cursor-default flex items-center"
        >
          <span className="mr-3 md:mr-6 text-accent opacity-20">•</span>
          {item}
        </div>
      ))}
    </motion.div>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 mb-16 md:mb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="flex-1">
            <div className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
              02 — My Toolkit
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-medium">Modern Tech Stack</h2>
          </div>
          <div className="flex-1 md:flex md:justify-end">
            <p className="max-w-md text-white/40 text-base md:text-xl font-light">
              I specialize in high-performance rendering and immersive UI logic, bridging the gap between design and engineering.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Row items={skills} />
        <Row items={[...skills].reverse()} reverse />
      </div>

      <div className="container mx-auto px-6 mt-24 md:mt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {skills.slice(0, 8).map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className="bg-[#0a0a0a] border border-white/5 p-5 md:p-8 aspect-square flex flex-col justify-between hover:border-accent/30 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4 text-[40px] md:text-[60px] font-black text-white/[0.02] -mr-4 -mt-4 transition-all group-hover:text-accent/5">
                {i + 1}
              </div>
              <div className="text-accent/50 text-[10px] md:text-xs font-bold uppercase tracking-widest relative z-10">Expertise</div>
              <div className="text-lg md:text-2xl font-display font-bold relative z-10 group-hover:text-accent transition-colors">{skill}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
