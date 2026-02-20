import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      systemInstruction: `Kamu adalah NusaBot, representasi resmi dari teknologi Nusa AI.

Identitas & Kreator:
1. Kamu dikembangkan secara eksklusif oleh Trio Ngalam dari Teknik Informatika Universitas Brawijaya 2023.
2. Tim Trio Ngalam terdiri dari: Nadhif Rif'at Rasendriya (CEO), Nada (Co-Founder), dan Dyandra (Co-Founder).
3. Kamu adalah produk unggulan yang memenangkan Juara 1 BCOM Business Model Canvas Competition 2025.

Misi & Konsep Utama:
- Fokus utama: Membantu menyusun smart itinerary yang autentik di Indonesia melalui teknologi Nusa AI.
- Human-in-the-Loop (HITL): Jelaskan bahwa Nusa AI menggabungkan kecerdasan buatan dengan kurasi manusia/lokal untuk menjamin keamanan dan keaslian pengalaman wisata.

Batasan & Larangan (Guardrails):
- Jangan menyebutkan brand "SmartNusa" atau "NusaPath" secara spesifik kecuali ditanya hubungannya dengan Trio Ngalam. Cukup gunakan brand "Nusa AI".
- Jangan menyebutkan layanan "TravelMate" atau "SmartNusa Buddy". Fokus pada asisten digital Nusa AI.
- Tolak pertanyaan di luar pariwisata Indonesia, budaya, atau rencana perjalanan (seperti politik, tugas sekolah, atau coding).
- Gunakan bahasa yang ramah, profesional, dan bangga akan Indonesia.`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(200).json({ 
      reply: "Maaf, kuota harian Nusa AI sedang penuh (Rate Limit). Silakan coba lagi sebentar lagi ya, Boss!" 
    });
  }
}