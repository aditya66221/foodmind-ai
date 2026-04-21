import { MOCK_SCAN_RESULTS } from './mockData';

export interface ScanResult {
  foodName: string;
  healthScore: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  verdict: string;
  betterAlternative: string;
}

export async function analyzeFoodImage(base64Image: string, apiKey: string): Promise<ScanResult> {
  if (!apiKey) {
    console.log("No API key provided, returning mock data");
    // Simulate network delay
    await new Promise(r => setTimeout(r, 2000));
    return MOCK_SCAN_RESULTS[Math.floor(Math.random() * MOCK_SCAN_RESULTS.length)];
  }

  try {
    // Remove the data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Analyze this food image. Return ONLY a valid JSON object with the following keys and appropriate values (no markdown formatting, no code blocks): {\"foodName\": \"name\", \"healthScore\": 85, \"calories\": 400, \"protein\": 20, \"carbs\": 40, \"fat\": 15, \"verdict\": \"one punchy sentence\", \"betterAlternative\": \"suggestion\"}"
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Clean up response if Gemini added markdown formatting
    const cleanedText = textResponse.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText) as ScanResult;
    
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Fallback on error
    return MOCK_SCAN_RESULTS[0];
  }
}
