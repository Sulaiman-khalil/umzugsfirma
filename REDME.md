# Umzugsfirma

Fullstack-Umzugsfirma-Projekt bestehend aus:

- Backend: Express + TypeScript + MongoDB
- Frontend: React + Vite + TypeScript + Styled Components

---

## 🚀 Features

- Kontaktformular mit Public-POST und geschütztem Admin-GET/DELETE
- JWT-basierte Authentifizierung für Admin-Bereich
- Automatische Timestamps (`createdAt`/`updatedAt`) auf Nachrichten
- Einfache, responsive UI
- Lösch-Funktion für Nachrichten
- 404-Page für fehlerhafte URLs

---

## 📂 Projektstruktur

---

## 🛠️ Voraussetzungen

- Node.js ≥ 18
- npm ≥ 8
- Docker & Docker Compose (optional)
- MongoDB (lokal oder gehostet)

---

## 📥 Installation & Dev-Start

1. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   # .env anpassen (siehe unten)
   npm install
   npm run dev
   ```
1. **Backend**

```bash
cd frontend
cp .env.example .env
# .env anpassen (siehe unten)
npm install
npm run dev
```
