export interface IOfficeQuote {
  id: number;
  quote: string;
  character: string;
}

export interface IOfficeEpisodes {
  season: number;
  episode: number;
  title: string;
  description: string;
  airDate: string;
  imdbRating: number;
  totalVotes: number;
  directedBy: string;
  writtenBy: string;
}

export interface IErrorResponse {
  ok: boolean;
  message: string;
}
