# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Production build → /dist
npm run preview  # Preview production build locally
npm run lint     # ESLint (no autofix)
```

No test framework is configured.

## Environment

Copy `.env.example` to `.env` and set `VITE_TMDB_API_KEY`. The app degrades gracefully without it (shows titles/years only, no posters or streaming info).

## Architecture

Single-page React app with two views: **home** and **results**. All state lives in [src/App.jsx](src/App.jsx) via `useState` — no routing library, no global state manager.

**Data flow:**
1. User types or clicks a vibe tag in [VibeInput](src/components/VibeInput.jsx)
2. [vibeMatch.js](src/utils/vibeMatch.js) scores the input against 15 vibe categories in [vibes.json](src/data/vibes.json) — keyword overlap first, Levenshtein distance as fallback
3. App selects 3 movies via Fisher-Yates shuffle, tracking used IDs to avoid repeats across shuffles
4. [tmdb.js](src/utils/tmdb.js) enriches the selection with posters, ratings, and streaming providers in parallel (TMDB API)
5. [MovieResults](src/components/MovieResults.jsx) renders 3 [MovieCard](src/components/MovieCard.jsx) components with shuffle/back controls

**vibes.json** is the sole data source — no database. Each of the 15 vibe categories has 6–9 curated movie entries with a `reason` field used as the "vibe reason" display text on each card.

## Styling

Tailwind CSS v4 with a custom `@theme` block in [src/index.css](src/index.css) that defines all brand colors (navy, charcoal, amber, gold, etc.) and two keyframe animations (`fade-in`, `pulse-soft`). Use these CSS variables rather than raw Tailwind color utilities for anything on-brand.
