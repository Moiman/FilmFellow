import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { notFound } from "next/navigation";
import { getUserRecommendations } from "@/services/getUserRecommendations";

export default async function New({ searchParams }: { searchParams?: { genre: string } }) {
  const selectedGenre = searchParams?.genre;
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const recommendations = await getUserRecommendations(selectedGenre, 32);

  return (
    <main>
      <GenreSelector selectedGenre={selectedGenre} />
      <div className="section-wrapper">
        <Section header={"Recommendations"}>
          <MovieList
            movies={recommendations}
            emptyText="No recommendations yet"
          />
        </Section>
      </div>
    </main>
  );
}
