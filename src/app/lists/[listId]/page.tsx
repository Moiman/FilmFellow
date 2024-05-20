import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { List, Grid, Table } from "react-feather";

import { Section } from "@/components/section";
import { getList } from "@/services/listService";
import { DeleteList } from "./deleteList";
import { MovieList } from "@/components/movieList";
import { RenameList } from "./renameList";
import { MovieCatalogue } from "./movieCatalogue";
import { MovieGrid } from "./movieGrid";

export default async function ListPage({ params }: { params: { listId: string } }) {
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
            <div className="list-title">
              <h2 className="yellow-name-header h3">
                <Link href={"/users/" + list.userId}>{list.user.username}</Link>&rsquo;s {list.name}
              </h2>
              <p className="movie-amount">{movies.length}</p>
            </div>

            {session && session.user.id === list.userId && (
              <div className="list-edit">
                <RenameList id={id} />
                <DeleteList
                  name={list.name}
                  id={id}
                  userId={session.user.id}
                />
              </div>
            )}

            <div className="highlight-nav list-styles">
              <Grid size={20} />
              <List size={20} />
              <Table size={20} />
            </div>
          </div>
        }
      >
        <MovieList movies={movies} />
        <MovieCatalogue movies={movies} />
        <MovieGrid movies={movies} />
      </Section>
    </main>
  );
}
