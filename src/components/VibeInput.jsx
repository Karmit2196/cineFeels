import { useState } from 'react';

const VIBE_TAGS = [
  { label: 'feel good',              emoji: '😊' },
  { label: 'monsoon mood',           emoji: '🌧️' },
  { label: 'cozy & nostalgic',       emoji: '🧸' },
  { label: 'adventurous',            emoji: '🗺️' },
  { label: 'need a good cry',        emoji: '😢' },
  { label: 'mind-bending',           emoji: '🌀' },
  { label: 'drained but want comfort', emoji: '🫂' },
  { label: 'lazy sunday',            emoji: '☕' },
  { label: 'dark & intense',         emoji: '🌑' },
  { label: 'feel like a kid again',  emoji: '🎈' },
  { label: 'heartwarming',           emoji: '💛' },
  { label: 'late night thriller',    emoji: '🌙' },
  { label: 'romantic but not cheesy', emoji: '🥂' },
  { label: 'inspirational',          emoji: '⚡' },
  { label: 'weird & quirky',         emoji: '🦄' },
];

export default function VibeInput({ onVibeSubmit }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onVibeSubmit(trimmed);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) onVibeSubmit(trimmed);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 slide-up">
      {/* Hero copy */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl sm:text-4xl font-black mb-2 leading-tight"
          style={{ color: 'var(--color-warm-text)' }}
        >
          What's your vibe tonight?
        </h2>
        <p className="text-sm font-medium" style={{ color: 'var(--color-muted-text)' }}>
          Type a mood or pick a feeling — we'll find the perfect film
        </p>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div
          className="relative rounded-2xl transition-all duration-200"
          style={{
            boxShadow: focused
              ? '0 0 0 2px var(--color-amber), 0 4px 28px rgba(245,158,11,0.18)'
              : '0 4px 24px rgba(0,0,0,0.35)',
          }}
        >
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. melancholic but hopeful, cozy rainy evening…"
            className="w-full rounded-2xl px-5 py-4 pr-36 text-base font-semibold outline-none"
            style={{
              background: 'var(--color-charcoal)',
              color: 'var(--color-warm-text)',
            }}
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
            style={{ background: 'var(--color-amber)', color: 'var(--color-navy)' }}
          >
            Find Films →
          </button>
        </div>
      </form>

      {/* Vibe tag grid */}
      <div>
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Or pick a vibe
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {VIBE_TAGS.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => onVibeSubmit(label)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'var(--color-charcoal)',
                color: 'var(--color-warm-text)',
                border: '1px solid var(--color-border-subtle)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                e.currentTarget.style.boxShadow = '0 0 14px rgba(245,158,11,0.2)';
                e.currentTarget.style.background = 'var(--color-card)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'var(--color-charcoal)';
              }}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
