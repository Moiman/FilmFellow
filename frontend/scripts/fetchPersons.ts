import { Persons } from "@prisma/client";
import { fetchTMDB } from "./fetchHelper.js";

const apiKey = process.env.API_KEY;
let delay = 25;
const waitAfter429 = 4000;

export interface PersonData {
  adult: boolean;
  biography: string;
  birthday: string | null;
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

const parsePersonData = (personData: PersonResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { also_known_as, birthday, deathday, ...restOfPerson } = personData;
  return {
    birthday: birthday ? new Date(birthday) : null,
    deathday: deathday ? new Date(deathday) : null,
    ...restOfPerson,
  };
};

const fetchPerson = async (personId: number) =>
  fetchTMDB<PersonResponse>(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);

let processedPersons = 0;
let retry = false;
export const fetchPersonsData = async (
  personIds: number[],
  storeFunction: (person: Persons) => Promise<void> | void,
) => {
  for (const personId of personIds) {
    await new Promise(resolve => setTimeout(resolve, delay));
    if (retry) {
      await new Promise(resolve => setTimeout(resolve, waitAfter429));
      retry = false;
    }

    fetchPerson(personId)
      .then(async personData => {
        await storeFunction(parsePersonData(personData));
      })
      .catch(async err => {
        if (err === 429) {
          console.log("Got 429. Tying to fetch person =", personId, "again and increasing delay to", delay + 1, "ms");
          delay++;
          retry = true;
          await new Promise(resolve => setTimeout(resolve, waitAfter429));
          fetchPerson(personId)
            .then(async personData => {
              await storeFunction(parsePersonData(personData));
              console.log("Fetched =", personId, "again successfully");
            })
            .catch(err => {
              console.error("Fatal: Failed again to fetch person =", personId);
              throw err;
            });
        } else {
          console.error("Fatal: Failed to fetch person =", personId);
          throw err;
        }
      });

    processedPersons++;
    if (processedPersons % 1000 === 0) {
      console.log(`Persons processed: ${Math.trunc((processedPersons / personIds.length) * 100 * 100) / 100}%`);
    }
  }

  console.log("Fetched persons");
};
