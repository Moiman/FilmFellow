import Image from "next/image";
import Link from "next/link";

import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import { fetchGenres, fetchMovies } from "./movieFetches";

export const MovieList = async ({ genre }: { genre: string | undefined }) => {
  const getPosters = async (type: string, genre: string | undefined) => {
    const moviesArr = await fetchMovies(6, type, genre);
    if (moviesArr) {
      const movieList = moviesArr.map((movie: { id: number; poster_path: string }) => {
        return (
          <Link
            key={movie.id}
            href={"/movies/" + movie.id}
          >
            <Image
              key={movie.id}
              className="poster"
              //muuta pathi postereille omaan storageen jahka sellannen on
              src={"https://image.tmdb.org/t/p/w154" + movie.poster_path}
              alt="picture of the movie poster"
              width={150}
              height={225}
            />
          </Link>
        );
      });
      return movieList;
    }
  };

  const getGenres = async () => {
    const fetchedGenres = await fetchGenres();

    const genres = fetchedGenres?.map(genre => {
      return (
        <Link
          key={genre.id}
          className="dropdown-item"
          href={"/home?genre=" + genre.name}
        >
          {genre.name}
        </Link>
      );
    });
    return genres;
  };

  return (
    <div>
      <div className="dropdown-button">
        <p>Genre</p>
        <Dropdown selected={genre}>
          <>{await getGenres()}</>
        </Dropdown>
      </div>

      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"New Movies"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{await getPosters("new", genre)}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"Popular Movies"}</h3>
            <Link href={"/popular"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{await getPosters("popular", genre)}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"Best Rated Movies"}</h3>
            <Link href={"/bestrated"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{await getPosters("bestrated", genre)}</div>
      </Section>
    </div>
  );
};
