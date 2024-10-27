import { IOfficeQuote, ISVGQuoteOptions } from '../../types';

const HEIGHTS = {
  small: 180,
  medium: 240,
  large: 280,
};

const fetchImageAsDataURI = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(arrayBuffer))
  );
  const mimeType = response.headers.get('Content-Type') || 'image/png';

  return `data:${mimeType};base64,${base64String}`;
};

export const getSVGQuote = async (
  quote: IOfficeQuote,
  { mode, width, height }: ISVGQuoteOptions
) => {
  const modeClass = mode === 'dark' ? 'dark' : 'light';
  let cardWidth = 400;
  let cardHeight = HEIGHTS.small;

  if (width && Number.isSafeInteger(Number(width)) && Number(width) <= 1280) {
    cardWidth = Number(width);
  }

  if (
    height &&
    Number.isSafeInteger(Number(height)) &&
    Number(height) <= 1080
  ) {
    cardHeight = Number(height);
  } else if (quote.quote.length < 200) {
    cardHeight = HEIGHTS.small;
  } else if (quote.quote.length < 260) {
    cardHeight = HEIGHTS.medium;
  } else {
    cardHeight = HEIGHTS.large;
  }

  const avatarDataURI = await fetchImageAsDataURI(quote.character_avatar_url);

  const svgTemplate = `
    <svg width="${cardWidth}" height="${cardHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cardWidth} ${cardHeight}">
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
        <image href="${avatarDataURI}" width="30" height="30" class="avatar" />
        <text x="40" y="20" class="character-info" style="--text-color: ${mode === 'dark' ? '#cccccc' : '#555'};">
          - ${quote.character}
        </text>
      </g>
    </svg>
  `;

  return svgTemplate;
};
