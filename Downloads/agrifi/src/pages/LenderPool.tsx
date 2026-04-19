import { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, ShieldCheck, Wallet, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LenderPool() {
  const [depositAmount, setDepositAmount] = useState('');

  const pools = [
    { type: 'Wheat (Punjab)', apy: '12.4%', tvl: '$4.2M', risk: 'Low' },
    { type: 'Cotton (Central)', apy: '14.8%', tvl: '$2.8M', risk: 'Medium' },
    { type: 'Basmati (Basin)', apy: '11.5%', tvl: '$6.1M', risk: 'Low' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-20">
        <div className="inline-block bg-secondary/15 text-secondary px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
          INSTITUTIONAL LENDING
        </div>
        <h1 className="text-[64px] md:text-[88px] text-foreground font-display font-black uppercase tracking-tighter leading-none mb-6">
          LENDING<br/><span className="text-secondary">POOLS</span>
        </h1>
        <p className="text-xl text-foreground/60 max-w-2xl font-sans leading-relaxed">
          Provide liquidity to crop-backed lending pools and earn sustainable APY secured by verified farmer collateral on Solana.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-12">
        <div className="space-y-12">
          {/* Active Pools */}
          <section>
            <h2 className="text-2xl font-display font-black uppercase tracking-widest text-foreground/40 mb-10">Available Pools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pools.map((pool, i) => (
                <Card key={i} className="rounded-[32px] border-none bg-white/5 hover:bg-white/10 transition-all p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8">
                    <TrendingUp className="text-secondary/20 group-hover:text-secondary/40 transition-colors w-8 h-8" />
                  </div>
                  <Badge className="bg-secondary/10 text-secondary mb-4 rounded-full px-3 py-1 border-none text-[10px] uppercase font-black tracking-widest">
                    {pool.risk} Risk
                  </Badge>
                  <h3 className="text-3xl font-display font-black text-foreground uppercase tracking-tight mb-8">
                    {pool.type}
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">APY</p>
                      <p className="text-3xl font-black text-secondary">{pool.apy}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">TVL</p>
                      <p className="text-3xl font-black text-foreground">{pool.tvl}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-8 p-12 bg-secondary rounded-[40px] text-primary">
            <div className="text-center">
              <Landmark className="mx-auto mb-4 w-8 h-8" />
              <p className="text-4xl font-display font-black leading-none mb-2">$14M+</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Total Liquidity</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="mx-auto mb-4 w-8 h-8" />
              <p className="text-4xl font-display font-black leading-none mb-2">100%</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Asset Backed</p>
            </div>
            <div className="text-center">
              <PieChart className="mx-auto mb-4 w-8 h-8" />
              <p className="text-4xl font-display font-black leading-none mb-2">0.5%</p>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Protocol Fee</p>
            </div>
          </div>
        </div>

        {/* Deposit Sidebar */}
        <aside className="sticky top-32">
          <Card className="rounded-[40px] border-none shadow-[0_40px_80px_rgba(0,0,0,0.3)] bg-earth-cream text-soil-brown p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
            <h3 className="text-3xl font-display font-black uppercase tracking-tight mb-8">Deposit USDC</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black opacity-40 tracking-widest">Select Pool</Label>
                <div className="p-4 bg-white rounded-xl border-2 border-black/5 font-bold">Wheat (Punjab) Pool</div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black opacity-40 tracking-widest">Amount (USDC)</Label>
                <Input 
                  placeholder="0.00" 
                  className="h-16 bg-white rounded-xl border-2 border-black/5 focus:border-secondary text-2xl font-bold px-6"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-sm font-bold opacity-40 uppercase tracking-widest">Wallet Balance</span>
                <span className="font-bold">2,450.00 USDC</span>
              </div>
              <Button className="w-full h-20 bg-soil-brown hover:bg-soil-brown/90 text-white rounded-xl text-xl font-black uppercase tracking-widest shadow-xl mt-6">
                Approve & Deposit
              </Button>
              <p className="text-center text-[10px] opacity-40 mt-4 leading-relaxed font-sans px-4">
                Your funds are deployed into automated yield strategies collateralized by verification-audited Crop-NFTs.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
