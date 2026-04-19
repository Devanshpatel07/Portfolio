import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAgriFi } from '@/hooks/useAgriFi';
import { motion } from 'motion/react';
import { 
  Sprout, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FarmerDashboard() {
  const { state } = useLocation();
  const { getMyNFTs, getMyLoans, walletAddress, connected } = useAgriFi();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected) {
      const fetchData = async () => {
        setLoading(true);
        const [userNfts, userLoans] = await Promise.all([
          getMyNFTs(),
          getMyLoans()
        ]);
        setNfts(userNfts);
        setLoans(userLoans);
        setLoading(false);
      };
      fetchData();
    }
  }, [connected, getMyNFTs, getMyLoans]);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center space-y-8 max-w-sm">
           <div className="w-24 h-24 bg-secondary mx-auto flex items-center justify-center border-4 border-white shadow-[8px_8px_0_rgba(255,255,255,0.1)]">
              <Wallet className="w-12 h-12 text-foreground" />
           </div>
           <h1 className="text-4xl font-black uppercase tracking-tighter">Connect Wallet to <br/> Access Dashboard</h1>
           <p className="text-white/40 uppercase font-bold text-[10px] tracking-widest">Your data is stored on-chain and linked to your Solana address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-8 border-foreground/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-secondary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Authenticated: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</span>
            </div>
            <h1 className="text-[60px] md:text-[80px] font-black text-foreground tracking-[-0.06em] leading-[0.8] uppercase">
              FARMER <br />
              <span className="text-secondary stroke-text">PROTOCOLS</span>
            </h1>
          </div>
          <div className="flex gap-4">
             <Button className="h-20 px-10 rounded-none bg-foreground text-white border-4 border-foreground font-black uppercase tracking-widest hover:bg-white hover:text-foreground transition-all text-sm shadow-[8px_8px_0_rgba(255,255,255,0.1)]">
              + New Loan Request
            </Button>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Collateral Value', value: `$${nfts.reduce((acc, n) => acc + (n.cropData.predictedYield * 250), 0).toLocaleString()}`, icon: Sprout, color: 'text-secondary' },
            { label: 'Borrowed USDC', value: `$${loans.reduce((acc, l) => acc + l.principal, 0).toLocaleString()}`, icon: Wallet, color: 'text-white' },
            { label: 'Active NFTs', value: nfts.length.toString().padStart(2, '0'), icon: TrendingUp, color: 'text-white' },
            { label: 'Health Score', value: '742', icon: ShieldCheck, color: 'text-secondary' },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }}>
              <Card className="border-4 border-foreground/10 bg-white/5 rounded-none p-6 relative overflow-hidden group">
                <div className="absolute top-[-10px] right-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
                   <stat.icon className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                  <div className="text-5xl font-black tracking-tighter uppercase text-white">{stat.value}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="active-crops" className="w-full">
          <TabsList className="bg-white/5 border-b-4 border-foreground/10 w-full justify-start rounded-none h-auto p-0 mb-12">
            {['Active Crops', 'Repayments', 'Oracle Feed'].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab.toLowerCase().replace(' ', '-')} 
                className="rounded-none border-b-4 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-white/5 text-white/40 data-[state=active]:text-white font-black uppercase tracking-widest text-xs py-6 px-10"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="active-crops" className="space-y-6">
            {loading ? (
                <div className="grid grid-cols-2 gap-8">
                   {[1,2].map(i => <div key={i} className="h-64 bg-white/5 animate-pulse" />)}
                </div>
            ) : nfts.length === 0 ? (
                <div className="bg-white/5 border-4 border-dashed border-white/10 p-20 text-center">
                    <p className="text-white/40 font-black uppercase tracking-widest">No active crop NFTs detected on-chain.</p>
                    <Button variant="link" className="text-secondary uppercase font-black tracking-widest mt-4">Register your first crop →</Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                {nfts.map((nft) => (
                    <Card key={nft.mint} className="border-4 border-foreground rounded-none bg-white overflow-hidden shadow-[12px_12px_0_rgba(255,255,255,0.05)]">
                    <div className="bg-foreground text-white p-6 flex justify-between items-center">
                        <div>
                            <span className="font-black uppercase tracking-widest text-[10px] text-white/60 block mb-1">MINT: {nft.mint.slice(0,8)}...</span>
                            <span className="font-black uppercase tracking-tighter text-xl">{nft.cropData.cropType} NFT</span>
                        </div>
                        <Badge className="bg-secondary text-foreground font-black rounded-none uppercase text-[10px] px-3 py-1">{nft.loanStatus === 'none' ? 'UNLOCKED' : 'COLLATERALIZED'}</Badge>
                    </div>
                    <CardContent className="p-10 space-y-10">
                        <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Acreage</p>
                            <p className="text-4xl font-black tracking-tighter uppercase">{nft.cropData.acreage} AC</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Est. Yield</p>
                            <p className="text-4xl font-black tracking-tighter uppercase text-secondary">{nft.cropData.predictedYield.toFixed(1)} T</p>
                        </div>
                        </div>

                        <div className="pt-10 border-t-4 border-foreground/5 flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="flex-1 h-16 rounded-none border-2 border-foreground font-black uppercase tracking-widest text-xs hover:bg-foreground hover:text-white transition-all">
                            View On Explorer <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                        <Button className="flex-1 h-16 rounded-none bg-secondary text-foreground border-2 border-secondary font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all">
                            Request $USDC Loan
                        </Button>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            )}
          </TabsContent>
          
          <TabsContent value="repayments">
             <div className="bg-white/5 border-4 border-white/10 p-20 text-center">
                <Clock className="w-16 h-16 text-white/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white/40">No active loans found</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-2">Request a loan using your Crop NFT to see schedule</p>
             </div>
          </TabsContent>
        </Tabs>

        {/* Oracle Section */}
        <section className="bg-secondary text-foreground p-12 overflow-hidden relative border-8 border-foreground">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-foreground animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Oracle Feed</span>
              </div>
              <h2 className="text-[60px] md:text-[80px] font-black tracking-[-0.06em] leading-[0.8] uppercase italic">
                OPTIMAL <br /> HARVEST <br /> OUTLOOK
              </h2>
              <p className="text-foreground/60 font-black uppercase text-xs max-w-sm tracking-wide leading-relaxed">
                Satellite NDVI models indicate +14% soil moisture retention in your specific GPS geo-fence. Liquidation risk remains minimal.
              </p>
              <Button className="h-16 px-10 rounded-none bg-foreground text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-foreground transition-all">
                Download Analysis
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'NDVI Score', value: '0.84', unit: '' },
                 { label: 'Market Price', value: '$224', unit: '/T' },
                 { label: 'Soil Health', value: 'GOOD', unit: '' },
                 { label: 'Risk Factor', value: '4.2', unit: '%' },
               ].map((idx) => (
                 <div key={idx.label} className="border-4 border-foreground p-6 bg-white/10">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{idx.label}</p>
                   <p className="text-4xl font-black uppercase tracking-tighter">{idx.value}<span className="text-sm">{idx.unit}</span></p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
