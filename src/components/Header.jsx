export default function Header() {
  return (
    <header className="relative text-center pt-12 pb-6 px-4">
      {/* Cinematic top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-amber) 30%, var(--color-muted-orange) 70%, transparent 100%)',
        }}
      />

      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-3xl select-none" role="img" aria-label="cinema">🎬</span>
        <h1
          className="text-5xl sm:text-6xl font-black tracking-tight gradient-text"
        >
          Cinefeels
        </h1>
      </div>

      <p
        className="text-xs font-bold uppercase tracking-[0.2em]"
        style={{ color: 'var(--color-muted-text)' }}
      >
        Feel it · Find it · Watch it
      </p>
    </header>
  );
}
