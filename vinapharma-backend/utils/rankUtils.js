/**
 * Vinapharma – Rank & Points Utility (shared across backend routes)
 */

const RANK_ORDER = ['thanh-vien', 'dong', 'bac', 'vang', 'kim-cuong'];

// Normal user thresholds (VND)
const NORMAL_THRESHOLDS = [
  { rank: 'kim-cuong', min: 35_000_000 },
  { rank: 'vang',      min: 20_000_000 },
  { rank: 'bac',       min: 10_000_000 },
  { rank: 'dong',      min:  5_000_000 },
  { rank: 'thanh-vien', min: 0 },
];

// BtoB user thresholds (VND)
const BTOB_THRESHOLDS = [
  { rank: 'kim-cuong', min: 2_500_000_000 },
  { rank: 'vang',      min: 2_000_000_000 },
  { rank: 'bac',       min: 1_000_000_000 },
  { rank: 'dong',      min:   500_000_000 },
  { rank: 'thanh-vien', min: 0 },
];

// Bonus points awarded each time a user levels up
const NORMAL_BONUS = 10;   // điểm / level (user thường)
const BTOB_BONUS   = 100;  // điểm / level (Quý đối tác)

/**
 * Compute rank from totalSpent and userType.
 */
function computeRank(spent, userType) {
  const n = Number(spent) || 0;
  const thresholds = userType === 'btob' ? BTOB_THRESHOLDS : NORMAL_THRESHOLDS;
  for (const { rank, min } of thresholds) {
    if (n >= min) return rank;
  }
  return 'thanh-vien';
}

/**
 * Points rate: VND per 1 point, based on current rank.
 * thanh-vien / dong / bac → 10,000 VND/pt
 * vang                    →  9,500 VND/pt
 * kim-cuong               →  9,000 VND/pt
 */
function getPointsRate(rank) {
  if (rank === 'kim-cuong') return 9000;
  if (rank === 'vang')      return 9500;
  return 10000;
}

/**
 * Compute available (redeemable) points.
 */
function computeAvailablePoints(totalSpent, rank, bonusPoints, redeemedPoints) {
  const rate = getPointsRate(rank);
  const pts  = Math.floor((totalSpent || 0) / rate)
             + (bonusPoints    || 0)
             - (redeemedPoints || 0);
  return Math.max(0, pts);
}

module.exports = {
  RANK_ORDER,
  NORMAL_BONUS,
  BTOB_BONUS,
  computeRank,
  getPointsRate,
  computeAvailablePoints,
};
