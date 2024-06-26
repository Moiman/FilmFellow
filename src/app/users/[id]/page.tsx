import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { AlertCircle } from "react-feather";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { ProfileInfo } from "./profileInfo";
import { ListButton } from "./listButton";
import { NewListModal } from "./newListModal";
import { ReviewThumbnail } from "@/components/reviewThumbnail";

import { findUserById } from "@/services/userService";
import { findUserFavoritesById } from "@/services/favoriteService";
import { getUserLists } from "@/services/listService";
import { findReviewsByUserId } from "@/services/reviewService";

import { shuffleArray } from "@/utils/shuffleArray";

export default async function userProfile({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = Number(params.id);

  const user = await findUserById(userId);
  const lists = await getUserLists(userId);

  if (!user) {
    notFound();
  }

  const favorites = await findUserFavoritesById(userId);
  const userReviews = await findReviewsByUserId(user.id);

  const userFavoriteHeader = (
    <div className="header-default-style">
      <h3 className="h5">{user.username}&rsquo;s favorites</h3>
      <Link
        href={`/users/${params.id}/favorites`}
        aria-label={`Sell all ${user.username}'s favorite movies`}
      >
        See all
      </Link>
    </div>
  );

  const userReviewsHeader = (
    <div className="header-default-style">
      <h3 className="h5">Latest reviews</h3>
      <Link
        href={`/users/${params.id}/reviews`}
        aria-label={`Sell all reviews by ${user.username}`}
      >
        See all
      </Link>
    </div>
  );

  if (!user.isActive && session?.user.role !== "admin" && user.id !== session?.user.id) {
    return (
      <main style={{ display: "inline-flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        <AlertCircle />
        <p>This user is currently banned.</p>
      </main>
    );
  }

  return (
    <main className="sidebar-main">
      {/* Sidebar with basic user data and friend list */}
      <Sidebar iconPosition="right">
        <ProfileInfo
          userId={user.id}
          friends={user.friends}
        />
      </Sidebar>

      <div className="profile-section-wrapper">
        {/* Random assortment of user's favorite movies and link to all favorites */}
        <Section header={userFavoriteHeader}>
          <MovieList
            emptyText="No favorite movies yet."
            movies={favorites.length > 0 ? shuffleArray(favorites).slice(0, 6) : favorites}
          />
        </Section>

        {/* Thumbnails of user's latest reviews and link to all reviews */}
        <Section header={userReviewsHeader}>
          <div className="review-wrapper">
            {userReviews.length > 0 ? (
              userReviews.slice(0, 4).map(userReview => (
                <ReviewThumbnail
                  key={userReview.id}
                  userReview={userReview}
                />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
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
