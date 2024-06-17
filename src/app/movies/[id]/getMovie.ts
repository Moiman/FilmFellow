"use server";

import { getIsFavorite } from "@/services/favoriteService";
import { getMovieById, getWatchProvidersByMovieId } from "@/services/movieService";
import { getIsWatched, getMovieRating } from "@/services/watchedService";
import { getIsInWatchlist } from "@/services/watchlistService";

export type Movie = NonNullable<Awaited<ReturnType<typeof getMovie>>>;

export const getMovie = async (movieId: string) => {
  try {
    const [movieData, watchProviders, userRating, isWatched, isFavorite, isInWatchlist] = await Promise.all([
      getMovieById(parseInt(movieId), "US"),
      getWatchProvidersByMovieId(Number(movieId)),
      getMovieRating(Number(movieId)),
      getIsWatched(Number(movieId)),
      getIsFavorite(Number(movieId)),
      getIsInWatchlist(Number(movieId)),
    ]);

    if (!movieData) {
      return null;
    }

    const {
      id,
      title,
      backdrop_path,
      overview,
      runtime,
      release_date,
      vote_average,
      directors,
      rating,
      cast,
      crew,
      genres,
    } = movieData;

    const movieCast = cast.map(castMember => ({
      id: castMember.personId,
      name: castMember.name,
      profilePath: castMember.profile_path,
      character: castMember.character,
    }));

    const movieCrew = crew.map(crewMember => ({
      id: crewMember.personId,
      name: crewMember.name,
      profilePath: crewMember.profile_path,
      job: crewMember.job,
    }));

    const movie = {
      id,
      title,
      backdropPath: backdrop_path,
      overview,
      runtime,
      releaseYear: release_date ? new Date(release_date).getFullYear() : null,
      voteAverage: vote_average,
      directors,
      ageRestrictions: rating,
      crew: movieCrew,
      cast: movieCast,
      isFavorite,
      isWatched,
      userRating,
      isInWatchlist,
      watchProviders,
      genres,
    };

    return movie;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};
