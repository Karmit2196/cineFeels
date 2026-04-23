import MovieCard from './MovieCard';

export default function MovieResults({ vibeName, movies, matchMessage, onShuffle, onBack }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 fade-in">
      {/* Fuzzy-match notice */}
      {matchMessage && (
        <div
          className="mb-6 px-4 py-3 rounded-xl text-sm font-semibold text-center"
          style={{
            background: 'rgba(245,158,11,0.08)',
            color: 'var(--color-amber)',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          {matchMessage}
        </div>
      )}

      {/* Heading */}
      <div className="text-center mb-10">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-2"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Curated for your mood
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: 'var(--color-warm-text)' }}>
          Vibing with{' '}
          <span className="gradient-text">{vibeName}</span>
        </h2>
      </div>

      {/* Movie grid — staggered fade-in */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {movies.map((movie, idx) => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
            style={{ animation: `fade-in 0.5s ease ${idx * 130}ms both` }}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 mb-12">
        <button
          onClick={onShuffle}
          className="px-7 py-3.5 rounded-2xl font-black text-base transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--color-amber), var(--color-muted-orange))',
            color: 'var(--color-navy)',
            minWidth: '170px',
            boxShadow: '0 4px 16px rgba(245,158,11,0.3)',
          }}
        >
          🔀 Shuffle
        </button>
        <button
          onClick={onBack}
          className="px-7 py-3.5 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'transparent',
            color: 'var(--color-warm-text)',
            border: '2px solid rgba(232,220,200,0.2)',
            minWidth: '170px',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,220,200,0.45)'; e.currentTarget.style.background = 'rgba(232,220,200,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,220,200,0.2)'; e.currentTarget.style.background = 'transparent'; }}
        >
          ← New Vibe
        </button>
      </div>
    </div>
  );
}
