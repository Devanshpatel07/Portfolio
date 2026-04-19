import { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { SolanaProvider } from '@/components/SolanaProvider';
import LandingPage from '@/pages/LandingPage';
import FarmerOnboarding from '@/pages/FarmerOnboarding';
import CropRegistration from '@/pages/CropRegistration';
import LenderPool from '@/pages/LenderPool';
import FarmerDashboard from '@/pages/FarmerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import '@/i18n/config';

function Navigation() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const langs = ['en', 'hi', 'pa'];
    const current = i18n.language;
    const next = langs[(langs.indexOf(current) + 1) % langs.length];
    i18n.changeLanguage(next);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-background border-b-8 border-foreground/5 h-24 flex items-center px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1 text-3xl font-black tracking-tighter uppercase italic">
          <span className="text-secondary">Agri</span>
          <span className="text-white">Fi</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 mr-8">
                {['Farmer', 'Lender', 'Admin'].map(item => (
                    <Link key={item} to={`/${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-secondary transition-colors">
                        {item} Portal
                    </Link>
                ))}
            </div>
            <div className="h-10 w-[2px] bg-white/10" />
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="rounded-none border-2 border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all">
                <Globe className="w-5 h-5" />
                <span className="ml-1 text-[10px] uppercase font-black">{i18n.language}</span>
            </Button>
            <WalletMultiButton />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white border-2 border-white/10 rounded-none bg-white/5">
              {isOpen ? <X /> : <Menu />}
            </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 0.98, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-background z-[110] flex flex-col p-12 gap-8"
          >
            <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-4xl font-black tracking-tighter uppercase italic">
                    <span className="text-secondary">Agri</span>Fi
                </Link>
                <Button onClick={() => setIsOpen(false)} className="h-12 w-12 rounded-none bg-secondary text-black"><X/></Button>
            </div>
            {['Farmer', 'Farmer/Dashboard', 'Lender', 'Admin'].map(item => (
                <Link key={item} to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase tracking-tighter border-b-4 border-foreground/5 pb-4 hover:text-secondary">
                    {item.split('/')[0]}
                </Link>
            ))}
            <div className="mt-auto space-y-6">
                <Button onClick={toggleLanguage} className="h-20 w-full bg-white/5 border-4 border-white text-2xl font-black uppercase tracking-widest">{i18n.language} Mode</Button>
                <WalletMultiButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  return (
    <SolanaProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Suspense fallback={<div className="flex items-center justify-center h-screen font-display text-4xl animate-pulse">BOOTING AGRIFI PROTOCOL...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/farmer" element={<FarmerOnboarding />} />
                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                <Route path="/crop-registration" element={<CropRegistration />} />
                <Route path="/lender" element={<LenderPool />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="py-24 bg-foreground text-white border-t-8 border-foreground">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-6">
                <Link to="/" className="text-4xl font-black tracking-tighter uppercase italic">
                    <span className="text-secondary">Agri</span>Fi
                </Link>
                <p className="max-w-md text-white/40 font-black uppercase text-xs tracking-widest leading-relaxed">
                    A decentralized crop-backed liquidity protocol. <br/> Built for transparency. Built for Solana.
                </p>
                <div className="flex gap-6 mt-12 opacity-40">
                    {['X', 'Discord', 'Github', 'Explorer'].map(l => (
                        <a key={l} href="#" className="font-black uppercase text-[10px] tracking-widest underline">{l}</a>
                    ))}
                </div>
              </div>
              <p className="font-black uppercase text-[10px] tracking-[0.4em] opacity-20">© 2026 AGRIFI PROTOCOL • MAINNET DEPLOYED</p>
            </div>
          </footer>
        </div>
      </Router>
    </SolanaProvider>
  );
}
