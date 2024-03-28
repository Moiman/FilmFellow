import type { WatchProviderCountries } from "@prisma/client";
import { fetchTMDB } from "./fetchHelper.js";
import type { Country, Genres, Language, WatchProvidersResponse } from "./types.js";

const apiKey = process.env.API_KEY;

export const fetchGenres = async () =>
  (await fetchTMDB<Genres>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)).genres;

export const fetchLanguages = async () =>
  fetchTMDB<Language[]>(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);

export const fetchCountries = async () =>
  fetchTMDB<Country[]>(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`);

export const fetchProviders = async () => {
  const res = await fetchTMDB<WatchProvidersResponse>(
    `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}`,
  );
  const watchProviders = res.results.map(provider => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { display_priorities, ...providerDetails } = provider;
    return providerDetails;
  });

  const watchProviderCountries = res.results.flatMap(provider => {
    return Object.entries(provider.display_priorities).reduce(
      (watchProviderCountriesResult, [iso_3166_1, display_priority]) =>
        watchProviderCountriesResult.concat({
          provider_id: provider.provider_id,
          iso_3166_1,
          display_priority,
        }),
      [] as WatchProviderCountries[],
    );
  });

  return { watchProviders, watchProviderCountries };
};
