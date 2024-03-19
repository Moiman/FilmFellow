import { initMoviesDB } from "../services/initService.js";

const apiKey = process.env.API_KEY;
const delay = 20;

interface Genres {
  id: number;
  name: string;
}

interface Companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Countries {
  iso_3166_1: string;
  name: string;
}

interface Languages {
  english_name: string;
  iso_639_1: string;
  name: string;
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

interface WatchProviders {
  results: WatchProvidersCountries[];
}

interface WatchProvidersCountries {
  link: string;
  rent: WatchProviderData[];
  buy: WatchProviderData[];
  flatrate: WatchProviderData[];
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

interface ResponseData {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Companies[];
  production_countries: Countries[];
  release_date: string;
  revenue: bigint;
  runtime: number;
  spoken_languages: Languages[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  reviews: Reviews;
  release_dates: ReleaseDates;
  "watch/providers": WatchProviders;
  translations: Translations;
  images: Images;
}

const parseMovieResponseData = (movieData: ResponseData) => {
  const movie = {
    id: movieData.id,
    adult: movieData.adult,
    backdrop_path: movieData.backdrop_path,
    budget: movieData.budget,
    homepage: movieData.homepage,
    imdb_id: movieData.imdb_id,
    original_language: movieData.original_language,
    original_title: movieData.original_title,
    overview: movieData.overview,
    popularity: movieData.popularity,
    poster_path: movieData.poster_path,
    release_date: movieData.release_date,
    revenue: movieData.revenue,
    runtime: movieData.runtime,
    status: movieData.status,
    tagline: movieData.tagline,
    title: movieData.title,
    vote_average: movieData.vote_average,
    vote_count: movieData.vote_count,
  };

  const movieGenres = movieData.genres.map(genre => {
    return {
      movieId: movieData.id,
      genreId: genre.id,
    };
  });

  const reviews = movieData.reviews.results.map(review => {
    return {
      id: review.id,
      movieId: movieData.id,
      author: review.author,
      content: review.content,
      created_at: review.created_at,
      updated_at: review.created_at,
    };
  });

  const productionCompanies = movieData.production_companies.map(company => {
    return {
      movieId: movieData.id,
      companyId: company.id,
    };
  });

  const companies = movieData.production_companies.map(company => {
    return {
      id: company.id,
      origin_country: company.origin_country,
      logo_path: company.logo_path,
      name: company.name,
    };
  });

  const productionCountries = movieData.production_countries.map(country => {
    return {
      iso_3166_1: country.iso_3166_1,
      movieId: movieData.id,
    };
  });

  const spokenLanguages = movieData.spoken_languages.map(language => {
    return {
      movieId: movieData.id,
      iso_639_1: language.iso_639_1,
    };
  });

  const cast = movieData.credits.cast.map(actor => {
    return {
      movieId: movieData.id,
      personId: actor.id,
      credit_id: actor.credit_id,
      character: actor.character,
      order: actor.order,
    };
  });

  const crew = movieData.credits.crew.map(member => {
    return {
      movieId: movieData.id,
      personId: member.id,
      credit_id: member.credit_id,
      department: member.department,
      job: member.job,
    };
  });

  const releaseDates = movieData.release_dates.results.map(release => {
    return {
      iso_3166_1: release.iso_3166_1,
      movieId: movieData.id,
      certification: release.release_dates.reduce(
        (certification, release) => (release.certification !== "" ? release.certification : certification),
        "",
      ),
    };
  });

  const findTranslation = movieData.translations.translations.find(translation => translation.iso_639_1 === "fi");
  const translation = findTranslation
    ? {
        movieId: movieData.id,
        iso_639_1: findTranslation.iso_639_1,
        overview: findTranslation.data.overview,
        title: findTranslation.data.title,
      }
    : null;

  // const providers = ...

  // const images = movieData.images.

  return {
    movie,
    movieGenres,
    companies,
    productionCompanies,
    productionCountries,
    spokenLanguages,
    reviews,
    cast,
    crew,
    releaseDates,
    translation,
  };
};

export type MovieDataType = ReturnType<typeof parseMovieResponseData>;

const fetchMovie = async (movieId: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews,release_dates,watch/providers,translations,images&language=en-US,fi-FI&include_image_language=en,fi,null`,
    );

    if (!response.ok) {
      throw response.status;
    }

    response.body;

    const data = (await response.json()) as ResponseData;

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

let processedMovies = 1;
export const fetchMoviesData = async (movieIds: number[], storeFunction = initMoviesDB) => {
  for (const movieId of movieIds) {
    await new Promise(resolve => setTimeout(resolve, delay));

    fetchMovie(movieId)
      .then(async res => {
        const movieData = parseMovieResponseData(res);
        await storeFunction(movieData);
      })
      .catch(err => console.error("failed to fetch", movieId, err));

    if (processedMovies % 1000 === 0) {
      console.log(`Movies processed: ${processedMovies}`);
    }
    processedMovies++;
  }

  console.log("database filled with movies and reviews");
};

// await fetchMoviesData([2, 3]);
