import app from '../src/index';
import { IErrorResponse, IOfficeQuote } from '../types';

describe('Basic routes', () => {
  it('should redirect to github URL for index route', async () => {
    const res = await app.request('http://localhost/');
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe(
      'https://github.com/AkashRajpurohit/the-office-quotes-api'
    );
  });

  it('should return 404 response for not found routes', async () => {
    const res = await app.request('http://localhost/this/does/not/exists');
    expect(res.status).toBe(404);
  });
});

describe('Quote routes', () => {
  it('should return a random quote on /quote/random endpoint', async () => {
    const res = await app.request('http://localhost/quote/random');
    const body = await res.json<IOfficeQuote>();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.character).not.toBe('');
    expect(body.quote).not.toBe('');
  });

  it('should return a quote for a valid id', async () => {
    const res = await app.request('http://localhost/quote/1');
    const body = await res.json<IOfficeQuote>();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.character).not.toBe('');
    expect(body.quote).not.toBe('');
  });

  it('should return a error for a invalid id', async () => {
    const res = await app.request('http://localhost/quote/PIZZA!!');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.ok).toBe(false);
    expect(body.message).toBe('Invalid ID');
  });

  it('should return a error for a id does not exists', async () => {
    const res = await app.request('http://localhost/quote/100000000000');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.ok).toBe(false);
    expect(body.message).toBe('ID does not exists... yet!');
  });
});
