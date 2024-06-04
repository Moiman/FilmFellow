import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";
import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { notFound } from "next/navigation";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const ratingsFavourites = await getUserOwnFavoritesAndRatings();
  console.log(ratingsFavourites);
  // const response = await fetch("http://localhost:5000/recommender/user", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     ratings: ratings,
  //     favourites: favourites,
  //   }),
  // });
  // const data = await response.json();
  // console.log(data);

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />
      <div className="section-wrapper">
        <Section header={"Recommendations"}>
          <MovieList movies={await getMovieByLimitTypeGenre(18, "new", selectedGenre)} />
        </Section>
      </div>
    </main>
  );
}
