import app from '../src/index';
import { IErrorResponse, IOfficeEpisodes, IOfficeQuote } from '../types';

describe('Basic routes', () => {
  it('should redirect to github URL for index route', async () => {
    const res = await app.request('http://localhost/');
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe(
      'https://github.com/AkashRajpurohit/the-office-api#api-contract-'
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
    expect(body.character_avatar_url).not.toBe('');
  });

  it('should return a quote for a valid id', async () => {
    const res = await app.request('http://localhost/quote/1');
    const body = await res.json<IOfficeQuote>();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.character).not.toBe('');
    expect(body.quote).not.toBe('');
    expect(body.character_avatar_url).not.toBe('');
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

describe('Seasons and Episodes routes', () => {
  it('should return correct data for a valid season id', async () => {
    const res = await app.request('http://localhost/season/1');
    const body = await res.json<IOfficeEpisodes[]>();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body.length).toEqual(6);
    expect(body).toEqual([
      {
        season: 1,
        episode: 1,
        title: 'Pilot',
        description:
          'The premiere episode introduces the boss and staff of the Dunder-Mifflin Paper Company in Scranton, Pennsylvania in a documentary about the workplace.',
        airDate: '2005-03-24',
        imdbRating: 7.4,
        totalVotes: 7006,
        directedBy: 'Ken Kwapis',
        writtenBy: 'Ricky Gervais & Stephen Merchant and Greg Daniels',
      },
      {
        season: 1,
        episode: 2,
        title: 'Diversity Day',
        description:
          "Michael's off color remark puts a sensitivity trainer in the office for a presentation, which prompts Michael to create his own.",
        airDate: '2005-03-29',
        imdbRating: 8.3,
        totalVotes: 6902,
        directedBy: 'Ken Kwapis',
        writtenBy: 'B. J. Novak',
      },
      {
        season: 1,
        episode: 3,
        title: 'Health Care',
        description:
          'Michael leaves Dwight in charge of picking the new healthcare plan for the staff, with disastrous results ahead.',
        airDate: '2005-04-05',
        imdbRating: 7.7,
        totalVotes: 5756,
        directedBy: 'Ken Whittingham',
        writtenBy: 'Paul Lieberstein',
      },
      {
        season: 1,
        episode: 4,
        title: 'The Alliance',
        description:
          'Just for a laugh, Jim agrees to an alliance with Dwight regarding the downsizing rumors.',
        airDate: '2005-04-12',
        imdbRating: 8,
        totalVotes: 5579,
        directedBy: 'Bryan Gordon',
        writtenBy: 'Michael Schur',
      },
      {
        season: 1,
        episode: 5,
        title: 'Basketball',
        description:
          'Michael and his staff challenge the warehouse workers to a basketball game with a bet looming over both parties.',
        airDate: '2005-04-19',
        imdbRating: 8.4,
        totalVotes: 6183,
        directedBy: 'Greg Daniels',
        writtenBy: 'Greg Daniels',
      },
      {
        season: 1,
        episode: 6,
        title: 'Hot Girl',
        description:
          'Michael is just one of the many male staff who start vying for the attention of an attractive saleswoman in the office.',
        airDate: '2005-04-26',
        imdbRating: 7.7,
        totalVotes: 5495,
        directedBy: 'Amy Heckerling',
        writtenBy: 'Mindy Kaling',
      },
    ]);
  });

  it('should return error for a invalid season id', async () => {
    const res = await app.request('http://localhost/season/NOT_ID');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body).toEqual({
      ok: false,
      message: 'Invalid ID',
    });
  });

  it('should return error for a non existing season id', async () => {
    const res = await app.request('http://localhost/season/1000');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body).toEqual({
      ok: false,
      message: 'No episodes found for this season',
    });
  });

  it('should return correct data for a valid season id and episode id', async () => {
    const res = await app.request('http://localhost/season/1/episode/1');
    const body = await res.json<IOfficeEpisodes>();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body).toEqual({
      season: 1,
      episode: 1,
      title: 'Pilot',
      description:
        'The premiere episode introduces the boss and staff of the Dunder-Mifflin Paper Company in Scranton, Pennsylvania in a documentary about the workplace.',
      airDate: '2005-03-24',
      imdbRating: 7.4,
      totalVotes: 7006,
      directedBy: 'Ken Kwapis',
      writtenBy: 'Ricky Gervais & Stephen Merchant and Greg Daniels',
    });
  });

  it('should return error for a invalid season id or episode id', async () => {
    const res = await app.request('http://localhost/season/1/episode/NOT_ID');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body).toEqual({
      ok: false,
      message: 'Invalid ID',
    });
  });

  it('should return error for a non existing season id or episode id', async () => {
    const res = await app.request('http://localhost/season/1/episode/1000');
    const body = await res.json<IErrorResponse>();

    expect(res.status).toBe(400);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(body).toEqual({
      ok: false,
      message: 'No episode found for this season id and episode id',
    });
  });
});
