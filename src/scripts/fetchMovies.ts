import { ImageType, type MovieProviders } from "@prisma/client";
import { fetchTMDB } from "./fetchHelper.js";
import type { MovieResponse } from "./types.js";

const apiKey = process.env.API_KEY;
let delay = 25;
const waitAfter429 = 4000;

const parseMovieResponseData = (movieData: MovieResponse) => {
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
    release_date: movieData.release_date ? new Date(movieData.release_date) : null,
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
      created_at: new Date(review.created_at),
      updated_at: new Date(review.created_at),
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

  const images = movieData.images.backdrops
    .map(image => {
      const { aspect_ratio, vote_count, ...rest } = image;
      return { movieId: movieData.id, type: ImageType.backdrop as ImageType, ...rest };
    })
    .concat(
      movieData.images.logos.map(image => {
        const { aspect_ratio, vote_count, ...rest } = image;
        return { movieId: movieData.id, type: ImageType.logo, ...rest };
      }),
    )
    .concat(
      movieData.images.posters.map(image => {
        const { aspect_ratio, vote_count, ...rest } = image;
        return { movieId: movieData.id, type: ImageType.poster, ...rest };
      }),
    );

  const movieProviders: MovieProviders[] = [];

  for (const [iso_3166_1, providerCountry] of Object.entries(movieData["watch/providers"].results)) {
    providerCountry.buy?.forEach(provider =>
      movieProviders.push({
        iso_3166_1,
        provider_id: provider.provider_id,
        movieId: movieData.id,
        type: "buy",
      }),
    );
    providerCountry.free?.forEach(provider =>
      movieProviders.push({
        iso_3166_1,
        provider_id: provider.provider_id,
        movieId: movieData.id,
        type: "free",
      }),
    );
    providerCountry.flatrate?.forEach(provider =>
      movieProviders.push({
        iso_3166_1,
        provider_id: provider.provider_id,
        movieId: movieData.id,
        type: "flatrate",
      }),
    );
    providerCountry.rent?.forEach(provider =>
      movieProviders.push({
        iso_3166_1,
        provider_id: provider.provider_id,
        movieId: movieData.id,
        type: "rent",
      }),
    );
  }

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
    images,
    movieProviders,
  };
};

export type MovieDataType = ReturnType<typeof parseMovieResponseData>;

const fetchMovie = async (movieId: number) =>
  fetchTMDB<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews,release_dates,watch/providers,translations,images&language=en-US,fi-FI&include_image_language=en,fi,null`,
  );

let processedMovies = 0;
let retry = false;
export const fetchMoviesData = async (
  movieIds: number[],
  storeFunction: (movie: MovieDataType) => Promise<void> | void,
) => {
  for (const movieId of movieIds) {
    await new Promise(resolve => setTimeout(resolve, delay));
    if (retry) {
      await new Promise(resolve => setTimeout(resolve, waitAfter429));
      retry = false;
    }

    fetchMovie(movieId)
      .then(async res => {
        await storeFunction(parseMovieResponseData(res));
      })
      .catch(async err => {
        if (err === 429) {
          console.log("Got 429. Tying to fetch movie =", movieId, "again and increasing delay to", delay + 1, "ms");
          delay += 1;
          retry = true;
          await new Promise(resolve => setTimeout(resolve, waitAfter429));
          fetchMovie(movieId)
            .then(async res => {
              await storeFunction(parseMovieResponseData(res));
              console.log("Fetched =", movieId, "again successfully");
            })
            .catch(err => {
              console.error("Fatal: Failed again to fetch movie =", movieId);
              throw err;
            });
        } else {
          console.error("Fatal: Failed to fetch movie =", movieId);
          throw err;
        }
      });

    processedMovies++;
    if (processedMovies % 1000 === 0) {
      console.log(`Movies processed: ${Math.trunc((processedMovies / movieIds.length) * 100 * 100) / 100}%`);
    }
  }

  console.log("Fetched movies and related data");
};
