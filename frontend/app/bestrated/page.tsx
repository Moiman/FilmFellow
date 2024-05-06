import { MovieList } from "@/components/movieList";
import { fetchAllMovies } from "../movieFetches";
import { Section } from "@/components/section";

export default async function BestRated() {
  return (
    <main>
      <Section header={"Best Rated"}>
        <MovieList movies={await fetchAllMovies(18, "bestrated")}></MovieList>
      </Section>
    </main>
  );
}
