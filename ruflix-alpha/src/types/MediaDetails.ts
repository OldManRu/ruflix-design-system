export type MediaPerson = {
  id: string;
  name: string;
  role?: string;
  imageUrl?: string;
};

export type MediaDetails = {
  id: string;

  title: string;
  overview: string;

  logoUrl?: string;
  backdropUrl?: string;
  posterUrl?: string;

  year?: number;
  rating?: string;
  runtime?: string;
  communityRating?: number;

  genres: string[];
  studios: string[];
  people: MediaPerson[];
};