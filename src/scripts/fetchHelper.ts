export const fetchTMDB = async <T>(url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw response.status;
  }

  const data = (await response.json()) as T;
  return data;
};
