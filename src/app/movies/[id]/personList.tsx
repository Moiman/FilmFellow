import Link from "next/link";
import Image from "next/image";
import { User } from "react-feather";

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
  if (persons.length === 0) {
    return <p>No cast/crew to show.</p>;
  }

  return (
    <div className="person-list">
      {persons.map(person => (
        <div
          key={person.job ? person.id + person.job : person.id}
          className="person-wrapper"
        >
          <Link
            href={`/persons/${person.id}`}
            aria-label={`${person.name}`}
          >
            {person.profilePath ? (
              <Image
                src={`https://image.tmdb.org/t/p/h632/${person.profilePath}`}
                alt={person.name}
                width={250}
                height={250}
              />
            ) : (
              <div className="profile-path-placeholder">
                <User />
              </div>
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
