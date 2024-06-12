import { getMovieById, getMovieByLimitTypeGenre } from "@/services/movieService";

export const getMovieRecommendations = async (id: number, numRecos: number) => {
  const movieData = await getMovieById(id);
  let data = [];
  if (!movieData) {
    return [];
  }
  try {
    const response = await fetch("http://localhost:5000/recommender/movie/existing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TMDB_id: id,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
    }
    const recommArr = await getMovieByLimitTypeGenre(numRecos, "", undefined, data);
    return recommArr;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
