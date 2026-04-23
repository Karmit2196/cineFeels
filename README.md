# Cinefeels 🎬

> **Feel it. Find it. Watch it.**

Cinefeels is a mood-based movie recommendation app. Describe how you're feeling — type a vibe or tap a tag — and get exactly 3 curated movie recommendations that match your mood, complete with posters, streaming availability, and ratings. No algorithms, no accounts, no noise. Just vibes and films.

---

## Getting Your Free TMDB API Key

Cinefeels uses [The Movie Database (TMDB)](https://www.themoviedb.org) for movie posters, ratings, and streaming info. The API is free.

1. Go to [https://www.themoviedb.org](https://www.themoviedb.org) and create a free account
2. After logging in, click your avatar → **Settings**
3. In the left sidebar, click **API**
4. Under "Request an API Key", click **Click here** and choose **Developer**
5. Fill in the application details (you can use any reasonable values for a personal project)
6. Copy your **API Key (v3 auth)** — it looks like a long string of letters and numbers

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Add your TMDB API key
cp .env.example .env
# Then open .env and replace "your_key_here" with your actual TMDB key

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **No API key?** The app still works — it shows movie titles, years, and vibe descriptions from the local data. Only posters, ratings, and streaming info require the key.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Movie data | TMDB API |
| Font | Nunito (Google Fonts) |
| Matching | Keyword overlap + Levenshtein distance |

---

## How It Works

1. **Vibe matching** — Your input is matched against 15 curated vibe categories using keyword overlap scoring and Levenshtein distance as a fallback
2. **Curated picks** — Each category has 6–9 hand-picked movies with personal "why this matches your vibe" explanations
3. **TMDB enrichment** — Posters, ratings, and streaming providers are fetched in parallel from TMDB
4. **Shuffle** — The shuffle button rotates through a different set of 3 movies from the same vibe (never repeating the current set)

---

## Vibe Categories

feel good · monsoon mood · cozy & nostalgic · adventurous · need a good cry · mind-bending · drained but want comfort · lazy sunday · dark & intense · feel like a kid again · heartwarming · late night thriller · romantic but not cheesy · inspirational · weird & quirky

---

## Future Roadmap

- [ ] Real thumbs up/down analytics backend
- [ ] User-created vibe playlists
- [ ] TMDB search integration for custom movie lookup
- [ ] Share your vibe + recommendations as a card
- [ ] "Watch together" queue with friends
- [ ] Mood history — see what you were feeling last week
- [ ] Language/region selector for watch providers
