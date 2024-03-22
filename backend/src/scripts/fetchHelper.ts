export const fetchTMDB = async <T>(url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchMovie(movieId);
    }
    throw error;
  }
};
