
# ॐ Bhakti Sangam — Morning Devotional Music Website

> A clean, ad-free Hindu devotional music web app built for a boomer dad's morning routine. Powered by Gemini AI.

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20Gemini%20API-yellow)
![Deploy](https://img.shields.io/badge/deploy-Antigravity-red)

---

## 🪔 What Is This?

**Bhakti Sangam** (भक्ति संगम) is a single-page devotional music website designed for Hindu devotees — especially elderly users — to enjoy a peaceful, distraction-free morning prayer experience.

Built by a CS student at KL University as a personal project for his father's daily morning routine.

---

## ✨ Features (MVP)

| Feature | Description |
|---|---|
| 🎵 **Song Player** | Spotify-style player with sidebar playlist, center now-playing panel, and persistent bottom controls |
| 🙏 **Morning Playlist** | 8 curated devotional songs — Hanuman Chalisa, Gayatri Mantra, Om Jai Jagdish, and more |
| 🤖 **AI Pandit** | Gemini-powered chat assistant that explains bhajans, shares shlokas, and gives morning blessings |
| 🌅 **Morning Greeting** | Time-aware greeting banner with daily blessing |
| 🔍 **Search** | Filter songs by name or category from the sidebar |

### 🗓️ Coming Soon (Post-MVP)
- Deity filter (Shiva / Vishnu / Ganesh / Devi / Hanuman)
- Language filter (Hindi / Telugu / Sanskrit)
- Favorites / bookmarks
- Lyrics display

---

## 🛠️ Tech Stack

- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (single file)
- **Audio:** YouTube embed (ad-supported for now, archive.org planned)
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **Fonts:** Google Fonts — Yatra One + Philosopher
- **Hosting:** Antigravity IDE

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/bhakti-sangam.git
cd bhakti-sangam
```

### 2. Add your Gemini API key
Open `index.html` and find:
```javascript
const GEMINI_API_KEY = "YOUR_KEY_HERE";
```
Replace with your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Open in browser
Just open `index.html` directly in Chrome — no build step, no server needed.

Or use [Antigravity IDE](https://antigravity.dev) for live preview.

---

## 📁 Project Structure

```
bhakti-sangam/
├── index.html          ← Entire app (HTML + CSS + JS)
├── README.md           ← This file
└── bhakti-sangam.pptx  ← Project presentation
```

---

## 📋 Build Plan

| Day | Task | Status |
|---|---|---|
| Sat Mar 14 | Layout skeleton + theme + AI Pandit | ✅ Done |
| Sun Mar 15 | YouTube audio + search bar | 🔄 In Progress |
| Mon Mar 16 | Gemini chat polish + conversation history | ⏳ Pending |
| Tue Mar 17 | Bug fixes + integration testing | ⏳ Pending |
| Wed Mar 18 | Deity + language filters + mobile responsive | ⏳ Pending |
| Thu Mar 19 | Deploy on Antigravity + shareable link | ⏳ Pending |
| Fri Mar 20 | Buffer + share with dad 🎉 | ⏳ Pending |

---

## 🙏 Acknowledgements

Built with love for a blessed morning routine.

**ॐ शान्तिः शान्तिः शान्तिः**

---

## 📄 License

MIT — free to use, share, and build upon.
