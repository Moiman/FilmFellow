import { fetchTMDB } from "./fetchHelper.js";
import type { Country, Genres, Language } from "./types.js";

const apiKey = process.env.API_KEY;

export const fetchGenres = async () =>
  (await fetchTMDB<Genres>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)).genres;

export const fetchLanguages = async () =>
  fetchTMDB<Language[]>(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);

export const fetchCountries = async () =>
  fetchTMDB<Country[]>(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`);
