import { initPersonDB } from "../services/initService.js";
import { fetchMoviesData } from "./initMovies.js";

const apiKey = process.env.API_KEY;
const delay = 20;

export interface PersonData {
  adult: boolean;
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

interface ResponseData extends PersonData {
  also_known_as: string[];
}

const fetchPerson = async (personId: number) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);

    if (!response.ok) {
      throw response.status;
    }

    const data = (await response.json()) as ResponseData;

    return data;
  } catch (error) {
    // console.error(`Error fetching data for person ID ${personId}:`, error.message);
    if (error === 429) {
      console.log("429");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // return fetchPerson(personId);
    }
    throw error;
  }
};

let processedPersons = 1;
export const fetchPersonsData = async (personIds: number[], storeFunction = initPersonDB) => {
  for (const personId of personIds) {
    await new Promise(resolve => setTimeout(resolve, delay));

    fetchPerson(personId)
      .then(async personData => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { also_known_as, ...person } = personData;
        await storeFunction(person);
      })
      .catch(err => console.error(err));

    if (processedPersons % 1000 === 0) {
      console.log(`Persons processed: ${processedPersons}`);
    }
    processedPersons++;
  }
  console.log("database filled with persons");
};
const crewAndCastIds = await fetchMoviesData([2, 3]);
await fetchPersonsData(crewAndCastIds);
