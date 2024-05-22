import { useEffect, useState } from "react";
import Image from "next/image";

import { getWatchProvidersByMovieId } from "@/services/movieService";

export const MovieWatchProviders = ({ id }: { id: number }) => {
  const [providers, setProviders] = useState<Awaited<ReturnType<typeof getWatchProvidersByMovieId>>>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const providersData = await getWatchProvidersByMovieId(id);
      setProviders(providersData);
    };

    fetchProviders();
  }, [id]);

  return (
    <div className="movie-streaming-sites">
      {providers.length > 0 && (
        <>
          <p>Watch at:</p>
          {providers.map(provider => (
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
