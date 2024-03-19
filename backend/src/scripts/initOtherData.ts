import { initGenresDB, initCountriesDB, initLanguagesDB } from "../services/initService.js";

const apiKey = process.env.API_KEY;

export interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Genre[];
}

export interface Countries {
  iso_3166_1: string;
  name: string;
}

export interface Languages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const fetchGenres = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Genres;
    return data;
  } catch (error) {
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchMovie(movieId);
    }
    throw error;
  }
};

const fetchLanguages = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Languages[];
    // console.log(data);
    return data;
  } catch (error) {
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchMovie(movieId);
    }
    throw error;
  }
};

const fetchCountries = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Countries[];
    // console.log(data);
    return data;
  } catch (error) {
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchMovie(movieId);
    }
    throw error;
  }
};

const genres = await fetchGenres();
const countries = await fetchCountries();
// console.log(countries);
const modifiedCountries = countries.map(({ english_name: name, iso_3166_1: iso_3166_1 }) => ({
  name,
  iso_3166_1,
}));
const languages = await fetchLanguages();

await initGenresDB(genres.genres);
await initCountriesDB(modifiedCountries);
await initLanguagesDB(languages);
