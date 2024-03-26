import type { WatchProviders } from "@prisma/client";

interface Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Author {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: string;
  author_details: Author;
}

interface Reviews {
  results: Review[];
}

interface ReleaseDates {
  results: ReleaseDate[];
}

interface ReleaseDate {
  iso_3166_1: string;
  release_dates: ReleaseDateData[];
}

interface ReleaseDateData {
  certification: string;
  note: string;
  type: number;
  iso_639_1: string;
  release_date: Date;
}

export interface WatchProvidersResponse {
  results: WatchProviderDetail[];
}

interface WatchProviderDetail extends WatchProviders {
  display_priorities: Record<string, number>;
}

export interface MovieProviderResponse {
  results: Record<string, WatchProviderCountry>;
}

interface WatchProviderCountry {
  link: string;
  rent?: WatchProviderData[];
  buy?: WatchProviderData[];
  flatrate?: WatchProviderData[];
  free?: WatchProviderData[];
}

interface WatchProviderData {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface Translations {
  translations: Translation[];
}

interface Translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationData;
}

interface TranslationData {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface Images {
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: bigint;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  reviews: Reviews;
  release_dates: ReleaseDates;
  "watch/providers": MovieProviderResponse;
  translations: Translations;
  images: Images;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieListResponse {
  page: number;
  results: {
    id: number;
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}
