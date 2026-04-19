import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VoiceInput } from '@/components/ui/VoiceInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KYCStepProps {
  data: any;
  onUpdate: (values: any) => void;
  onNext: () => void;
}

export function KYCStep({ data, onUpdate, onNext }: KYCStepProps) {
  const { t } = useTranslation();
  const [localData, setLocalData] = useState(data || {
    fullName: '',
    phone: '',
    email: '',
    aadhaar: '',
    docType: '',
    docNumber: ''
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="form-header space-y-2">
        <span className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
           Step 1 of 3
        </span>
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Verify Your Identity</h2>
        <p className="text-foreground/60 text-lg">We need your Aadhaar and a photo ID to comply with RBI guidelines.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-4 border-foreground p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Full Name (as per Aadhaar) *</label>
              <div className="relative">
                <Input 
                  name="fullName"
                  value={localData.fullName}
                  onChange={handleChange}
                  placeholder="Rajesh Kumar"
                  className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
                />
                <VoiceInput inputId="fullName" onResult={(text) => handleVoice('fullName', text)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Mobile Number *</label>
              <div className="relative">
                <Input 
                  name="phone"
                  value={localData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
                />
                <VoiceInput inputId="phone" onResult={(text) => handleVoice('phone', text)} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Email Address</label>
            <Input 
              name="email"
              type="email"
              value={localData.email}
              onChange={handleChange}
              placeholder="rajesh@example.com"
              className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-bold uppercase"
            />
          </div>
        </div>

        <div className="bg-white border-4 border-foreground p-6 space-y-4">
           <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Aadhaar Number *</label>
           <Input 
              name="aadhaar"
              value={localData.aadhaar}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX"
              maxLength={12}
              className="h-14 rounded-none border-2 border-foreground bg-earth-cream font-mono font-bold text-center tracking-[0.2em]"
            />
            <p className="text-[9px] font-bold uppercase opacity-40">Privacy: We only store the last 4 digits securely.</p>
        </div>
      </div>

      <div className="pt-8 border-t-2 border-foreground/10 flex gap-4">
         <Button 
            className="flex-1 h-16 bg-foreground text-white rounded-none border-2 border-foreground font-black uppercase tracking-widest text-lg hover:bg-white hover:text-foreground transition-all"
            onClick={onNext}
          >
            Connect Identity →
         </Button>
      </div>
    </div>
  );
}
