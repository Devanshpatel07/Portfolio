import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  Droplets, 
  Zap, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const kycQueue = [
    { id: 'KYC-881', name: 'Rajesh Kumar', region: 'Punjab', crops: 'Wheat, Rice', status: 'Pending' },
    { id: 'KYC-882', name: 'Sukhwinder Singh', region: 'Haryana', crops: 'Mustard', status: 'Reviewing' },
    { id: 'KYC-883', name: 'Anita Devi', region: 'UP', crops: 'Sugarcane', status: 'Pending' },
  ];

  const oracles = [
    { name: 'Pyth Network', type: 'Price Feed', latency: '12ms', status: 'Online' },
    { name: 'Switchboard', type: 'Custom Yield', latency: '18ms', status: 'Stable' },
    { name: 'NASA Satellite', type: 'NASA Harvest', latency: '1.2s', status: 'Online' },
  ];

  const pools = [
    { name: 'Wheat-Punjab-Main', utilization: 72, liquidity: '1.2M USDC', health: 'Healthy' },
    { name: 'Rice-Haryana-Beta', utilization: 88, liquidity: '450K USDC', health: 'Warning' },
  ];

  return (
    <div className="min-h-screen bg-background pt-12 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-secondary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Protocol Live</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.8] uppercase">
              Admin <br />
              <span className="text-foreground/20">Control</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
             <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
               <Input 
                 placeholder="Search Farmers / Loans / NFTs" 
                 className="h-14 pl-12 rounded-none border-2 border-foreground bg-white font-bold uppercase text-[10px]"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             <Button className="w-full md:w-auto h-14 bg-foreground text-white rounded-none border-2 border-foreground font-black uppercase tracking-widest text-xs px-8 hover:bg-white hover:text-foreground transition-all">
               System Actions
             </Button>
          </div>
        </section>

        {/* Top Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'TVL', value: '$25.4M', change: '+12%', icon: Droplets },
            { label: 'Active Loans', value: '1,248', change: '+5%', icon: Activity },
            { label: 'System Health', value: '99.9%', change: 'Stable', icon: ShieldCheck },
            { label: 'Gas Cost (Avg)', value: '0.005 SOL', change: '-2%', icon: Zap },
          ].map((stat, i) => (
            <Card key={i} className="border-4 border-foreground rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{stat.label}</p>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-4xl font-black tracking-tighter uppercase mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-secondary">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 pt-12">
          {/* KYC Queue */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-end">
              <h3 className="text-4xl font-black tracking-tighter uppercase">KYC Verification Queue</h3>
              <Button variant="link" className="text-foreground font-black uppercase tracking-widest text-[10px] p-0">View All Queue</Button>
            </div>
            
            <div className="space-y-4">
              {kycQueue.map((item) => (
                <div key={item.id} className="group border-2 border-foreground/10 hover:border-foreground p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all bg-white overflow-hidden relative">
                  <div className="flex gap-6 items-center flex-1">
                     <div className="w-16 h-16 bg-foreground flex items-center justify-center text-white font-black text-2xl uppercase italic">
                       {item.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-black uppercase text-xl leading-none">{item.name}</span>
                         <Badge className="bg-earth-cream text-foreground/60 border border-foreground/10 rounded-none uppercase text-[8px]">{item.id}</Badge>
                       </div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{item.region} • Crops: {item.crops}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={`rounded-none font-black uppercase text-[10px] px-3 py-1 ${
                      item.status === 'Pending' ? 'border-harvest-gold text-soil-brown bg-harvest-gold/10' : 'border-secondary text-secondary bg-secondary/10'
                    }`}>
                      {item.status}
                    </Badge>
                    <div className="flex gap-2">
                       <Button size="icon" variant="outline" className="rounded-none border-2 border-foreground hover:bg-secondary hover:border-secondary transition-all">
                          <CheckCircle className="w-4 h-4" />
                       </Button>
                       <Button size="icon" variant="outline" className="rounded-none border-2 border-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-all">
                          <XCircle className="w-4 h-4" />
                       </Button>
                       <Button size="icon" variant="outline" className="rounded-none border-2 border-foreground">
                          <Eye className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Oracles & Pool Health */}
          <div className="space-y-12">
            {/* Oracle Status */}
            <div className="space-y-6">
              <h3 className="text-4xl font-black tracking-tighter uppercase">Oracle Status</h3>
              <div className="space-y-4">
                {oracles.map((oracle) => (
                  <div key={oracle.name} className="flex justify-between items-center p-4 border-l-4 border-secondary bg-secondary/5">
                    <div>
                      <p className="font-black uppercase text-sm leading-none mb-1">{oracle.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{oracle.type} • {oracle.latency}</p>
                    </div>
                    <Badge className="bg-secondary text-foreground rounded-none font-black uppercase text-[8px]">
                      {oracle.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Liquidity Health */}
            <div className="space-y-6">
              <h3 className="text-4xl font-black tracking-tighter uppercase">Pool Health</h3>
              <div className="space-y-6">
                {pools.map((pool) => (
                  <div key={pool.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="font-black uppercase text-sm">{pool.name}</p>
                      <span className={`text-[10px] font-black uppercase ${pool.health === 'Healthy' ? 'text-secondary' : 'text-harvest-gold'}`}>
                        {pool.health}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-widest text-foreground/40">
                         <span>Utilization</span>
                         <span>{pool.utilization}%</span>
                      </div>
                      <Progress value={pool.utilization} className={`h-2 rounded-none bg-foreground/5 ${pool.health === 'Healthy' ? '[&>div]:bg-secondary' : '[&>div]:bg-harvest-gold'}`} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">{pool.liquidity} Total Liquidity</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts / System Log */}
        <section className="bg-foreground text-white p-8 rounded-none border-l-[12px] border-secondary">
           <div className="flex items-center gap-4 mb-4">
             <AlertTriangle className="text-harvest-gold w-6 h-6" />
             <h4 className="text-2xl font-black uppercase tracking-tighter">System Intelligence Alerts</h4>
           </div>
           <div className="space-y-3 font-mono text-[10px] tracking-widest uppercase">
              <p className="text-secondary opacity-80">[{new Date().toISOString()}] - ORACLE FEED CONFIRMED: WHEAT-YIELD-v1.2.9_MODEL_STABLE</p>
              <p className="text-white opacity-40">[SYSTEM] - POOL_REBALANCING_REQUIRED: RICE-HARYANA-BETA</p>
              <p className="text-white opacity-40">[SECURITY] - NEW_WALLET_VERIFIED: 8uY...9mQ_WHITELISTED</p>
           </div>
        </section>
      </div>
    </div>
  );
}
