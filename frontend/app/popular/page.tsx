import { MovieList } from "@/components/movieList";
import { fetchAllMovies } from "../movieFetches";
import { Section } from "@/components/section";

export default async function Popular() {
  return (
    <main>
      <Section header={"Popular"}>
        <MovieList movies={await fetchAllMovies(18, "popular")}></MovieList>
      </Section>
    </main>
  );
}
