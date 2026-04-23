import { useState } from 'react';

function RatingBadge({ rating }) {
  if (!rating) return null;
  const score = rating.toFixed(1);
  const color = rating >= 7.5 ? '#22c55e' : rating >= 6 ? 'var(--color-amber)' : 'var(--color-muted-text)';
  return (
    <span
      className="text-xs font-black px-2 py-0.5 rounded-full"
      style={{ background: 'rgba(0,0,0,0.35)', color, border: `1px solid ${color}40` }}
    >
      ★ {score}
    </span>
  );
}

export default function MovieCard({ movie, style }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hasPoster = movie.poster && !imgError;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: 'var(--color-card)',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.3)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2/3' }}>
        {hasPoster ? (
          <>
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
              onError={() => setImgError(true)}
            />
            {/* Gradient overlay for readability */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(42,48,69,1) 0%, rgba(42,48,69,0.5) 60%, transparent 100%)' }}
            />
            {/* Rating pinned on poster */}
            <div className="absolute top-2.5 right-2.5">
              <RatingBadge rating={movie.rating} />
            </div>
            {/* Year pinned bottom-left on poster */}
            <span
              className="absolute bottom-2.5 left-3 text-xs font-bold"
              style={{ color: 'var(--color-muted-text)' }}
            >
              {movie.year}
            </span>
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: 'var(--color-charcoal)' }}
          >
            <span className="text-5xl select-none" role="img" aria-label="film">🎞️</span>
            <span
              className="text-xs font-semibold text-center px-4 leading-snug"
              style={{ color: 'var(--color-muted-text)' }}
            >
              {movie.title}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className="font-black text-base leading-tight"
              style={{ color: 'var(--color-warm-text)' }}
            >
              {movie.title}
            </h3>
            {!hasPoster && (
              <span className="text-xs font-semibold" style={{ color: 'var(--color-muted-text)' }}>
                {movie.year}
              </span>
            )}
          </div>
          {!hasPoster && <RatingBadge rating={movie.rating} />}
        </div>

        {/* Vibe reason */}
        <p
          className="text-sm italic leading-snug flex-1"
          style={{
            color: 'var(--color-amber)',
            borderLeft: '2px solid rgba(245,158,11,0.4)',
            paddingLeft: '0.625rem',
          }}
        >
          {movie.vibe_reason}
        </p>

        {/* Streaming providers */}
        {movie.providers && movie.providers.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold" style={{ color: 'var(--color-muted-text)' }}>
              Stream on
            </span>
            {movie.providers.map(p =>
              p.logo ? (
                <img
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  title={p.name}
                  className="h-6 w-6 rounded-md object-cover"
                />
              ) : (
                <span
                  key={p.name}
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--color-amber)' }}
                >
                  {p.name}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
