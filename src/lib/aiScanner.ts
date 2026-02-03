import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function scanRecipeWithAI(
  name: string,
  description: string,
  content: string,
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    generationConfig: { responseMimeType: 'application/json' },
  });

  const prompt = `
    Beoordeel dit studentenrecept op veiligheid én gepastheid.
    Titel: ${name}
    Beschrijving: ${description}
    Instructies: ${content.replace(/<[^>]*>/g, '')}

    STRIKTE RICHTLIJNEN:
    1. Taalgebruik: Scheldwoorden, haatzaaien of ongepaste grappen leiden DIRECT tot isSuspicious: true en een safetyScore onder de 50.
    2. Veiligheid: Onveilig voedsel of gevaarlijke handelingen leiden tot een score onder de 30.
    3. JSON Logica: 
      - safetyScore 100 = Perfect, veilig en professioneel verwoord.
      - safetyScore < 80 = Geen automatische goedkeuring.

    JSON Formaat:
    {
      "isSuspicious": boolean,
      "reason": string,
      "redFlags": string[],
      "safetyScore": number
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0] : text;
  } catch (error: any) {
    console.error('Gemini API Error:', error);

    const isOverloaded =
      error?.message?.includes('503') || error?.status === 503;

    return JSON.stringify({
      isSuspicious: false,
      reason: isOverloaded
        ? 'De AI-server was te druk. Controleer dit recept handmatig.'
        : 'Scan kon niet worden voltooid door een technische fout.',
      redFlags: [],
      safetyScore: 50,
    });
  }
}
