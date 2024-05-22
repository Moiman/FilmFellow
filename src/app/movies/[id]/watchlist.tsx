"use client";

import { useState } from "react";
import { Star } from "react-feather";
import { toggleWatchlist } from "@/services/watchlistService";

type Props = {
  isInWatchlist: boolean;
  movieId: number;
};

export const Watchlist = ({ movieId, isInWatchlist }: Props) => {
  const [watchlist, setWatchlist] = useState<boolean>(isInWatchlist);

  const handleClick = async () => {
    const isInWatchlist = await toggleWatchlist(movieId);
    setWatchlist(isInWatchlist);
  };

  return (
    <button
      className={watchlist ? "button-transparent yellow" : "button-transparent"}
      onClick={handleClick}
    >
      <Star size={24} />
      {watchlist ? "Remove from watchlist" : "Add to watchlist"}
    </button>
  );
};
