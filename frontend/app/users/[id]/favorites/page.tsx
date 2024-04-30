import Link from "next/link";
import { findUserById } from "@/services/authService";
import { findUserFavoritesById } from "@/services/favoriteService";

import { notFound } from "next/navigation";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { shuffleMoviesArray } from "@/app/users/[id]/page";

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
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s favorites
          </h3>
        }
      >
        {favorites.length > 0 ? <MovieList movies={shuffleMoviesArray(favorites)} /> : <p>No favorite movies yet.</p>}
      </Section>
    </main>
  );
}
