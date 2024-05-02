import Image from "next/image";
import Link from "next/link";
import { Check } from "react-feather";

import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import { fetchGenres, fetchMovies } from "./movieFetches";

export default async function Home({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const getPosters = async (type: string, genre: string | undefined) => {
    const moviesArr = await fetchMovies(6, type, genre);
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
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt="picture of the movie poster"
            width={500}
            height={750}
          />
        </Link>
      );
    });
    return movieList;
  };

  const getGenres = async () => {
    const fetchedGenres = await fetchGenres();

    const genres = fetchedGenres.map(genre => {
      return (
        <Link
          key={genre.id}
          className="dropdown-item"
          href={"/?genre=" + genre.name}
        >
          {genre.name}
          {genre.name === selectedGenre && (
            <Check
              size={20}
              color="#ffc700"
            />
          )}
        </Link>
      );
    });
    genres.unshift(
      <Link
        className="dropdown-item"
        href={"/"}
      >
        All
        {!selectedGenre && (
          <Check
            size={20}
            color="#ffc700"
          />
        )}
      </Link>,
    );
    return genres;
  };

  return (
    <main>
      <div className="dropdown-button">
        <p>Genre</p>
        <Dropdown
          width={200}
          selected={selectedGenre ?? "All"}
        >
          {await getGenres()}
        </Dropdown>
      </div>

      <div className="section-wrapper">
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="h3">New Movies</h2>
              <Link href="/new">See all</Link>
            </div>
          }
        >
          <div className="poster-list">{await getPosters("new", selectedGenre)}</div>
        </Section>
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="h3">Popular Movies</h2>
              <Link href="/popular">See all</Link>
            </div>
          }
        >
          <div className="poster-list">{await getPosters("popular", selectedGenre)}</div>
        </Section>
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="h3">Best Rated Movies</h2>
              <Link href="/bestrated">See all</Link>
            </div>
          }
        >
          <div className="poster-list">{await getPosters("bestrated", selectedGenre)}</div>
        </Section>
      </div>
    </main>
  );
}
