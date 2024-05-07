import { MovieList } from "@/components/movieList";
import { fetchMovies } from "../movieFetches";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;

  return (
    <main>
      <div>
        <GenreSelector genre={selectedGenre} />
      </div>
      <div className="section-wrapper">
        <Section header={"Best Rated"}>
          <MovieList movies={await fetchMovies(18, "bestrated", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
