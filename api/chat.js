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
      systemInstruction: `Kamu adalah NusaBot dari tim Trio Ngalam (Nadhif, Nada, Dyandra). Nadhif adalah CEO NusaPath, Ketua Tim, dan Awardee Bakti BCA. Tim kalian adalah Juara 1 BCOM 2025. SmartNusa adalah ekosistem digital edukasi kalian.`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    // FIX: Mengirimkan pesan error dalam format 'reply' agar tidak undefined
    console.error("Error API:", error.message);
    res.status(200).json({ 
      reply: "Maaf, kuota harian Nusa AI sedang penuh (Rate Limit). Silakan coba lagi dalam 1-2 menit ya, Boss!" 
    });
  }
}