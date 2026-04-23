import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VibeInput from './components/VibeInput';
import MovieResults from './components/MovieResults';
import { matchVibe, shuffleMovies } from './utils/vibeMatch';
import { enrichMovies } from './utils/tmdb';
import vibesData from './data/vibes.json';

export default function App() {
  const [view, setView] = useState('home');
  const [vibeResult, setVibeResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleVibeSubmit(input) {
    const match = matchVibe(input, vibesData);
    if (!match) return;

    setIsLoading(true);
    const pickedMovies = shuffleMovies(match.movies, 3, []);
    const enriched = await enrichMovies(pickedMovies);

    setVibeResult({
      vibeKey: match.vibeKey,
      vibeName: match.vibeName,
      allMovies: match.movies,
      currentMovies: enriched,
      matchMessage: match.matchMessage,
      usedIds: pickedMovies.map(m => m.tmdb_id),
    });
    setIsLoading(false);
    setView('results');
  }

  async function handleShuffle() {
    if (!vibeResult) return;
    setIsLoading(true);
    const next = shuffleMovies(vibeResult.allMovies, 3, vibeResult.usedIds);

    const excludeIds = next.length < 3
      ? []
      : vibeResult.usedIds.concat(next.map(m => m.tmdb_id));

    const enriched = await enrichMovies(next);
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
