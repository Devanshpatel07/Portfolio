export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xl font-display font-bold tracking-tighter">
            Devansh Patel<span className="text-accent">.</span>
          </div>

          <div className="text-white/30 text-xs uppercase tracking-widest font-medium">
            © {currentYear} Devansh Patel — Built with Passion
          </div>

          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
