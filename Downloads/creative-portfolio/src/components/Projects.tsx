import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import React from "react";
import { projects } from "../main";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
    >
      <div
        className="flex-1 w-full perspective-1000 hidden md:block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 shadow-2xl"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            src={project.image}
            alt={project.title}
            className="w-full aspect-[16/10] object-cover"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center gap-6"
            style={{ translateZ: 50 }}
          >
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-4 rounded-full text-black transition-transform cursor-pointer"
            >
              <ExternalLink size={24} />
            </motion.a>
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-4 rounded-full text-black transition-transform cursor-pointer"
            >
              <Github size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Thumbnail (Simplified) */}
      <div className="flex-1 w-full block md:hidden rounded-2xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[16/10] object-cover"
        />
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-accent" />
          <span className="text-accent text-sm font-bold uppercase tracking-widest">{project.category}</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-display font-medium">
          {project.title}
        </h3>
        <p className="text-white/50 text-lg leading-relaxed">
          {project.description || "A comprehensive solution designed to handle scale and performance while maintaining a boutique feel. Focused on high conversion rates and seamless user interaction."}
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 border border-white/10 rounded-full text-xs font-medium bg-white/5 text-white/70 hover:text-accent hover:border-accent/50 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-6 pt-4">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest">
            <ExternalLink size={18} /> Live Demo
          </a>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
            <Github size={18} /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-40 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <div className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">
              03 — Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-medium">Selected Works</h2>
          </div>
          <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all">
            See All Projects
          </button>
        </div>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
