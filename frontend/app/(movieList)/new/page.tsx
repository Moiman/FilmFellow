import { MovieList } from "@/components/movieList";
import { fetchMovies } from "../../movieFetches";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />
      <div className="section-wrapper">
        <Section header={"New"}>
          <MovieList movies={await fetchMovies(18, "new", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
