import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Sprout, TrendingUp, ShieldCheck, Zap, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 py-24 lg:py-40 min-h-screen flex items-center bg-[url('/assets/hero.png')] bg-cover bg-center">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
            <div className="hero-content">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 bg-secondary/90 text-white px-4 py-2 rounded-none font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[8px_8px_0_rgba(0,0,0,1)]">
                  <div className="w-2 h-2 bg-white animate-pulse" />
                  Solana Mainnet Live
                </div>
                
                <h1 className="text-[80px] md:text-[140px] text-white leading-[0.8] font-black tracking-[-0.06em] uppercase mb-8">
                  HARVEST <br />
                  <span className="text-secondary stroke-text">CAPITAL</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-xl leading-snug font-black uppercase italic tracking-tighter bg-foreground/10 p-4 border-l-8 border-secondary backdrop-blur-md">
                  Unlocking the value of your soil. Mint your crop harvest as an NFT and access instant liquidity on Solana.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-20">
                  <Link to="/farmer">
                    <Button size="lg" className="bg-secondary text-foreground hover:bg-white rounded-none h-20 px-12 text-xl font-black uppercase tracking-[0.1em] shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_rgba(0,0,0,1)]">
                      Start Farming →
                    </Button>
                  </Link>
                  <Link to="/lender">
                    <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-4 border-white text-white hover:bg-white hover:text-foreground rounded-none h-20 px-12 text-xl font-black uppercase tracking-[0.1em] shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all">
                      Lend USDC
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-12 pt-12 border-t-2 border-white/20">
                  <div className="stat-item">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Protocol TVL</h3>
                    <p className="text-4xl font-black text-white tracking-tighter">$14.2M+</p>
                  </div>
                  <div className="stat-item">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">NFTS MINTED</h3>
                    <p className="text-4xl font-black text-white tracking-tighter">8,420</p>
                  </div>
                  <div className="stat-item">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">CURRENT APY</h3>
                    <p className="text-4xl font-black text-secondary tracking-tighter">12.4%</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="hidden lg:block">
               {/* Aesthetic Side Content */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.4, duration: 1 }}
                 className="relative"
               >
                  <div className="w-full aspect-square border-8 border-white p-8 flex flex-col justify-end bg-gradient-to-br from-secondary/20 to-transparent">
                     <p className="text-[10px] font-black text-white/40 underline underline-offset-8 mb-8">SECURED BY LOVABLE ORACLE V2</p>
                     <p className="text-4xl font-black text-white uppercase leading-none mb-4 tracking-tighter">Your land, <br /> your rules, <br /> your credit.</p>
                     <div className="w-20 h-2 bg-secondary" />
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute top-[-40px] left-[-40px] w-24 h-24 bg-white/10 backdrop-blur-xl border-2 border-white/20 p-4 flex items-center justify-center animate-bounce">
                     <Zap className="text-secondary w-10 h-10" />
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-32 px-6 lg:px-20 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[20vw] font-black opacity-5 select-none pointer-events-none translate-x-1/2 -translate-y-1/2">AGRIFI</div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Why AgriFi Protocol?</span>
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
                ELIMINATE THE <br /> MIDDLEMAN.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
               <p className="text-white/40 font-black uppercase text-xs">Scroll to Explore Features</p>
               <div className="w-1 bg-secondary h-20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { 
                icon: Sprout, 
                title: "Crop NFTs", 
                desc: "Every farm is unique. We mint your crop data as a verifiable on-chain asset.",
                accent: "text-secondary"
              },
              { 
                icon: ShieldCheck, 
                title: "Decentralized", 
                desc: "No bank officials. No bribery. Just code and satellite verification.",
                accent: "text-white"
              },
              { 
                icon: Zap, 
                title: "Instant USDC", 
                desc: "Loans settle in seconds on Solana. Funds available for seeds immediately.",
                accent: "text-secondary"
              },
              { 
                icon: Coins, 
                title: "Competitive", 
                desc: "LTV up to 60% with rates that beat traditional money lenders by 10x.",
                accent: "text-white"
              }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white/5 border-2 border-white/10 p-10 hover:border-secondary transition-all"
              >
                <f.icon className={`w-12 h-12 mb-8 ${f.accent}`} />
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed uppercase text-[11px] tracking-wider">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-secondary text-foreground p-6 md:p-20 text-center">
         <h2 className="text-7xl md:text-10xl font-black uppercase tracking-tighter leading-none mb-12">
            JOIN THE <br /> HARVEST.
         </h2>
         <Link to="/farmer">
            <Button className="bg-foreground text-white rounded-none h-24 px-20 text-2xl font-black uppercase tracking-widest shadow-[16px_16px_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-4 hover:translate-y-4 transition-all">
              Launch App
            </Button>
         </Link>
      </section>
    </div>
  );
}
