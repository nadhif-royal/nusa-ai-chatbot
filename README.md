# 🏝️ Nusa AI - Smart Travel Assistant

**Nusa AI** adalah asisten perjalanan cerdas berbasis *Artificial Intelligence* yang dirancang untuk membantu wisatawan mengeksplorasi keindahan autentik Indonesia. Proyek ini merupakan bagian dari ekosistem **NusaPath** ("Your Journey to Authentic Indonesia") dan dikembangkan oleh tim **Trio Ngalam**.

## 🌟 Fitur Utama

* **Smart Itinerary Planner**: Menyusun rencana perjalanan harian yang dipersonalisasi di berbagai destinasi Indonesia.

* **Hidden Gems Discovery**: Memberikan rekomendasi destinasi unik yang jarang diketahui turis mancanegara namun memiliki nilai budaya tinggi.

* **Safety-First (HITL Simulation)**: Memiliki protokol keamanan di mana AI akan menyarankan pendampingan dari **TravelMate** (pemandu lokal) jika rute yang dipilih pengguna dianggap menantang atau berisiko tinggi.
* **Authentic Persona**: Menggunakan gaya bahasa yang ramah, santai, namun tetap sopan, mencerminkan keramahtamahan khas Indonesia.



## 🛠️ Tech Stack

* **AI Model**: Google Gemini 2.5 Flash (via Google Generative AI API).


* **Backend**: Node.js & Express (Deployed via Vercel Serverless Functions).


* **Frontend**: Vanilla HTML5, CSS3, dan JavaScript.


* **Deployment**: Vercel.



## 📂 Struktur Proyek

```text
nusa-ai-chatbot/
├── api/
│   └── chat.js        # Logika backend (Serverless Function)
├── public/            # Aset statis (opsional)
[cite_start]├── index.html         # Antarmuka pengguna (Frontend) [cite: 402]
├── vercel.json        # Konfigurasi deployment Vercel
[cite_start]├── package.json       # Dependensi proyek [cite: 279]
[cite_start]└── .gitignore         # File pengaman (mengecualikan .env dan node_modules) [cite: 841, 850, 858]

```

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone Repositori**:
```bash
git clone https://github.com/nadhif-royal/nusa-ai-chatbot.git
cd nusa-ai-chatbot

```


2. **Instal Dependensi**:
```bash
npm install

```


3. **Konfigurasi Environment**:
Buat file `.env` di folder root dan masukkan API Key Gemini kamu:


```env
GEMINI_API_KEY=your_api_key_here

```


4. **Jalankan Server**:
```bash
node index.js

```


5. 
**Akses Aplikasi**: Buka `index.html` di browser atau akses `http://localhost:3000`.



## 🛡️ Keamanan & Etika AI

Proyek ini mengikuti prinsip pengembangan AI yang bertanggung jawab dengan memastikan:

* Tidak membocorkan API Key melalui penggunaan `.gitignore`.


* Memberikan batasan instruksi (*System Instruction*) agar AI tidak memberikan saran medis atau informasi berbahaya.



---

**Developed with ❤️ by Nadhif Rif'at Rasendriya - Trio Ngalam Team**
