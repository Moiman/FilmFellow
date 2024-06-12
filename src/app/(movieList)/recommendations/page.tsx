import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

import { Section } from "@/components/section";
import GenreSelector from "@/components/genreSelector";
import RecommendationsList from "@/components/recommendationsList";

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
          <RecommendationsList
            limit={36}
            selectedGenre={selectedGenre}
          />
        </Section>
      </div>
    </main>
  );
}
