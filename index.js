require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inisialisasi Server Web
const app = express();
const port = 3000;

// Middleware agar server bisa menerima data JSON dari website
app.use(cors());
app.use(express.json());

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: `Kamu adalah NusaBot, chatbot cerdas dari Nusa AI.
    Tugas utamamu adalah membantu wisatawan merencanakan perjalanan (Smart Itinerary).
    Karaktermu: Ramah, menggunakan bahasa Indonesia yang santai tapi sopan, sangat berwawasan tentang pariwisata lokal Indonesia, budaya, dan 'hidden gems'.
    Aturan penting (Simulasi Human-in-the-Loop): Kamu harus selalu memprioritaskan rute yang AMAN dan menyarankan pengguna untuk menggunakan layanan pendampingan dari NusaPath jika rutenya menantang.
    Jika ditanya siapa kamu, jawab dengan bangga bahwa kamu adalah chatbot dari Nusa AI yang dikembangkan oleh tim Trio Ngalam.
    PENTING: Jangan terlalu sering menggunakan tanda bintang ganda untuk menebalkan teks.`
});

// Menyimpan memori percakapan
let chat = model.startChat({ history: [] });

// Endpoint API: Tempat website akan mengirim pesan
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong!" });
    }

    try {
        console.log(`User: ${userMessage}`);
        
        // Mengirim pesan ke Gemini
        const result = await chat.sendMessage(userMessage);
        const botReply = result.response.text();
        
        console.log(`NusaBot: ${botReply}\n`);
        
        // Mengirim balasan kembali ke website
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error Gemini:", error);
        res.status(500).json({ error: "NusaBot sedang gangguan, coba lagi nanti ya!" });
    }
});

// Endpoint untuk mereset percakapan (opsional, berguna nanti)
app.post('/api/reset', (req, res) => {
    chat = model.startChat({ history: [] });
    res.json({ message: "Sesi chat direset." });
});

app.listen(port, () => {
    console.log("=========================================");
    console.log(`🚀 SERVER NUSABOT AKTIF!`);
    console.log(`Menunggu pesan dari website di http://localhost:${port}`);
    console.log("=========================================\n");
});