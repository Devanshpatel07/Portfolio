import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, TrendingUp, CloudSun, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { predictYield } from '@/services/geminiService';
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function CropRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [cropData, setCropData] = useState({
    type: '',
    acreage: '',
    sowingDate: '',
    harvestDate: ''
  });

  const handlePredict = async () => {
    if (!cropData.type || !cropData.acreage) return;
    setLoading(true);
    const result = await predictYield(cropData.type, Number(cropData.acreage), "Punjab Central");
    setPrediction(result);
    setLoading(false);
  };

  const chartData = [
    { name: 'MIN', tons: (prediction?.expected_yield_tons || 0) * 0.8 },
    { name: 'TARGET', tons: prediction?.expected_yield_tons || 0 },
    { name: 'MAX', tons: (prediction?.expected_yield_tons || 0) * 1.3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr,550px] gap-12">
        {/* Registration Form */}
        <div className="flex-1 space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Awaiting Protocol Inclusion</span>
                </div>
                <h1 className="text-[60px] md:text-[80px] font-black text-white leading-[0.8] uppercase tracking-tighter italic">
                    REGISTER <br />
                    <span className="stroke-text">ASSET</span>
                </h1>
            </div>

            <Card className="rounded-none border-4 border-foreground bg-white/5 overflow-hidden shadow-[12px_12px_0_rgba(212,255,0,0.1)]">
                <CardHeader className="p-8 border-b-4 border-foreground/10 bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Secure Minting Interface</p>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Crop Commodity</label>
                        <Select onValueChange={(val) => setCropData({ ...cropData, type: val })}>
                            <SelectTrigger className="h-16 rounded-none border-4 border-foreground bg-background text-white font-black uppercase">
                            <SelectValue placeholder="SELECT CROP" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none border-4 border-foreground bg-background text-white">
                                <SelectItem value="wheat">WHEAT (KANAK)</SelectItem>
                                <SelectItem value="basmati">BASMATI RICE</SelectItem>
                                <SelectItem value="cotton">COTTON</SelectItem>
                                <SelectItem value="maize">MAIZE (MAKKI)</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Acreage</label>
                        <Input 
                            type="number" 
                            placeholder="0.0 AC" 
                            className="h-16 rounded-none border-4 border-foreground bg-background text-white font-black uppercase placeholder:text-white/20"
                            value={cropData.acreage}
                            onChange={(e) => setCropData({ ...cropData, acreage: e.target.value })}
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Sowing Timestamp</label>
                        <Input type="date" className="h-16 rounded-none border-4 border-foreground bg-background text-white font-black uppercase" onChange={(e) => setCropData({ ...cropData, sowingDate: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Harvest Window</label>
                        <Input type="date" className="h-16 rounded-none border-4 border-foreground bg-background text-white font-black uppercase" onChange={(e) => setCropData({ ...cropData, harvestDate: e.target.value })} />
                        </div>
                    </div>

                    <Button 
                        className="w-full h-24 rounded-none bg-secondary text-foreground hover:bg-white border-4 border-foreground font-black uppercase tracking-widest text-xl shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none" 
                        onClick={handlePredict}
                        disabled={loading || !cropData.type || !cropData.acreage}
                    >
                        {loading ? <RefreshCw className="animate-spin w-8 h-8 mr-4" /> : <CloudSun className="w-8 h-8 mr-4" />}
                        MINT CROP NFT
                    </Button>
                    <p className="text-[9px] text-center font-black uppercase tracking-widest text-white/20">
                        * MINTING REQUIRESDevnet SOL · NFT WILL REPRESENT YOUR ON-CHAIN HARVEST ENTITLEMENT
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Prediction Results */}
        <div className="flex-1 lg:pt-32">
          <AnimatePresence mode="wait">
            {!prediction && !loading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center bg-white/5 border-4 border-dashed border-white/10"
              >
                <div className="w-32 h-32 border-4 border-white/5 flex items-center justify-center mb-8 rotate-45">
                  <TrendingUp className="text-white/10 w-16 h-16 -rotate-45" />
                </div>
                <h3 className="text-white/20 font-black uppercase tracking-[0.3em] text-2xl">Oracle Pending</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/10 mt-4 max-w-xs">Data feeds from Lovable AI and Satellite Oracles will appear here after submission.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 space-y-12 bg-white/5 border-4 border-foreground"
              >
                <div className="relative">
                  <div className="w-48 h-48 border-8 border-secondary border-t-foreground animate-spin" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                     <Sprout className="text-secondary w-16 h-16" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter animate-pulse">Running AI Consensus</h3>
                  <div className="flex gap-2 justify-center">
                      {[1,2,3].map(i => <div key={i} className={`h-1 w-12 bg-secondary/20`} />)}
                  </div>
                </div>
              </motion.div>
            )}

            {prediction && !loading && (
              <motion.div 
                key="prediction"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Result Card */}
                <Card className="rounded-none border-4 border-foreground bg-secondary text-foreground p-10 shadow-[16px_16px_0_rgba(255,255,255,0.05)]">
                    <div className="flex justify-between items-start mb-12">
                      <div className="space-y-4">
                        <Badge className="bg-foreground text-white rounded-none px-3 py-1 uppercase font-black text-[10px] tracking-widest border-none">AI VERIFIED</Badge>
                        <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">{prediction.expected_yield_tons} T</h2>
                        <p className="text-foreground/40 text-xl font-black uppercase tracking-tight">PREDICTED HARVEST</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase opacity-40">CONSENSUS</p>
                         <p className="text-4xl font-black">{(prediction.confidence_score * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-10 mb-10 pt-10 border-t-4 border-foreground/10">
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Market Price (EST)</p>
                        <p className="text-4xl font-black leading-none">${prediction.predicted_market_price_per_ton}/T</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Asset Exposure</p>
                        <p className="text-4xl font-black leading-none">${((prediction.expected_yield_tons * prediction.predicted_market_price_per_ton) / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                </Card>

                {/* Scenarios Chart */}
                <div className="border-4 border-white/10 p-10 bg-white/5 space-y-10">
                   <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black uppercase tracking-tighter">Yield Scenarios</h3>
                        <div className="flex gap-2">
                            <div className="w-10 h-2 bg-secondary" />
                            <div className="w-10 h-2 bg-white/10" />
                        </div>
                   </div>
                   <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontWeight: 900}} />
                        <Bar dataKey="tons" fill="#D4FF00" radius={0} />
                        </BarChart>
                    </ResponsiveContainer>
                   </div>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{prediction.weather_risk_assessment}</p>
                </div>

                <Button 
                    className="w-full h-24 bg-foreground text-white hover:bg-white hover:text-foreground font-black rounded-none text-2xl uppercase tracking-widest border-4 border-white shadow-[12px_12px_0_rgba(255,255,255,0.1)] transition-all"
                    onClick={() => navigate('/farmer/dashboard')}
                >
                    PROCEED TO DASHBOARD <ChevronRight className="ml-4 w-8 h-8" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
