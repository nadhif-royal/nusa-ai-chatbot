const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    // Pengaturan CORS agar bisa diakses dari browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", // Menggunakan model terbaru [cite: 150]
            systemInstruction: "Kamu adalah NusaBot, chatbot cerdas dari Nusa AI. Tugasmu membantu wisatawan di NusaPath." 
        });

        const chat = model.startChat({ history: [] });
        const result = await chat.sendMessage(message);
        const botReply = result.response.text();

        res.status(200).json({ reply: botReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nusa AI sedang istirahat sebentar." });
    }
};