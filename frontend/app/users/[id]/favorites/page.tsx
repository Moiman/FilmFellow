import Link from "next/link";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { shuffleExampleMovies } from "@/app/users/[id]/page";

export default function userFavorites({ params }: { params: { id: string } }) {
  return (
    <main>
      <Section
        header={
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>User</Link>&rsquo;s favorites
          </h3>
        }
      >
        <MovieList movies={shuffleExampleMovies()} />
      </Section>
    </main>
  );
}
