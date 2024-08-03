import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache'
import quotes from '../data/quotes.json';
import episodes from '../data/episodes.json';

const app = new Hono();

// Middlewares
app.use('*', prettyJSON());
app.use('*', cors());
app.use('*', cache({ cacheName: 'the-office-api', cacheControl: 's-maxage=15' }));

// Routes
app.get('/', (c) => {
  // For default route, redirect to github repo
  return c.redirect(
    'https://github.com/AkashRajpurohit/the-office-api#api-contract-',
    302
  );
});

// Quotes routes
app.get('/quote/random', (c) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return c.json(randomQuote);
});

app.get('/quote/:id', (c) => {
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    return c.json(
      {
        ok: false,
        message: 'Invalid ID',
      },
      400
    );
  }

  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    return c.json(
      {
        ok: false,
        message: 'ID does not exists... yet!',
      },
      400
    );
  }

  return c.json(quote);
});

// Seasons & Episodes routes
app.get('/season/:id', (c) => {
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    return c.json(
      {
        ok: false,
        message: 'Invalid ID',
      },
      400
    );
  }

  const seasonData = episodes.filter((d) => d.season === id);

  if (seasonData.length === 0) {
    return c.json(
      {
        ok: false,
        message: 'No episodes found for this season',
      },
      400
    );
  }

  return c.json(seasonData);
});

app.get('/season/:season_id/episode/:episode_id', (c) => {
  const seasonId = Number(c.req.param('season_id'));
  const episodeId = Number(c.req.param('episode_id'));

  if (Number.isNaN(seasonId) || Number.isNaN(episodeId)) {
    return c.json(
      {
        ok: false,
        message: 'Invalid ID',
      },
      400
    );
  }

  const episodeData = episodes.find(
    (d) => d.season === seasonId && d.episode === episodeId
  );

  if (!episodeData) {
    return c.json(
      {
        ok: false,
        message: 'No episode found for this season id and episode id',
      },
      400
    );
  }

  return c.json(episodeData);
});

app.notFound((c) => c.json({ ok: false, message: 'Not Found' }, 404));

export default app;
