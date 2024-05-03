import Link from "next/link";
import Image from "next/image";
import { User } from "react-feather";

type personListItem = {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
};

interface personListProps {
  persons: personListItem[];
}

export const combinePersonData = (persons: personListItem[]): personListItem[] => {
  const combinedPersonsMap: Map<number, personListItem> = new Map();

  persons.forEach(person => {
    if (combinedPersonsMap.has(person.id)) {
      const existingPerson = combinedPersonsMap.get(person.id);
      if (existingPerson) {
        const combinedValue = person.character ?? person.job;
        const existingValue = existingPerson.character ?? existingPerson.job;
        const newValue = existingValue ? `${existingValue}, ${combinedValue}` : combinedValue;

        combinedPersonsMap.set(person.id, {
          ...existingPerson,
          [person.character ? "character" : "job"]: newValue,
        });
      }
    } else {
      combinedPersonsMap.set(person.id, person);
    }
  });

  return Array.from(combinedPersonsMap.values());
};

export const PersonList = ({ persons }: personListProps) => {
  const combinedList = combinePersonData(persons);

  return (
    <div className="person-list">
      {combinedList.slice(0, 8).map(person => (
        <div
          key={person.id}
          className="person-wrapper"
        >
          <Link href={`/persons/${person.id}`}>
            {person.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
                alt={person.name}
                width={250}
                height={250}
                quality={100}
              />
            ) : (
              <div className="profile-path-placeholder" />
            )}
          </Link>
          <p className="person-name">{person.name}</p>
          <p className="person-title">
            {person.character ?? person.character} {person.job ?? person.job}
          </p>
        </div>
      ))}
    </div>
  );
};
