import { motion } from "motion/react";
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

const EMAIL = "pateldevansh453@gmail.com";

const socials = [
  {
    name: "LinkedIn",
    handle: "@devansh-patel",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/devansh-patel-50ba3732a/",
    color: "#0A66C2",
  },
  {
    name: "GitHub",
    handle: "@DevanshPatel07",
    icon: Github,
    href: "https://github.com/DevanshPatel07",
    color: "#e2e8f0",
  },
];

function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white text-[10px] uppercase tracking-widest font-bold"
    >
      {copied ? (
        <Check size={11} className="text-green-400" />
      ) : (
        <Copy size={11} />
      )}
      {copied ? "Copied!" : "Copy"}
    </motion.button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 bg-[#050505] overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(10,102,194,0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.35em]">
              Contact
            </span>
            <span className="h-px w-8 bg-accent" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-center mb-20"
          >
            <h2 className="font-display font-black uppercase leading-[0.88] tracking-tighter text-center">
              <span className="block text-6xl md:text-[7rem] text-white">
                Let's Build
              </span>
              <span
                className="block text-6xl md:text-[7rem]"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
                  color: "transparent",
                }}
              >
                Something
              </span>
              <span className="block text-6xl md:text-[7rem] text-accent">
                Great.
              </span>
            </h2>
          </motion.div>

          {/* Email CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mb-5"
          >
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.998 }}
              className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-12 py-8 md:py-10 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-white/[0.055] transition-all duration-500 overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 38%, rgba(200,255,0,0.05) 50%, transparent 62%)",
                }}
              />

              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">
                    Send a message
                  </p>
                  <p className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300 break-all">
                    {EMAIL}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <CopyButton />
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28 + i * 0.1 }}
                whileHover={{ y: -3 }}
                className="group flex-1 flex items-center gap-4 px-6 py-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden"
              >
                {/* Left color bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl"
                  style={{ background: social.color }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: `${social.color}18`,
                    border: `1px solid ${social.color}35`,
                  }}
                >
                  <social.icon size={20} style={{ color: social.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-0.5">
                    {social.name}
                  </p>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200 truncate">
                    {social.handle}
                  </p>
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                />
              </motion.a>
            ))}
          </div>

          {/* Footer bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/[0.06]"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold">
              © {new Date().getFullYear()} Devansh Patel
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold">
              Designed & Built with ♥
            </p>
          </motion.div>

        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
