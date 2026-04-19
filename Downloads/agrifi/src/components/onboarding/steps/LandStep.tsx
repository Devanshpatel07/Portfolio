import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VoiceInput } from '@/components/ui/VoiceInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface LandStepProps {
  data: any;
  onUpdate: (values: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LandStep({ data, onUpdate, onNext, onBack }: LandStepProps) {
  const [localData, setLocalData] = useState(data || {
    state: '',
    district: '',
    khasra: '',
    landArea: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...localData, [name]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const handleVoice = (field: string, text: string) => {
    const newData = { ...localData, [field]: text };
    setLocalData(newData);
    onUpdate(newData);
  };

  const getGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newData = { 
          ...localData, 
          lat: pos.coords.latitude.toFixed(6), 
          lng: pos.coords.longitude.toFixed(6) 
        };
        setLocalData(newData);
        onUpdate(newData);
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="form-header space-y-2">
        <span className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
           Step 2 of 3
        </span>
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Register Your Land</h2>
        <p className="text-foreground/60 text-lg">Your land records help us verify ownership and calculate loan eligibility.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-4 border-foreground p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">State *</label>
              <select 
                name="state"
                value={localData.state}
                onChange={handleChange}
                className="w-full h-14 px-3 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase text-sm outline-none focus:bg-white"
              >
                <option value="">Select State</option>
                <option>Punjab</option>
                <option>Haryana</option>
                <option>UP</option>
                <option>Rajasthan</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Khasra / Survey Number *</label>
              <div className="relative">
                <Input 
                  name="khasra"
                  value={localData.khasra}
                  onChange={handleChange}
                  placeholder="e.g. 145/2A"
                  className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
                />
                <VoiceInput inputId="khasra" onResult={(text) => handleVoice('khasra', text)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Land Area (Acres) *</label>
            <Input 
              name="landArea"
              type="number"
              value={localData.landArea}
              onChange={handleChange}
              placeholder="e.g. 5.5"
              className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
            />
          </div>

          <div className="space-y-4 pt-4 border-t-2 border-foreground/5">
            <Button 
               variant="outline"
               onClick={getGPS}
               className="w-full h-12 border-2 border-secondary text-secondary font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Detect Farm GPS Location
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
               <Input 
                  value={localData.lat} 
                  readOnly 
                  placeholder="LATITUDE" 
                  className="h-10 rounded-none border-2 border-foreground/10 bg-earth-cream/50 text-center font-mono text-[10px] font-black"
                />
               <Input 
                  value={localData.lng} 
                  readOnly 
                  placeholder="LONGITUDE" 
                  className="h-10 rounded-none border-2 border-foreground/10 bg-earth-cream/50 text-center font-mono text-[10px] font-black"
                />
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
            className="flex-1 h-16 bg-foreground text-white rounded-none border-2 border-foreground font-black uppercase tracking-widest text-lg hover:bg-white hover:text-foreground transition-all"
            onClick={onNext}
          >
            Verify Land Details →
         </Button>
      </div>
    </div>
  );
}
