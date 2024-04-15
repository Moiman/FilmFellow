import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export default function frontPageVisitor() {
  //temp arr
  const arr = ["test.jpg", "test.jpg", "test.jpg", "test.jpg", "test.jpg", "test.jpg"];

  const fetchNewMovies = () => {
    //query DB for newest X movies
    //return an array of movie IDs and poster paths
  };

  const fetchPopularMovies = () => {
    //query DB for X popular movies
    //return an array of movie IDs and poster paths
  };

  const fetchBestRatedMovies = () => {
    //query DB for X best rated movies
    //return an array of movie IDs and poster paths
  };

  //returns images of posters
  const getPosters = () => {
    return arr.map(i => (
      <Link
        href={`/testpage`}
        key={`${i}`}
      >
        <Image
          className="poster"
          src={`/${i}`}
          alt="picture of the movie poster"
          //proper size?
          width={200}
          height={250}
          //needs a proper ID, poster pathname?
        />
      </Link>
    ));
  };

  return (
    <main>
      <Section
        header={
          <div>
            <h2>New Movies</h2>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        {getPosters()}
      </Section>
      <Section header={<h2>Popular movies</h2>}>{getPosters()}</Section>
      <Section header={<h2>Best Rated Movies</h2>}>{getPosters()}</Section>
    </main>
  );
}
