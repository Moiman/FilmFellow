import Link from "next/link";
import { findUserById } from "@/services/userService";
import { findUserFavoritesById } from "@/services/favoriteService";

import { notFound } from "next/navigation";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { shuffleArray } from "@/app/users/[id]/page";

export default async function userFavorites({ params }: { params: { id: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

  const favorites = await findUserFavoritesById(Number(params.id));

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header h3">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s favorites
          </h2>
        }
      >
        <MovieList
          emptyText="No favorite movies yet."
          movies={shuffleArray(favorites)}
        />
      </Section>
    </main>
  );
}
