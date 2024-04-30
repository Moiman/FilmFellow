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
  const movieListItems = favorites
    ? favorites.map(movie => {
        return { id: movie.id, title: movie.title, poster_path: movie.poster_path };
      })
    : [];

  return (
    <main>
      <Section
        header={
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s favorites
          </h3>
        }
      >
        {movieListItems.length > 0 ? (
          <MovieList movies={shuffleMoviesArray(movieListItems)} />
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </Section>
    </main>
  );
}
