interface MovieIdsType {
  adult: boolean;
  id: number;
  original_title: string;
}

interface PersonIdsType {
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
}

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const yesterdayDate =
  ("0" + (yesterday.getMonth() + 1)).slice(-2) +
  "_" +
  ("0" + yesterday.getDate()).slice(-2) +
  "_" +
  yesterday.getFullYear();

export const fetchMovieIds = async () => {
  try {
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
    console.error("Error fetching movie_ids:", error);
    throw error;
  }
};

export const fetchPersonIds = async () => {
  try {
    const response = await fetch(`http://files.tmdb.org/p/exports/person_ids_${yesterdayDate}.json.gz`);
    if (!response.ok) {
      throw response.status;
    }

    const blob = await response.blob();
    const decompressedStream = blob.stream().pipeThrough(new DecompressionStream("gzip"));
    const decompressedBlob = await new Response(decompressedStream).blob();
    const responseText = await decompressedBlob.text();

    const validPersonsJSON = "[" + responseText.replace(/\n+(?=\{)/g, ",\n") + "]";

    const personsData = JSON.parse(validPersonsJSON) as PersonIdsType[];
    const personIds = personsData.map(person => person.id);

    return personIds;
  } catch (error) {
    console.error("Error fetching person_ids:", error);
    throw error;
  }
};
