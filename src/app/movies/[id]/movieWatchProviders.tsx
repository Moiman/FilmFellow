import { useEffect, useState } from "react";
import Image from "next/image";

import { getWatchProvidersByMovieId } from "@/services/movieService";

export const MovieWatchProviders = ({ id }: { id: number }) => {
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providersData = await getWatchProvidersByMovieId(id);
        setProviders(providersData);
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      }
    };

    fetchProviders();
  }, [id]);

  return (
    <div className="movie-streaming-sites">
      <p>Watch at:</p>
      {providers.map(provider => (
        <Image
          key={provider.watchProvider.provider_name}
          src={`https://image.tmdb.org/t/p/w45/${provider.watchProvider.logo_path}`}
          width={30}
          height={30}
          title={provider.watchProvider.provider_name}
          alt={provider.watchProvider.provider_name}
          style={{ borderRadius: "100%" }}
        />
      ))}
    </div>
  );
};
