export default function Footer() {
  return (
    <footer className="text-center py-6 px-4 mt-auto" style={{ color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
      <div className="flex items-center justify-center gap-2">
        <span>Powered by</span>
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb20f684e4125f5a5e6b0d26b6f268f09.svg"
            alt="TMDB"
            style={{ height: '14px', filter: 'brightness(0.7)' }}
          />
        </a>
      </div>
      <p className="mt-1 opacity-60">Movie data and images from The Movie Database</p>
    </footer>
  );
}
