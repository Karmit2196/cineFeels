import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VibeInput from './components/VibeInput';
import MovieResults from './components/MovieResults';
import { matchVibe, shuffleMovies } from './utils/vibeMatch';
import { enrichMovies, discoverMovies, addProviders } from './utils/tmdb';
import vibesData from './data/vibes.json';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function App() {
  const [view, setView] = useState('home');
  const [vibeResult, setVibeResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleVibeSubmit(input) {
    const match = matchVibe(input, vibesData);
    if (!match) return;

    setIsLoading(true);

    let moviePool, currentMovies, discoverPage = 1, usingDiscover = false;

    if (API_KEY && match.discoverParams) {
      discoverPage = Math.floor(Math.random() * 3) + 1;
      const pool = await discoverMovies(match.discoverParams, discoverPage);
      if (pool.length >= 3) {
        usingDiscover = true;
        const picked = shuffleMovies(pool, 3, []);
        const withTagline = picked.map(m => ({ ...m, vibe_reason: match.tagline }));
        currentMovies = await addProviders(withTagline);
        moviePool = pool.map(m => ({ ...m, vibe_reason: match.tagline }));
      }
    }

    if (!usingDiscover) {
      const picked = shuffleMovies(match.movies, 3, []);
      currentMovies = await enrichMovies(picked);
      moviePool = match.movies;
    }

    setVibeResult({
      vibeKey: match.vibeKey,
      vibeName: match.vibeName,
      discoverParams: match.discoverParams,
      tagline: match.tagline,
      moviePool,
      currentMovies,
      matchMessage: match.matchMessage,
      usedIds: currentMovies.map(m => m.tmdb_id),
      discoverPage,
      usingDiscover,
    });
    setIsLoading(false);
    setView('results');
  }

  async function handleShuffle() {
    if (!vibeResult) return;
    setIsLoading(true);

    const remaining = vibeResult.moviePool.filter(
      m => !vibeResult.usedIds.includes(m.tmdb_id)
    );

    if (vibeResult.usingDiscover && remaining.length < 3) {
      const nextPage = vibeResult.discoverPage + 1;
      const newPool = await discoverMovies(vibeResult.discoverParams, nextPage);
      if (newPool.length >= 3) {
        const taggedPool = newPool.map(m => ({ ...m, vibe_reason: vibeResult.tagline }));
        const picked = shuffleMovies(taggedPool, 3, []);
        const withProviders = await addProviders(picked);
        setVibeResult(prev => ({
          ...prev,
          moviePool: taggedPool,
          currentMovies: withProviders,
          usedIds: picked.map(m => m.tmdb_id),
          discoverPage: nextPage,
        }));
        setIsLoading(false);
        return;
      }
    }

    const next = shuffleMovies(vibeResult.moviePool, 3, vibeResult.usedIds);
    const excludeIds = next.length < 3
      ? []
      : vibeResult.usedIds.concat(next.map(m => m.tmdb_id));

    const enriched = vibeResult.usingDiscover
      ? await addProviders(next)
      : await enrichMovies(next);

    setVibeResult(prev => ({
      ...prev,
      currentMovies: enriched,
      usedIds: excludeIds,
    }));
    setIsLoading(false);
  }

  function handleBack() {
    setView('home');
    setVibeResult(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        {isLoading && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(26,31,46,0.82)', backdropFilter: 'blur(10px)' }}
          >
            <div className="text-center fade-in">
              <div className="text-6xl mb-4 pulse-soft select-none">🎬</div>
              <p className="text-xl font-black mb-1" style={{ color: 'var(--color-warm-text)' }}>
                Finding your films…
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-muted-text)' }}>
                Curating picks for your mood
              </p>
            </div>
          </div>
        )}

        {view === 'home' && <VibeInput onVibeSubmit={handleVibeSubmit} />}

        {view === 'results' && vibeResult && (
          <MovieResults
            vibeName={vibeResult.vibeName}
            movies={vibeResult.currentMovies}
            matchMessage={vibeResult.matchMessage}
            onShuffle={handleShuffle}
            onBack={handleBack}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
