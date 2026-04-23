function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function keywordOverlapScore(input, keywords) {
  const inputWords = input.split(/\s+/);
  let score = 0;
  for (const kw of keywords) {
    if (input === kw) { score += 10; continue; }
    if (input.includes(kw) || kw.includes(input)) { score += 5; continue; }
    const kwWords = kw.split(/\s+/);
    for (const iw of inputWords) {
      for (const kw2 of kwWords) {
        if (iw === kw2 && iw.length > 2) score += 2;
      }
    }
  }
  return score;
}

export function matchVibe(input, vibesData) {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return null;

  let bestKey = null;
  let bestScore = 0;

  for (const [key, vibe] of Object.entries(vibesData)) {
    const score = keywordOverlapScore(normalized, vibe.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  if (bestScore > 0) {
    const vibe = vibesData[bestKey];
    return {
      vibeKey: bestKey,
      vibeName: vibe.name,
      movies: vibe.movies,
      isExact: bestScore >= 5,
      matchMessage: bestScore < 5 ? `We interpreted your vibe as "${vibe.name}" — here's what we found.` : null,
    };
  }

  // Levenshtein fallback: find closest keyword across all vibes
  let minDist = Infinity;
  let closestKey = null;

  for (const [key, vibe] of Object.entries(vibesData)) {
    for (const kw of vibe.keywords) {
      const dist = levenshtein(normalized, kw);
      if (dist < minDist) {
        minDist = dist;
        closestKey = key;
      }
    }
  }

  const fallbackVibe = vibesData[closestKey];
  return {
    vibeKey: closestKey,
    vibeName: fallbackVibe.name,
    movies: fallbackVibe.movies,
    isExact: false,
    matchMessage: `We interpreted your vibe as "${fallbackVibe.name}" — here's what we found.`,
  };
}

export function shuffleMovies(movies, count = 3, excludeIds = []) {
  const available = movies.filter(m => !excludeIds.includes(m.tmdb_id));
  const pool = available.length >= count ? available : movies;
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
