import { IOfficeQuote, ISVGQuoteOptions } from '../../types';

export const getSVGQuote = (
  quote: IOfficeQuote,
  { mode }: ISVGQuoteOptions
) => {
  const heights = {
    small: 180,
    medium: 240,
    large: 280,
  };

  let cardHeight = heights.small;
  if (quote.quote.length < 200) {
    cardHeight = heights.small;
  } else if (quote.quote.length < 280) {
    cardHeight = heights.medium;
  } else {
    cardHeight = heights.large;
  }

  const modeClass = mode === 'dark' ? 'dark' : 'light';

  const svgTemplate = `
    <svg width="400" height="${cardHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${cardHeight}">
      <defs>
        <linearGradient id="lightGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f9fafb" />
          <stop offset="100%" stop-color="#f3f4f6" />
        </linearGradient>
        <linearGradient id="darkGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#1f2937" />
        </linearGradient>
      </defs>

      <style>
        .card-light { fill: url(#lightGradient); stroke: #7dd3fc; stroke-width: 10px; }
        .card-dark { fill: url(#darkGradient); stroke: #0284c7; stroke-width: 10px; }

        .quote-text {
          font-size: 18px;
          font-family: 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
          font-weight: bold;
          fill: var(--text-color);
          opacity: 0;
          animation: fadeUp 1s ease forwards;
        }

        .character-info {
          font-size: 14px;
          font-family: 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
          fill: var(--text-color);
          opacity: 0;
          animation: fadeIn 1s ease forwards 1s;
        }

        .avatar {
          clip-path: circle(50%);
          transform-origin: center;
          opacity: 0;
          animation: fadeIn 2s ease forwards 0.5s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>

      <rect width="100%" height="100%" class="card-${modeClass}" rx="15" ry="15" />
      <foreignObject x="20" y="30" width="360" height="${cardHeight - 90}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; flex-direction: column; gap: 5px;">
          <div class="quote-text" style="color: ${mode === 'dark' ? '#f1f1f1' : '#333'};">
            ${quote.quote}
          </div>
        </div>
      </foreignObject>

      <g transform="translate(20, ${cardHeight - 50})">
        <image href="${quote.character_avatar_url}" width="30" height="30" class="avatar" />
        <text x="40" y="20" class="character-info" style="--text-color: ${mode === 'dark' ? '#cccccc' : '#555'};">
          - ${quote.character}
        </text>
      </g>
    </svg>
  `;

  return svgTemplate;
};
