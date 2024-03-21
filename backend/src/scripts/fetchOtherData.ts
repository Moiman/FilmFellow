// import { initGenresDB, initCountriesDB, initLanguagesDB } from "../services/initService.js";

const apiKey = process.env.API_KEY;

export interface Genre {
  id: number;
  name: string;
}

interface Genres {
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

export const fetchGenres = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Genres;
    return data.genres;
  } catch (error) {
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchMovie(movieId);
    }
    throw error;
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Language[];
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

export const fetchCountries = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as Country[];
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

// const genres = await fetchGenres();
// const countries = await fetchCountries();
// const languages = await fetchLanguages();

// await initGenresDB(genres);
// await initCountriesDB(countries);
// await initLanguagesDB(languages);
