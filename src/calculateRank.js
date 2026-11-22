
/**
 * Custom GitHub Stats Ranking
 * Sistem penilaian lebih ramah untuk developer individu.
 *
 * Skor maksimum: 100
 */

function calculateRank({
  all_commits,
  commits = 0,
  prs = 0,
  issues = 0,
  reviews = 0,
  repos = 0,
  stars = 0,
  followers = 0,
}) {
  // Target pencapaian untuk skor penuh
  const TARGETS = {
    commits: all_commits ? 2000 : 1000,
    prs: 25,
    repos: 10,
    stars: 20,
    issues: 10,
    reviews: 10,
    followers: 20,
  };

  // Bobot masing-masing statistik
  const WEIGHTS = {
    commits: 30,
    prs: 20,
    repos: 20,
    stars: 15,
    issues: 5,
    reviews: 10,
  };

  // Hitung skor berdasarkan pencapaian
  const score =
    Math.min(commits / TARGETS.commits, 1) * WEIGHTS.commits +
    Math.min(prs / TARGETS.prs, 1) * WEIGHTS.prs +
    Math.min(repos / TARGETS.repos, 1) * WEIGHTS.repos +
    Math.min(stars / TARGETS.stars, 1) * WEIGHTS.stars +
    Math.min(issues / TARGETS.issues, 1) * WEIGHTS.issues +
    Math.min(reviews / TARGETS.reviews, 1) * WEIGHTS.reviews;

  // Konversi skor ke percentile untuk kompatibilitas kartu
  const percentile = 100 - score;

  // Standar ranking custom
  const THRESHOLDS = [5, 10, 15, 20, 25, 30, 40, 100];

  const LEVELS = [
    "S",
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D",
  ];

  const level =
    LEVELS[THRESHOLDS.findIndex((threshold) => percentile <= threshold)];

  return {
    level,
    percentile,
  };
}

export { calculateRank };
export default calculateRank;
