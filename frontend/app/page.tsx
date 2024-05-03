import Link from "next/link";
import { Check } from "react-feather";

import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import { fetchGenres, fetchMovies } from "./movieFetches";
import { MovieList } from "@/components/movieList";

export default async function Home({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const getPosters = async (type: string, genre: string | undefined) => {
    const moviesArr = await fetchMovies(6, type, genre);
    return moviesArr;
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
          <MovieList movies={await getPosters("new", selectedGenre)} />
        </Section>
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="h3">Popular Movies</h2>
              <Link href="/popular">See all</Link>
            </div>
          }
        >
          <MovieList movies={await getPosters("popular", selectedGenre)} />
        </Section>
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="h3">Best Rated Movies</h2>
              <Link href="/bestrated">See all</Link>
            </div>
          }
        >
          <MovieList movies={await getPosters("bestrated", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
