import axios, { AxiosError } from "axios";

const apiKey = process.env.API_KEY;
const delay = 20;
const batchSize = 10;
const totalPersons = 100;

interface ResponseData {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

const fetchPersonsData = async () => {
  const fetchPerson = async (personId: number) => {
    try {
      const response = await axios.get<ResponseData>(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`,
      );
      // console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      // console.error(`Error fetching data for person ID ${personId}:`, error.message);
      if (error instanceof AxiosError && error.response && error.response.status === 429) {
        console.log("429");
        await new Promise(resolve => setTimeout(resolve, 1000));
        // return fetchPerson(personId);
        return null;
      }
      return null;
    }
  };

  for (let batchStartId = 1; batchStartId <= totalPersons; batchStartId += batchSize) {
    const batchEndId = Math.min(batchStartId + batchSize - 1, totalPersons);
    const promises = [];
    const personsData: ResponseData[] = [];

    for (let personId = batchStartId; personId <= batchEndId; personId++) {
      promises.push(fetchPerson(personId));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    const results = await Promise.allSettled(promises);

    const filterFulfilled = results.filter(result => result.status === "fulfilled" && result.value !== null);

    filterFulfilled.forEach(person => {
      if (person.status === "fulfilled" && person.value) {
        personsData.push({
          adult: person.value.adult,
          also_known_as: person.value.also_known_as,
          biography: person.value.biography,
          birthday: person.value.birthday,
          deathday: person.value.deathday,
          gender: person.value.gender,
          homepage: person.value.homepage,
          id: person.value.id,
          imdb_id: person.value.imdb_id,
          known_for_department: person.value.known_for_department,
          name: person.value.name,
          place_of_birth: person.value.place_of_birth,
          popularity: person.value.popularity,
          profile_path: person.value.profile_path,
        });
      }
    });

    console.log(`Persons processed: ${batchStartId}-${batchEndId}`);
    console.log(personsData.length);
    // set prisma init services here
  }
  console.log("database filled with persons");
};
void fetchPersonsData();
