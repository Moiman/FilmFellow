import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

import { Section } from "@/components/section";
import { getList } from "@/services/listService";
import { DeleteList } from "./deleteList";
import { MovieList } from "@/components/movieList";

export default async function List({ params }: { params: { listId: string } }) {
  const session = await getServerSession(authOptions);
  const id = Number(params.listId);

  const list = await getList(id);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return (
    <main className="list">
      <Section
        header={
          <div className="header">
            <h2 className="yellow-name-header h3">
              <Link href={"/users/" + list.userId}>{list.user.username}</Link>&rsquo;s list {list.name}
            </h2>
            {session && (
              <DeleteList
                id={id}
                userId={session.user.id}
              />
            )}
          </div>
        }
      >
        <MovieList movies={movies} />
      </Section>
    </main>
  );
}
