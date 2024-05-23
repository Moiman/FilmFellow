import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { ReviewThumbnail } from "@/components/reviewThumbnail";
import { findUserById } from "@/services/userService";
import { findUserFavoritesById } from "@/services/favoriteService";
import { getUserLists } from "@/services/listService";
import { ProfileInfo } from "./profileInfo";
import { ListButton } from "./listButton";
import { NewListModal } from "./newListModal";

export function shuffleArray(array: any[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

export default async function userProfile({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = Number(params.id);

  const user = await findUserById(userId);
  const lists = await getUserLists(userId);

  if (!user) {
    notFound();
  }
  const favorites = await findUserFavoritesById(userId);

  const userFavoriteHeader = (
    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <h3 className="h5">{user.username}&rsquo;s favorites</h3>
      <Link href={`/users/${params.id}/favorites`}>See all</Link>
    </div>
  );

  const userReviewsHeader = (
    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <h3 className="h5">Latest reviews</h3>
      <Link href={`/users/${params.id}/reviews`}>See all</Link>
    </div>
  );

  return (
    <main className="sidebar-main">
      {/* Sidebar with basic user data and friend list */}
      <Sidebar iconPosition="right">
        <ProfileInfo userId={user.id} />
      </Sidebar>

      <div className="profile-section-wrapper">
        {/* Random assortment of user's favorite movies and link to all favorites */}
        <Section header={userFavoriteHeader}>
          {favorites.length > 0 ? (
            <MovieList movies={favorites.length > 0 ? shuffleArray(favorites).slice(0, 6) : favorites} />
          ) : (
            <p>No favorite movies yet.</p>
          )}
        </Section>

        {/* Thumbnails of user's latest reviews and link to all reviews */}
        <Section header={userReviewsHeader}>
          <div className="review-wrapper">
            <ReviewThumbnail />
            <ReviewThumbnail />
          </div>
        </Section>

        {/* User-made lists */}
        <div className="section">
          <div
            className="section-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 className="h5">Lists</h3>
            {Number(session?.user.id) === userId && <NewListModal />}
          </div>
          <div className="list-wrapper">
            {lists.map(list => (
              <ListButton
                key={list.id}
                list={list}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
