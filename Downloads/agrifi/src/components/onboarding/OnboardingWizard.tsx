import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgriFi } from '@/hooks/useAgriFi';
import { KYCStep } from './steps/KYCStep';
import { LandStep } from './steps/LandStep';
import { CropStep } from './steps/CropStep';
import { motion, AnimatePresence } from 'motion/react';

export type OnboardingData = {
  kyc: {
    fullName:     string
    phone:        string
    email:        string
    aadhaar:      string
    docType:      string
    docNumber:    string
  }
  land: {
    state:        string
    district:     string
    tehsil:       string
    village:      string
    khasra:       string
    landArea:     number
    ownership:    string
    soilType:     string
    lat?:         number
    lng?:         number
  }
  crop: {
    cropType:     string
    acreage:      number
    sowingDate:   string
    harvestDate:  string
    irrigation:   string
    prevYield:    string
  }
}

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { mintCropNFT, submitKYC, loading } = useAgriFi();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({
    kyc: { fullName: '', phone: '', email: '', aadhaar: '', docType: '', docNumber: '' },
    land: { state: '', district: '', tehsil: '', village: '', khasra: '', landArea: 5, ownership: '', soilType: '', lat: 0, lng: 0 },
    crop: { cropType: 'Wheat', acreage: 5, sowingDate: '', harvestDate: '', irrigation: '', prevYield: '' }
  });

  const updateData = (key: keyof OnboardingData, values: any) =>
    setData(prev => ({ ...prev, [key]: values }));

  const handleNext = async () => {
    if (currentStep < 2) {
      setCurrentStep(s => s + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const d = data as OnboardingData;
    try {
      // 1. KYC
      const { kycId } = await submitKYC({
        farmerWallet: '',  // filled by hook
        fullName:     d.kyc.fullName,
        phone:        d.kyc.phone,
        email:        d.kyc.email,
        aadhaarLast4: d.kyc.aadhaar.slice(-4),
        docType:      d.kyc.docType,
        docNumber:    d.kyc.docNumber,
        state:        d.land.state,
        district:     d.land.district,
        khasra:       d.land.khasra,
        landArea:     d.land.landArea,
        gpsLat:       d.land.lat,
        gpsLng:       d.land.lng,
      });

      // 2. Mint NFT
      const { mint, txSig, nft } = await mintCropNFT({
        farmerWallet:   '',
        cropType:       d.crop.cropType,
        acreage:        d.crop.acreage,
        sowingDate:     d.crop.sowingDate,
        harvestDate:    d.crop.harvestDate,
        state:          d.land.state,
        district:       d.land.district,
        khasra:         d.land.khasra,
        irrigationType: d.crop.irrigation,
      });

      // 3. Navigate to success or dashboard
      navigate('/farmer/dashboard', { state: { mint, kycId, txSig, nft } });
    } catch (err) {
      console.error('Onboarding failed:', err);
    }
  };

  return (
    <div className="grid lg:grid-cols-[400px,1fr] min-h-screen bg-background pt-24">
      <OnboardingSidebar currentStep={currentStep} />
      <main className="p-8 md:p-12 lg:p-20 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 0 && (
                    <KYCStep
                        data={data.kyc}
                        onUpdate={v => updateData('kyc', v)}
                        onNext={handleNext}
                    />
                    )}
                    {currentStep === 1 && (
                    <LandStep
                        data={data.land}
                        onUpdate={v => updateData('land', v)}
                        onNext={handleNext}
                        onBack={() => setCurrentStep(s => s - 1)}
                    />
                    )}
                    {currentStep === 2 && (
                    <CropStep
                        data={data.crop}
                        onUpdate={v => updateData('crop', v)}
                        onNext={handleNext}
                        onBack={() => setCurrentStep(s => s - 1)}
                        loading={loading}
                    />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OnboardingSidebar({ currentStep }: { currentStep: number }) {
  const steps = [
    { name: 'Identity Verification', desc: 'Secure KYC (RBI Compliant)' },
    { name: 'Land Registration',     desc: 'Khasra + Mapping' },
    { name: 'Crop Details',          desc: 'AI Yield Forecast' },
  ];

  return (
    <aside className="hidden lg:flex flex-col bg-foreground text-white p-12 border-r-[16px] border-secondary">
      <div className="flex items-center gap-2 mb-20">
         <div className="w-10 h-10 bg-secondary flex items-center justify-center text-white font-black text-2xl uppercase">🌾</div>
         <h1 className="text-3xl font-black uppercase tracking-tighter">AgriFi Protocol</h1>
      </div>

      <div className="space-y-12 flex-1">
        {steps.map((step, i) => (
          <div key={i} className={`flex gap-6 relative ${i < steps.length - 1 ? 'after:absolute after:left-[19px] after:top-12 after:bottom-[-24px] after:w-[2px] after:bg-white/10' : ''}`}>
            <div className={`
              w-10 h-10 rounded-none border-2 flex items-center justify-center font-black transition-all
              ${i < currentStep  ? 'bg-secondary border-secondary text-white' : ''}
              ${i === currentStep ? 'bg-white border-white text-foreground scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : ''}
              ${i > currentStep  ? 'bg-transparent border-white/20 text-white/30' : ''}
            `}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <div>
              <div className={`text-xl font-black uppercase tracking-tight ${i === currentStep ? 'text-white' : 'text-white/40'}`}>{step.name}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border-2 border-dashed border-white/10 p-6 mt-20">
         <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-relaxed">
            🔐 AES-256 Encrypted Profile · Deployed on Solana Devnet · Submitting to Protocol Review Node
         </p>
      </div>
    </aside>
  );
}
