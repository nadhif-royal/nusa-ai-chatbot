import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Tambahkan Header CORS agar website bisa memanggil API ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "Kamu adalah NusaBot, chatbot cerdas dari Nusa AI dari tim Trio Ngalam." 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}