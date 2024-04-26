import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";

export default function userFavorites() {
  return (
    <main>
      <Section header={"User's favorite movies"}>
        <p>Tähän käyttäjän listakomponentti, jonka ulkoasua voi vaihtaa sectionin headerista.</p>
      </Section>
    </main>
  );
}
