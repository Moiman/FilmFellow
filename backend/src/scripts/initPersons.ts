import { initPersonDB } from "../services/initService.js";

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

const fetchPersonsData = (personIds: number[]) => {
  const personsData: PersonData[] = [];
  personIds.forEach(async personId => {
    await new Promise(resolve => setTimeout(resolve, delay));

    fetchPerson(personId)
      .then(async personData => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { also_known_as, ...person } = personData;
        await initPersonDB(person);
        personsData.push({
          adult: personData.adult,
          biography: personData.biography,
          birthday: personData.birthday,
          deathday: personData.deathday,
          gender: personData.gender,
          homepage: personData.homepage,
          id: personData.id,
          imdb_id: personData.imdb_id,
          known_for_department: personData.known_for_department,
          name: personData.name,
          place_of_birth: personData.place_of_birth,
          popularity: personData.popularity,
          profile_path: personData.profile_path,
        });
      })
      .catch(err => console.error(err));

    if (personId % 100 === 0) {
      console.log(`Persons processed: ${personId - 99}-${personId}`);
    }
    // set prisma init services here
  });
  console.log(personsData.length);
  console.log("database filled with persons");
};
fetchPersonsData([5, 7, 8]);
