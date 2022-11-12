import app from '../src/index';
import { IOfficeQuote } from '../types';

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
});
