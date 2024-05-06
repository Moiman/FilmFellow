import { MovieList } from "@/components/movieList";
import { fetchAllMovies } from "../movieFetches";
import { Section } from "@/components/section";

export default async function New() {
  return (
    <main>
      <Section header={"New"}>
        <MovieList movies={await fetchAllMovies(18, "new")}></MovieList>
      </Section>
    </main>
  );
}
