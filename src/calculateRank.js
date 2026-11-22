
/**
 * Custom GitHub Stats Ranking
 * Easier ranking system for individual developers.
 */

function calculateRank({
  all_commits = false,
  commits = 0,
  prs = 0,
  issues = 0,
  reviews = 0,
  repos = 0,
  stars = 0,
  followers = 0,
}) {
  // Achievement targets
  const TARGETS = {
    commits: 500,
    prs: 10,
    issues: 5,
    reviews: 5,
    stars: 5,
    followers: 10,
  };

  // Metric weights (total = 100)
  const WEIGHTS = {
    commits: 30,
    prs: 20,
    issues: 5,
    reviews: 10,
    stars: 15,
    followers: 20,
  };

  // Calculate normalized score
  const score =
    Math.min(commits / TARGETS.commits, 1) * WEIGHTS.commits +
    Math.min(prs / TARGETS.prs, 1) * WEIGHTS.prs +
    Math.min(issues / TARGETS.issues, 1) * WEIGHTS.issues +
    Math.min(reviews / TARGETS.reviews, 1) * WEIGHTS.reviews +
    Math.min(stars / TARGETS.stars, 1) * WEIGHTS.stars +
    Math.min(followers / TARGETS.followers, 1) * WEIGHTS.followers;

  // Convert score into percentile format
  const percentile = 100 - score;

  // Custom ranking thresholds
  const THRESHOLDS = [
    10, 20, 30, 40, 50, 60, 70, 100
  ];

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

  const index = THRESHOLDS.findIndex(
    (threshold) => percentile <= threshold
  );

  const level = LEVELS[index === -1 ? LEVELS.length - 1 : index];

  return {
    level,
    percentile,
  };
}

export { calculateRank };
export default calculateRank;
