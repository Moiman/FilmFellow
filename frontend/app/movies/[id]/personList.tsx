import Link from "next/link";
import Image from "next/image";

type personListItem = {
  id: number;
  name: string;
  profilePath: string | null;
  character?: string;
  job?: string;
};

interface personListProps {
  persons: personListItem[];
}

export const PersonList = ({ persons }: personListProps) => {
  return (
    <div className="person-list">
      {persons.map(person => (
        <div
          key={person.job ? person.id + "-" + person.job : person.id}
          className="person-wrapper"
        >
          <Link href={`/persons/${person.id}`}>
            {person.profilePath ? (
              <Image
                src={`https://image.tmdb.org/t/p/h632/${person.profilePath}`}
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
