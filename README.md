# ॐ Bhakti Sangam — Morning Devotional Music Website

> A clean, ad-free Hindu devotional music web app built for a boomer dad's morning routine. Powered by Gemini AI.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20Gemini%20API%20%2B%20YouTube-yellow)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black)
![Version](https://img.shields.io/badge/version-1.0%20MVP-orange)

---

## 🪔 What Is This?

**Bhakti Sangam** (भक्ति संगम) is a single-page devotional music website designed for Hindu devotees — especially elderly users — to enjoy a peaceful, distraction-free morning prayer experience.

Built by a CS student at KL University as a surprise gift for his father's daily morning routine. From idea to deployment in 6 days.

---

## ✨ Features (MVP v1.0)

| Feature | Description |
|---|---|
| 🎵 **Song Player** | Spotify-style layout — sidebar playlist, center now-playing panel, persistent bottom bar |
| 🙏 **Morning Playlist** | 8 curated devotional songs — Hanuman Chalisa, Gayatri Mantra, Om Jai Jagdish, and more |
| 🔍 **YouTube Search** | Search any devotional song — results load with thumbnails, Up Next panel, recently played |
| 🤖 **AI Pandit** | Gemini-powered chat — explains bhajans, shares shlokas, gives morning blessings |
| 🌅 **Time-Based Greeting** | Morning / Afternoon / Evening / Night playlist labels with blessings |
| 🕉️ **Deity Filter** | Filter songs by deity — Shiva, Vishnu, Ganesh, Devi, Hanuman |
| 🌐 **Language Filter** | Filter by language — Hindi, Telugu, Sanskrit |
| 📱 **Mobile Responsive** | Hamburger sidebar + AI Pandit toggle on mobile |
| 🕐 **Recently Played** | Tracks last 5 played songs in sidebar |
| 🔒 **Secure API Keys** | Keys stored via Vercel serverless functions — never exposed in code |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI | HTML5 + CSS3 + Vanilla JavaScript |
| Audio | YouTube IFrame API |
| AI Chat | Google Gemini API (via Vercel serverless) |
| Search | YouTube Data API v3 (via Vercel serverless) |
| Fonts | Google Fonts — Yatra One + Philosopher |
| Hosting | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Z4MZ3N0M/mini-proj-bhakti_sangam.git
cd mini-proj-bhakti_sangam
```

### 2. Create a .env file
```
GEMINI_API_KEY=your_gemini_api_key
YT_API_KEY=your_youtube_api_key
```

Get your Gemini key at: https://aistudio.google.com/app/apikey

Get your YouTube key at: https://console.cloud.google.com

### 3. Run locally
Open `index.html` in Chrome directly or use a local server:
```bash
npx serve .
```

### 4. Deploy on Vercel
1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variables in Vercel settings
4. Deploy

---

## 📁 Project Structure

```
bhakti-sangam/
├── index.html              ← Main HTML structure
├── script.js               ← All JavaScript logic
├── style.css               ← All styling
├── api/
│   ├── chat.js             ← Gemini API serverless function
│   └── search.js           ← YouTube search serverless function
├── vercel.json             ← Vercel routing config
├── .gitignore              ← Ignores .env and node_modules
├── README.md               ← This file
└── bhakti-sangam.pptx      ← Project presentation
```

---

## 🗺️ Roadmap (Post-MVP)

**V1.1 — Quick Wins**
- [ ] Loop single song
- [ ] Sleep timer
- [ ] Mantra counter (108 click mala)
- [ ] Auto-play at set morning time

**V1.2 — Personalization (localStorage)**
- [ ] Favourite songs
- [ ] Add / remove from custom playlist
- [ ] Persist preferences across sessions

**V1.3 — Accounts + Cloud (Firebase/Supabase)**
- [ ] Google login
- [ ] Cloud saved playlists
- [ ] Multiple profiles (Dad / Mom)
- [ ] Add any YouTube song to personal playlist

---

## 🙏 Acknowledgements

Built with love as a surprise gift for a devoted father's morning routine.

**ॐ शान्तिः शान्तिः शान्तिः**
