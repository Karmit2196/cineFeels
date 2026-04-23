const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function getPosterUrl(posterPath) {
  return posterPath ? `${IMG_BASE}${posterPath}` : null;
}

export function getProviderLogoUrl(logoPath) {
  return logoPath ? `https://image.tmdb.org/t/p/w92${logoPath}` : null;
}

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchMovieDetails(tmdbId) {
  if (!API_KEY) return null;
  return safeFetch(`${BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}`);
}

export async function fetchWatchProviders(tmdbId) {
  if (!API_KEY) return [];
  const data = await safeFetch(`${BASE_URL}/movie/${tmdbId}/watch/providers?api_key=${API_KEY}`);
  if (!data?.results) return [];

  const region = data.results['US'] || Object.values(data.results)[0];
  if (!region) return [];

  const providers = region.flatrate || region.rent || region.buy || [];
  return providers.slice(0, 3).map(p => ({
    name: p.provider_name,
    logo: getProviderLogoUrl(p.logo_path),
  }));
}

export async function enrichMovies(movies) {
  return Promise.all(
    movies.map(async (movie) => {
      const [details, providers] = await Promise.all([
        fetchMovieDetails(movie.tmdb_id),
        fetchWatchProviders(movie.tmdb_id),
      ]);
      return {
        ...movie,
        poster: details ? getPosterUrl(details.poster_path) : null,
        rating: details ? Math.round(details.vote_average * 10) / 10 : null,
        overview: details?.overview || null,
        providers,
      };
    })
  );
}
