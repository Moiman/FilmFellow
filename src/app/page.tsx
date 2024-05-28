import Link from "next/link";
import { Section } from "@/components/section";
import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { MovieList } from "@/components/movieList";
import GenreSelector from "@/components/genreSelector";

export default async function Home({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const getPosters = async (type: string, genre: string | undefined) => {
    const moviesArr = await getMovieByLimitTypeGenre(6, type, genre);
    return moviesArr;
  };

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />

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
