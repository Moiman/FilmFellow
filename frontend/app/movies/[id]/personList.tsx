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
}

export const PersonList = ({ persons }: personListProps) => {
  return (
    <div className="person-list">
      {persons.map(person => (
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
