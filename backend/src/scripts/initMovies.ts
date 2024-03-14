import axios, { AxiosError } from "axios";

const apiKey = process.env.API_KEY;
const delay = 20;
const batchSize = 10;
const totalMovies = 100;

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
  created_at: Date;
  updated_at: Date;
  author: string;
  author_details: Author;
}

interface Reviews {
  results: Review[];
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
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

interface Similar {
  results: SimilarData[];
}

interface SimilarData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
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
  credits: Credits[];
  reviews: Reviews;
  release_dates: ReleaseDates;
  "watch/providers": WatchProviders;
  similar: Similar;
  translations: Translations;
  images: Images;
}

interface MovieReviewData {
  id: string;
  movieid: number | undefined;
  author: string;
  rating: number | null;
  content: string;
}

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: bigint;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

const fetchMovieData = async () => {
  const fetchMovie = async (movieId: number) => {
    try {
      const response = await axios.get<ResponseData>(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews,release_dates,watch/providers,similar,translations,images&language=en-US,fi-FI&include_image_language=en,fi`,
      );
      // console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      // console.error(`Error fetching data for movie ID ${movieId}:`, error.message);
      if (error instanceof AxiosError && error.response && error.response.status === 429) {
        console.log("429");
        await new Promise(resolve => setTimeout(resolve, 1000));
        // return fetchMovie(movieId);
        return null;
      }
      return null;
    }
  };

  for (let batchStartId = 1; batchStartId <= totalMovies; batchStartId += batchSize) {
    const batchEndId = Math.min(batchStartId + batchSize - 1, totalMovies);
    const promises = [];
    const moviesReviewsData: MovieReviewData[] = [];
    const moviesData: MovieData[] = [];

    for (let movieId = batchStartId; movieId <= batchEndId; movieId++) {
      promises.push(fetchMovie(movieId));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    const results = await Promise.allSettled(promises);

    const filterFulfilled = results.filter(result => result.status === "fulfilled" && result.value !== null);
    // console.log(filterFulfilled);
    filterFulfilled.forEach(movie => {
      if (movie.status === "fulfilled" && movie.value) {
        moviesData.push({
          adult: movie.value.adult,
          backdrop_path: movie.value.backdrop_path,
          budget: movie.value.budget,
          homepage: movie.value.homepage,
          id: movie.value.id,
          imdb_id: movie.value.imdb_id,
          original_language: movie.value.original_language,
          original_title: movie.value.original_title,
          overview: movie.value.overview,
          popularity: movie.value.popularity,
          poster_path: movie.value.poster_path,
          release_date: movie.value.release_date,
          revenue: movie.value.revenue,
          runtime: movie.value.runtime,
          status: movie.value.status,
          tagline: movie.value.tagline,
          title: movie.value.title,
          vote_average: movie.value.vote_average,
          vote_count: movie.value.vote_count,
        });
        const reviews: Review[] = movie.value.reviews.results;
        // console.log(reviews);
        reviews.forEach(review => {
          const movieId = movie.value?.id;

          moviesReviewsData.push({
            id: review.id,
            movieid: movieId,
            author: review.author,
            rating: review.author_details.rating,
            content: review.content,
          });
        });
      }
    });

    console.log(`Movies processed: ${batchStartId}-${batchEndId}`);
    // console.log(moviesReviewsData);
    // console.log(moviesData.length);
    // set prisma init services here
  }
  console.log("database filled with movies and reviews");
};
void fetchMovieData();
