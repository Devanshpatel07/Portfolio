import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Empowering Rural Prosperity",
      "tagline": "Yield-backed credit for the modern farmer.",
      "farmer_login": "Farmer Portal",
      "lender_login": "Lender Dashboard",
      "connect_wallet": "Connect Wallet",
      "register_land": "Register Land",
      "request_loan": "Request Loan",
      "predicted_yield": "AI Predicted Yield",
      "expected_harvest": "Expected Harvest",
      "mint_crop_nft": "Mint Crop NFT",
      "lending_pools": "Lending Pools",
      "apy": "APY",
      "total_liquidity": "Total Liquidity",
    }
  },
  hi: {
    translation: {
      "welcome": "ग्रामीण समृद्धि को सशक्त बनाना",
      "tagline": "आधुनिक किसान के लिए उपज-आधारित ऋण।",
      "farmer_login": "किसान पोर्टल",
      "lender_login": "ऋणदाता डैशबोर्ड",
      "connect_wallet": "वॉलेट कनेक्ट करें",
      "register_land": "भूमि पंजीकृत करें",
      "request_loan": "ऋण का अनुरोध करें",
      "predicted_yield": "AI अनुमानित उपज",
      "expected_harvest": "अपेक्षित फसल",
      "mint_crop_nft": "फसल NFT मिंट करें",
      "lending_pools": "ऋण पूल",
      "apy": "APY",
      "total_liquidity": "कुल तरलता",
    }
  },
  pa: {
    translation: {
      "welcome": "ਪੇਂਡੂ ਖੁਸ਼ਹਾਲੀ ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਣਾ",
      "tagline": "ਆਧੁਨਿਕ ਕਿਸਾਨ ਲਈ ਉਪਜ-ਅਧਾਰਤ ਕਰਜ਼ਾ।",
      "farmer_login": "ਕਿਸਾਨ ਪੋਰਟਲ",
      "lender_login": "ਲੈਂਡਰ ਡੈਸ਼ਬੋਰਡ",
      "connect_wallet": "ਵਾਲਿਟ ਕਨੈਕਟ ਕਰੋ",
      "register_land": "ਜ਼ਮੀਨ ਰਜਿਸਟਰ ਕਰੋ",
      "request_loan": "ਕਰਜ਼ੇ ਦੀ ਬੇਨਤੀ ਕਰੋ",
      "predicted_yield": "AI ਪੂਰਵ-ਅਨੁਮਾਨਿਤ ਉਪਜ",
      "expected_harvest": "ਉਮੀਦ ਕੀਤੀ ਫ਼ਸਲ",
      "mint_crop_nft": "ਫ਼ਸਲ NFT ਮਿੰਟ ਕਰੋ",
      "lending_pools": "ਲੈਂਡਿੰਗ ਪੂਲ",
      "apy": "APY",
      "total_liquidity": "ਕੁੱਲ ਤਰਲਤਾ",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
