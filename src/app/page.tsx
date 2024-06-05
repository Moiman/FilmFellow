import Link from "next/link";
import { Section } from "@/components/section";
import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { MovieList } from "@/components/movieList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import GenreSelector from "@/components/genreSelector";
import { getUserRecommendations } from "@/recommender/getUserRecommendations";
import { isRecommendations } from "@/recommender/isRecommendations";

export default async function Home({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const getPosters = async (type: string, genre: string | undefined) => {
    const moviesArr = await getMovieByLimitTypeGenre(6, type, genre);
    return moviesArr;
  };
  const session = await getServerSession(authOptions);

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />

      <div className="section-wrapper">
        {session && (await isRecommendations()) && (
          <Section
            header={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="h3">Recommendations</h2>
                <Link href="/recommendations">See all</Link>
              </div>
            }
          >
            <MovieList movies={await getUserRecommendations(selectedGenre, 6)} />
          </Section>
        )}
        <Section
          header={
            <div className="header-default-style">
              <h2 className="h3">New Movies</h2>
              <Link href="/new">See all</Link>
            </div>
          }
        >
          <MovieList movies={await getPosters("new", selectedGenre)} />
        </Section>
        <Section
          header={
            <div className="header-default-style">
              <h2 className="h3">Popular Movies</h2>
              <Link href="/popular">See all</Link>
            </div>
          }
        >
          <MovieList movies={await getPosters("popular", selectedGenre)} />
        </Section>
        <Section
          header={
            <div className="header-default-style">
              <h2 className="h3">Best Rated Movies</h2>
              <Link href="/bestrated">See all</Link>
            </div>
          }
        >
          <MovieList movies={await getPosters("bestrated", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
