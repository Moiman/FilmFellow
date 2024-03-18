interface MovieIdsType {
  adult: boolean;
  id: number;
  original_title: string;
}

export const fetchMovieIds = async () => {
  try {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const yesterdayDate =
      ("0" + (yesterday.getMonth() + 1)).slice(-2) +
      "_" +
      ("0" + yesterday.getDate()).slice(-2) +
      "_" +
      yesterday.getFullYear();

    const response = await fetch(`http://files.tmdb.org/p/exports/movie_ids_${yesterdayDate}.json.gz`);
    if (!response.ok) {
      throw response.status;
    }

    const blob = await response.blob();
    const decompressedStream = blob.stream().pipeThrough(new DecompressionStream("gzip"));
    const decompressedBlob = await new Response(decompressedStream).blob();
    const responseText = await decompressedBlob.text();

    const validMovieJSON = "[" + responseText.replace(/\n+(?=\{)/g, ",\n") + "]";

    const movieData = JSON.parse(validMovieJSON) as MovieIdsType[];
    const movieIds = movieData.map(movie => movie.id);

    return movieIds;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
