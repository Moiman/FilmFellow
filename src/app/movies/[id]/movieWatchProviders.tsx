import Image from "next/image";

import { getWatchProvidersByMovieId } from "@/services/movieService";

export const MovieWatchProviders = ({
  watchProviders,
}: {
  watchProviders: Awaited<ReturnType<typeof getWatchProvidersByMovieId>>;
}) => {
  return (
    <div className="movie-streaming-sites">
      {watchProviders.length > 0 && (
        <>
          <p>Watch at:</p>
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
        </>
      )}
    </div>
  );
};
