import Link from "next/link";
import { Twitter, Instagram, Facebook } from "react-feather";

import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { ReviewThumbnail } from "@/components/users/reviewThumbnail";

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
  { id: 1, name: "List 1", thumbnail_path: "/", movieAmount: "6" },
  { id: 2, name: "List 2", thumbnail_path: "/", movieAmount: "13" },
  { id: 3, name: "List 3", thumbnail_path: "/", movieAmount: "29" },
  { id: 4, name: "List 4", thumbnail_path: "/", movieAmount: "8" },
];

export function shuffleExampleMovies() {
  return exampleFavorites.sort(() => Math.random() - 0.5);
}

export default function userProfile({ params }: { params: { id: string } }) {
  return (
    <main className="sidebar-main">
      {/* Sidebar with basic user data and friend list */}
      <Sidebar iconPosition="right">
        <div className="profile-page-basic-data">
          <h5>Username</h5>
          <div style={{ backgroundColor: "grey", width: "150px", height: "150px", borderRadius: "50%" }} />
          <p className="profile-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, amet. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Quia, esse?
          </p>

          <div className="profile-social-media">
            <div style={{}}>
              <Twitter color="#d75eb5" />
              <p>@username</p>
            </div>

            <div>
              <Instagram color="#ffc700" />
              <p>@username</p>
            </div>

            <div>
              <Facebook color="#74ccca" />
              <p>@username</p>
            </div>
          </div>

          <div className="profile-friend-list">
            <div
              style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
            >
              <h5>Friends</h5>
              <Link href="/friends">See all</Link>
            </div>

            <div className="friends">
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
              <button className="button-friend" />
            </div>
          </div>

          <button className="button-cyan">Add to friends</button>
        </div>
      </Sidebar>

      <div
        style={{
          padding: "40px",
          margin: "0 auto",
          display: "grid",
          alignContent: "flex-start",
          gap: "40px",
        }}
      >
        <Section
          header={
            <div
              style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
            >
              <h5>User favorites</h5>
              <Link href={`/users/${params.id}/favorites`}>See all</Link>
            </div>
          }
        >
          <MovieList movies={shuffleExampleMovies().slice(0, 6)} />
        </Section>

        <Section
          header={
            <div
              style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
            >
              <h5>Latest reviews</h5>
              <Link href={`/users/${params.id}/reviews`}>See all</Link>
            </div>
          }
        >
          <div
            style={{
              gap: "5px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignContent: "start",
            }}
          >
            <ReviewThumbnail />
            <ReviewThumbnail />
          </div>
        </Section>

        <Section header={<h5>Lists</h5>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {exampleLists.map(list => (
              <button
                className="list-style"
                key={list.id}
              >
                <div style={{ height: "40px", aspectRatio: "1", backgroundColor: "darkgrey" }} />
                <div className="list-name">
                  <p>{list.name}</p>
                  <p>{list.movieAmount}</p>
                </div>
              </button>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
