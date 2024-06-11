"use server";

import prisma from "@/db";
import type { FilterParams } from "@/app/search/searchFilters";

export const searchMovies = async (sortBy: string, filterParams: FilterParams) => {
  const orderBy = {} as Record<string, string>;
  let voteCountLimit = 0;
  if (sortBy === "New") {
    orderBy.release_date = "desc";
  } else if (sortBy === "Popular") {
    orderBy.popularity = "desc";
  } else if (sortBy === "Best rated") {
    voteCountLimit = 300;
    orderBy.vote_average = "desc";
  } else {
    return [];
  }

  const genres = filterParams.genres;
  const countries = filterParams.countries;
  const languages = filterParams.languages;

  const movies = await prisma.movies.findMany({
    where: {
      title: { contains: filterParams.title, mode: "insensitive" },
      genres: {
        some: {
          genre: {
            id: {
              in: genres.length ? genres : undefined,
            },
          },
        },
      },
      spokenLanguages: {
        some: {
          language: {
            name: {
              in: languages.length ? languages : undefined,
              mode: "insensitive",
            },
          },
        },
      },
      productionCountries: {
        some: {
          country: {
            iso_3166_1: {
              in: countries.length ? countries : undefined,
            },
          },
        },
      },
      vote_average: {
        gte: filterParams.ratingMin ? Number(filterParams.ratingMin) - 0.05 : undefined,
        lte: filterParams.ratingMax ? Number(filterParams.ratingMax) + 0.05 : undefined,
      },
      budget: {
        gte: filterParams.budgetMin ? Number(filterParams.budgetMin) : undefined,
        lte: filterParams.budgetMax ? Number(filterParams.budgetMax) : undefined,
      },
      runtime: {
        gte: filterParams.movieLengthMin ? Number(filterParams.movieLengthMin) : undefined,
        lte: filterParams.movieLengthMax ? Number(filterParams.movieLengthMax) : undefined,
      },
      vote_count: { gte: voteCountLimit },
    },
    take: 36,
    orderBy: orderBy,
    select: {
      id: true,
      title: true,
      poster_path: true,
    },
  });

  return movies;
};
