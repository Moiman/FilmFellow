import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />
      <div className="section-wrapper">
        <Section header={"Popular"}>
          <MovieList movies={await getMovieByLimitTypeGenre(36, "popular", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
