import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { notFound } from "next/navigation";
import { getUserRecommendations } from "@/recommender/getUserRecommendations";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />
      <div className="section-wrapper">
        <Section header={"Recommendations"}>
          <MovieList movies={await getUserRecommendations(selectedGenre, 18)} />
        </Section>
      </div>
    </main>
  );
}
