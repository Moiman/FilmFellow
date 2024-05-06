import Link from "next/link";
import Image from "next/image";

type personListItem = {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
};

interface personListProps {
  persons: personListItem[];
  amount?: number;
}

const combinePersonData = (persons: personListItem[]): personListItem[] => {
  const combinedPersons: personListItem[] = [];

  persons.forEach(person => {
    const existingIndex = combinedPersons.findIndex(p => p.id === person.id);

    if (existingIndex !== -1) {
      const existingPerson = combinedPersons[existingIndex];
      const combinedValue = person.character ?? person.job;
      const existingValue = existingPerson.character ?? existingPerson.job;
      const newValue = existingValue ? `${existingValue}, ${combinedValue}` : combinedValue;

      combinedPersons[existingIndex] = {
        ...existingPerson,
        [person.character ? "character" : "job"]: newValue,
      };
    } else {
      combinedPersons.push(person);
    }
  });

  return combinedPersons;
};

export const PersonList = ({ persons, amount }: personListProps) => {
  const combinedList = combinePersonData(persons);

  return (
    <div className="person-list">
      {amount
        ? combinedList.slice(0, 6).map(person => (
            <div
              key={person.id}
              className="person-wrapper"
            >
              <Link href={`/persons/${person.id}`}>
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/h632/${person.profile_path}`}
                    alt={person.name}
                    width={250}
                    height={250}
                  />
                ) : (
                  <div className="profile-path-placeholder" />
                )}
              </Link>
              <p className="person-name">{person.name}</p>
              <p className="person-title">
                {person.character && person.character} {person.job && person.job}
              </p>
            </div>
          ))
        : combinedList.map(person => (
            <div
              key={person.id}
              className="person-wrapper"
            >
              <Link href={`/persons/${person.id}`}>
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/h632/${person.profile_path}`}
                    alt={person.name}
                    width={250}
                    height={250}
                  />
                ) : (
                  <div className="profile-path-placeholder" />
                )}
              </Link>
              <p className="person-name">{person.name}</p>
              <p className="person-title">
                {person.character && person.character} {person.job && person.job}
              </p>
            </div>
          ))}
    </div>
  );
};
