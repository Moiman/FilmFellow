import Link from "next/link";
import { findUserById } from "@/services/authService";
import { findUserFavoritesById } from "@/services/favoriteService";
import { notFound } from "next/navigation";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { ReviewThumbnail } from "@/components/reviewThumbnail";
import { ProfileInfo } from "@/components/users/profileInfo";
import { ListButton } from "@/components/users/listButton";

/* For placeholder purposes */
const exampleLists = [
  { id: 1, name: "Favorite horror movies", thumbnail_path: "/", movies: [278, 238, 497] },
  { id: 2, name: "Worst movies ever", thumbnail_path: "/", movies: [278, 155] },
  { id: 3, name: "Movies for Christmas", thumbnail_path: "/", movies: [278, 496243, 769] },
  { id: 4, name: "I'm Batman", thumbnail_path: "/", movies: [155] },
];

export function shuffleMoviesArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default async function userProfile({ params }: { params: { id: string } }) {
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

  const userFavoriteHeader = (
    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <h5>{user.username}&rsquo;s favorites</h5>
      <Link href={`/users/${params.id}/favorites`}>See all</Link>
    </div>
  );

  const userReviewsHeader = (
    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <h5>Latest reviews</h5>
      <Link href={`/users/${params.id}/reviews`}>See all</Link>
    </div>
  );

  return (
    <main className="sidebar-main">
      {/* Sidebar with basic user data and friend list */}
      <Sidebar iconPosition="right">
        <ProfileInfo userId={params.id} />
      </Sidebar>

      <div className="profile-section-wrapper">
        {/* Random assortment of user's favorite movies and link to all favorites */}
        <Section header={userFavoriteHeader}>
          {movieListItems.length > 0 ? (
            <MovieList
              movies={movieListItems.length > 0 ? shuffleMoviesArray(movieListItems).slice(0, 6) : movieListItems}
            />
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
          <div className="list-header">
            <h5>Lists</h5>
          </div>
          <div className="list-wrapper">
            {exampleLists.map(list => (
              <ListButton
                userId={user.id}
                key={list.id}
                list={{ id: list.id, name: list.name, movies: list.movies }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
