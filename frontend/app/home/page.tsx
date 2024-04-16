import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function frontPageVisitor() {
  interface MoviePosters {
    movieId: number;
    posterPath: string;
  }
  //temp arr

  const movieArr = [
    { movieID: 245891, posterPath: "test.jpg" },
    { movieID: 555, posterPath: "test.jpg" },
    { movieID: 1396, posterPath: "test.jpg" },
    { movieID: 238, posterPath: "test.jpg" },
    { movieID: 13, posterPath: "test.jpg" },
  ];

  const fetchPosters = () => {
    return;
  };

  const fetchNewMovies = () => {};

  const fetchPopularMovies = () => {};

  const fetchBestRatedMovies = () => {};

  //returns images of posters
  const getPosters = () => {
    return movieArr.map(i => (
      <Link
        className="poster-background"
        //movie page link
        href={`/test.jpg`}
        key={`${i.movieID}`}
        //needs a proper key, poster pathname
      >
        <Image
          className="poster"
          src={`/${i.posterPath}`}
          alt="picture of the movie poster"
          width={150}
          height={225}
        />
      </Link>
    ));
  };

  return (
    <main>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>New Movies</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{getPosters()}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Popular Movies</h3>
            <Link href={"/popular"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{getPosters()}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Best Rated Movies</h3>
            <Link href={"/bestrated"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{getPosters()}</div>
      </Section>
    </main>
  );
}
