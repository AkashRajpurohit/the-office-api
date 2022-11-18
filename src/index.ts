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

app.notFound((c) => c.json({ ok: false, message: 'Not Found' }, 404));

export default app;
