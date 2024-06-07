import { getMovieById, getMovieByLimitTypeGenre } from "@/services/movieService";

export const getMovieRecommendations = async (id: number, numRecos: number) => {
  let movieData = await getMovieById(id);
  const response = await fetch("http://localhost:5000/recommender/movie/existing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
  let data = await response.json();
  if (!movieData) {
    return [];
  }
  if (data.length === 0) {
    const response = await fetch("http://localhost:5000/recommender/movie/features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        features: [
          ...movieData.genres,
          ...movieData.directors.map(elem => elem.name),
          ...movieData.cast.map(elem => elem.name),
          movieData.tagline,
          movieData.rating,
        ],
      }),
    });
  }
  data = await response.json();
  console.log(data);
  const recommArr = await getMovieByLimitTypeGenre(numRecos, "", undefined, data);
  return recommArr;
};
