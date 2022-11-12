import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import quotes from '../data/quotes.json';

const app = new Hono();

// Middlewares
app.use('*', prettyJSON());
app.use('*', cors());

// Routes
app.get('/', (c) => {
  // For default route, redirect to github repo
  return c.redirect(
    'https://github.com/AkashRajpurohit/the-office-quotes-api',
    302
  );
});

app.get('/quote/random', (c) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return c.json(randomQuote);
});

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

export default app;
