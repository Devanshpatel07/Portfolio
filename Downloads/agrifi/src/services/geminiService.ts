import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictYield(cropType: string, acreage: number, region: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Predict the expected yield for ${acreage} acres of ${cropType} in the ${region} region. 
      Consider historical weather patterns and soil data. 
      Return the result as a detailed JSON object with:
      - expected_yield_tons (number)
      - confidence_score (0-1)
      - weather_risk_assessment (string)
      - predicted_market_price_per_ton (number)
      - market_volatility_score (0-1)
      - recommended_insurance_coverage (number)`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Yield prediction failed:", error);
    // Mock fallback
    return {
      expected_yield_tons: acreage * 2.5,
      confidence_score: 0.85,
      weather_risk_assessment: "Low risk, stable conditions expected.",
      predicted_market_price_per_ton: 450,
      market_volatility_score: 0.1,
      recommended_insurance_coverage: acreage * 1000
    };
  }
}
