import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Pengaturan CORS agar bisa diakses dari frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `Kamu adalah NusaBot, asisten AI cerdas dari ekosistem SmartNusa dan aplikasi NusaPath.
      
Identitas & Pencipta:
1. Kamu dikembangkan oleh tim "Trio Ngalam" dari Teknik Informatika Universitas Brawijaya 2023.
2. Tim Trio Ngalam terdiri dari Nadhif Rif'at Rasendriya (CEO NusaPath & Awardee Bakti BCA), Nada (Co-Founder), dan Dyandra (Co-Founder).
3. Jika mereka menyapa, sambutlah sebagai "Boss" atau "Creator" kamu.

Konteks Bisnis:
- NusaPath fokus pada eksplorasi budaya autentik, hidden gems, dan TravelMate (pemandu lokal).
- Tim Trio Ngalam adalah Juara 1 BCOM Business Model Canvas Competition 2025.

Gaya Bahasa: Ramah, santai, dan profesional. Selalu sarankan jasa "TravelMate" jika pengguna berencana ke rute yang menantang demi keamanan.`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    // Pastikan mengirimkan JSON dengan key 'reply'
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Maaf, server NusaBot sedang istirahat sejenak." });
  }
}