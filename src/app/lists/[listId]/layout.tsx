import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { getList } from "@/services/listService";
import { DeleteList } from "./deleteList";
import { RenameList } from "./renameList";
import { getIsListReported } from "@/services/reportService";
import ListStyleLinks from "./listStyleLinks";

export default async function Layout({ params, children }: { params: { listId: string }; children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const id = Number(params.listId);

  const list = await getList(params.listId);

  if (!list) {
    notFound();
  }

  return (
    <main className="list">
      <Section
        header={
          <div className={session ? "header" : "header-visitor"}>
            <div className="list-title">
              <h2 className="yellow-name-header h3">
                <Link href={"/users/" + list.userId}>{list.user.username}</Link>&rsquo;s {list.name}
              </h2>
            </div>

            {session && session.user.id === list.userId && !Number.isNaN(id) && (
              <div className="list-edit">
                <RenameList id={id} />
                <DeleteList
                  name={list.name}
                  id={id}
                  userId={session.user.id}
                />
              </div>
            )}

            {session &&
              session.user.id !== list.userId &&
              !Number.isNaN(id) &&
              !(await getIsListReported(Number(list.id))) && (
                <div className="list-edit">
                  <form action={`/report/list/${list.id}`}>
                    <button
                      type="submit"
                      className="button-transparent"
                      aria-label="Report this list"
                    >
                      <Flag
                        className="pink-icon"
                        size={20}
                      />
                    </button>
                  </form>
                </div>
              )}

            <div className="highlight-nav list-styles">
              <ListStyleLinks listId={list.id} />
            </div>
          </div>
        }
      >
        {children}
      </Section>
    </main>
  );
}
