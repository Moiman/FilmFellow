import Image from "next/image";
import Link from "next/link";

import { type getWatchProvidersByMovieId } from "@/services/movieService";

export const MovieWatchProviders = ({
  watchProviders,
}: {
  watchProviders: Awaited<ReturnType<typeof getWatchProvidersByMovieId>>;
}) => {
  return (
    <div className="movie-streaming-sites">
      {watchProviders.length > 0 && (
        <>
          <div className="centered-logos">
            <p>Watch at</p>
            {watchProviders.map(provider => (
              <Image
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/w45/${provider.logo_path}`}
                width={25}
                height={25}
                title={provider.provider_name}
                alt={provider.provider_name}
              />
            ))}
          </div>

          <div className="centered-logos">
            <p>Provided by</p>
            <Link
              href="https://www.justwatch.com/"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                src="/logos/justwatch_logo.svg"
                height={30}
                width={80}
                alt="JustWatch"
                title="JustWatch"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
