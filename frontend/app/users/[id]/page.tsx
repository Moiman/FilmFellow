import Link from "next/link";
import { findUserById } from "@/services/authService";
import { notFound } from "next/navigation";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { ReviewThumbnail } from "@/components/reviewThumbnail";
import { ProfileIntroduction } from "@/components/users/profileIntroduction";
import { ListButton } from "@/components/users/listButton";

/* For placeholder purposes */
const exampleFavorites = [
  { id: 278, title: "The Shawshank Redemption", poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg" },
  { id: 238, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 240, title: "The Godfather Part II", poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg" },
  { id: 424, title: "Schindler's List", poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg" },
  { id: 389, title: "12 Angry Men", poster_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg" },
  { id: 155, title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 496243, title: "Parasite", poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 497, title: "The Green Mile", poster_path: "/8VG8fDNiy50h5FedGwdSVUPoaJe.jpg" },
  { id: 769, title: "GoodFellas", poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg" },
];

const exampleLists = [
  { id: 1, name: "Favorite horror movies", thumbnail_path: "/", movies: [278, 238, 497] },
  { id: 2, name: "Worst movies ever", thumbnail_path: "/", movies: [278, 155] },
  { id: 3, name: "Movies for Christmas", thumbnail_path: "/", movies: [278, 496243, 769] },
  { id: 4, name: "Best friend's favorites", thumbnail_path: "/", movies: [278, 424, 155] },
  { id: 4, name: "Aliens", thumbnail_path: "/", movies: [389, 238, 155] },
];

export function shuffleExampleMovies() {
  return exampleFavorites.sort(() => Math.random() - 0.5);
}

export default async function userProfile({ params }: { params: { id: number } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

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
        <ProfileIntroduction userId={params.id} />
      </Sidebar>

      <div className="profile-section-wrapper">
        {/* Random assortment of user's favorite movies and link to all favorites */}
        <Section header={userFavoriteHeader}>
          <MovieList movies={shuffleExampleMovies().slice(0, 6)} />
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
