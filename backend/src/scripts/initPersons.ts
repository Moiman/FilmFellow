import { fetchTMDB } from "./fetchHelper.js";

const apiKey = process.env.API_KEY;
const delay = 30;

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

interface PersonResponse extends PersonData {
  also_known_as: string[];
}

const fetchPerson = async (personId: number) =>
  fetchTMDB<PersonResponse>(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);

let processedPersons = 1;
export const fetchPersonsData = async (personIds: number[], storeFunction: (person: PersonData) => Promise<void>) => {
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
