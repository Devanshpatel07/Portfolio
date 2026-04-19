import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sprout, TrendingUp, Landmark } from 'lucide-react';

interface CropStepProps {
  data: any;
  onUpdate: (values: any) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

const CROP_PRICES: Record<string, number> = {
  'Wheat': 220,
  'Rice': 280,
  'Cotton': 610,
  'Maize': 190,
  'Soybean': 380
};

export function CropStep({ data, onUpdate, onNext, onBack, loading }: CropStepProps) {
  const [localData, setLocalData] = useState(data || {
    cropType: 'Wheat',
    acreage: 5,
    sowingDate: '',
    harvestDate: ''
  });

  const [estimate, setEstimate] = useState({
    yield: 0,
    value: 0,
    maxLoan: 0
  });

  useEffect(() => {
    const yieldPerAcre = {
      'Wheat': 1.8, 'Rice': 1.6, 'Maize': 2.2, 'Cotton': 0.5, 'Soybean': 0.8
    }[localData.cropType as string] || 1.5;

    const tonnes = yieldPerAcre * parseFloat(localData.acreage);
    const value = tonnes * (CROP_PRICES[localData.cropType] || 250);
    const maxLoan = value * 0.60;

    setEstimate({
      yield: tonnes,
      value: value,
      maxLoan: maxLoan
    });
  }, [localData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...localData, [name]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="form-header space-y-2">
        <span className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
           Step 3 of 3
        </span>
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Crop Details</h2>
        <p className="text-foreground/60 text-lg">Tell us what you're growing. Our AI will predict your yield and set your loan limit.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-4 border-foreground p-6 space-y-6">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Select Your Crop *</label>
             <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
               {['Wheat', 'Rice', 'Cotton', 'Maize', 'Soybean'].map((crop) => (
                 <button
                    key={crop}
                    onClick={() => {
                        const newData = { ...localData, cropType: crop };
                        setLocalData(newData);
                        onUpdate(newData);
                    }}
                    className={`h-20 border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                        localData.cropType === crop 
                        ? 'border-secondary bg-secondary/10 shadow-[inset_0_0_12px_rgba(45,106,79,0.2)]' 
                        : 'border-foreground/10 bg-earth-cream hover:bg-earth-cream/80'
                    }`}
                 >
                    <span className="text-2xl">{crop === 'Wheat' ? '🌾' : crop === 'Rice' ? '🍚' : crop === 'Cotton' ? '☁️' : crop === 'Maize' ? '🌽' : '🫘'}</span>
                    <span className="text-[9px] font-black uppercase">{crop}</span>
                 </button>
               ))}
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t-2 border-foreground/5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Sowing Date *</label>
              <Input 
                name="sowingDate"
                type="date"
                value={localData.sowingDate}
                onChange={handleChange}
                className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Expected Harvest *</label>
              <Input 
                name="harvestDate"
                type="date"
                value={localData.harvestDate}
                onChange={handleChange}
                className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Crop Acreage *</label>
            <div className="py-2">
                <input 
                  type="range" 
                  name="acreage"
                  min="0.5" 
                  max="100" 
                  step="0.5" 
                  value={localData.acreage} 
                  onChange={handleChange}
                  className="w-full h-3 bg-foreground/10 appearance-none rounded-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-secondary"
                />
                <div className="flex justify-between text-[10px] font-black uppercase opacity-40 mt-2">
                  <span>0.5 AC</span>
                  <span className="text-secondary text-sm">{localData.acreage} ACRES</span>
                  <span>100 AC</span>
                </div>
            </div>
          </div>
        </div>

        {/* AI Estimation Card */}
        <div className="bg-secondary/15 border-4 border-dashed border-secondary p-8 space-y-6 relative overflow-hidden">
           <div className="absolute top-[-20px] right-[-20px] opacity-10">
              <TrendingUp className="w-32 h-32" />
           </div>
           
           <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-secondary animate-pulse" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">AI Yield Prediction Stable</h4>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Loan Estimation</h3>
           </div>

           <div className="grid grid-cols-2 gap-8 items-end">
              <div className="space-y-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Predicted Yield</p>
                    <p className="text-xl font-bold uppercase">{estimate.yield.toFixed(2)} TONNES</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Market Value</p>
                    <p className="text-xl font-bold uppercase">${estimate.value.toLocaleString()} USDC</p>
                 </div>
              </div>
              <div className="bg-white border-2 border-secondary p-4 text-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Max Loan Eligible</p>
                 <p className="text-3xl font-black tracking-tighter text-secondary">${estimate.maxLoan.toLocaleString()}</p>
                 <p className="text-[8px] font-bold uppercase opacity-40 mt-1">60% LTV • 9.8% APR</p>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-8 border-t-2 border-foreground/10 flex gap-4">
         <Button 
            variant="outline"
            className="w-1/3 h-16 rounded-none border-2 border-foreground font-black uppercase tracking-widest text-xs hover:bg-earth-cream"
            onClick={onBack}
          >
            ← Back
         </Button>
         <Button 
            className="flex-1 h-16 bg-secondary text-white rounded-none border-2 border-secondary font-black uppercase tracking-widest text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            onClick={onNext}
            disabled={loading}
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" /> : 'Mint Crop NFT & Submit →'}
         </Button>
      </div>
    </div>
  );
}
