const apiKey = process.env.API_KEY;
const delay = 20;
const totalMovies = 20;

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

export const fetchMovie = async (movieId: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews,release_dates,watch/providers,similar,translations,images&language=en-US,fi-FI&include_image_language=en,fi`,
    );

    if (!response.ok) {
      throw response.status;
    }

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

const fetchMovieData = async () => {
  const moviesReviewsData: MovieReviewData[] = [];
  const moviesData: MovieData[] = [];
  for (let movieId = 1; movieId <= totalMovies; movieId += 1) {
    await new Promise(resolve => setTimeout(resolve, delay));

    fetchMovie(movieId)
      .then(res => {
        moviesData.push({
          adult: res.adult,
          backdrop_path: res.backdrop_path,
          budget: res.budget,
          homepage: res.homepage,
          id: res.id,
          imdb_id: res.imdb_id,
          original_language: res.original_language,
          original_title: res.original_title,
          overview: res.overview,
          popularity: res.popularity,
          poster_path: res.poster_path,
          release_date: res.release_date,
          revenue: res.revenue,
          runtime: res.runtime,
          status: res.status,
          tagline: res.tagline,
          title: res.title,
          vote_average: res.vote_average,
          vote_count: res.vote_count,
        });
        const reviews: Review[] = res.reviews.results;
        // console.log(reviews);
        reviews.forEach(review => {
          const movieId = res?.id;

          moviesReviewsData.push({
            id: review.id,
            movieid: movieId,
            author: review.author,
            rating: review.author_details.rating,
            content: review.content,
          });
        });
      })
      .catch(err => console.error("failed to fetch", movieId, err));

    if (movieId % 100 === 0) {
      console.log(`Movies processed: ${movieId - 99}-${movieId}`);
    }
  }
  // console.log(moviesReviewsData);
  // console.log(moviesData.length);
  // set prisma init services here
  console.log("database filled with movies and reviews");
};
void fetchMovieData();
