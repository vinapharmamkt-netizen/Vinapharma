/**
 * Vinapharma – Rank Icon Helper (dùng chung toàn site)
 * Kim Cương dùng brand red #cc1f1f
 */
const RANK_ICON_DEF = {
  'thanh-vien': {
    color: '#9ca3af',
    d: 'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z'
  },
  'dong': {
    color: '#b45309',
    d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
  },
  'bac': {
    color: '#64748b',
    d: 'M12 2L4 6v5c0 5.5 3.84 10.74 9 12 5.16-1.26 9-6.5 9-12V6L12 2z'
  },
  'vang': {
    color: '#d97706',
    d: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z'
  },
  'kim-cuong': {
    color: '#cc1f1f',
    d: 'M19 3h-4L12 0 9 3H5L3 7l9 13 9-13-2-4zm-7 13.2L5.8 8l.8-1.6h1.6L12 4l3.8 2.4H17.4l.8 1.6L12 16.2z'
  }
};

/**
 * Trả về SVG HTML string cho icon rank.
 * @param {string} rankKey  - key của rank ('dong', 'kim-cuong', ...)
 * @param {number} size     - kích thước px
 * @param {boolean} white   - true = icon màu trắng (dùng trên nền tối/màu)
 */
function rankIconSVG(rankKey, size, white) {
  const def  = RANK_ICON_DEF[rankKey] || RANK_ICON_DEF['thanh-vien'];
  const fill = white ? 'rgba(255,255,255,0.95)' : def.color;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" style="flex-shrink:0;vertical-align:middle"><path d="${def.d}"/></svg>`;
}
