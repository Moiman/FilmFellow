import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { List, Grid, Table } from "react-feather";

import { Section } from "@/components/section";
import { getList } from "@/services/listService";
import { DeleteList } from "../deleteList";
import { RenameList } from "../renameList";
import { MovieGrid } from "../movieGrid";

export default async function GridPage({ params }: { params: { listId: string } }) {
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
              <Link href={`/lists/${list.id}/`}>
                <Grid size={20} />
              </Link>
              <Link href={`/lists/${list.id}/catalogue`}>
                <List size={20} />
              </Link>
              <Link href={`/lists/${list.id}/grid`}>
                <Table size={20} />
              </Link>
            </div>
          </div>
        }
      >
        <MovieGrid movies={movies} />
      </Section>
    </main>
  );
}
