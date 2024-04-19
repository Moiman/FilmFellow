"use client";

import { useState } from "react";
import { Star } from "react-feather";

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<boolean>(false);

  return (
    <button
      className={watchlist ? "button-transparent yellow" : "button-transparent"}
      onClick={() => setWatchlist(!watchlist)}
    >
      <Star size={24} />
      {watchlist ? "Remove from watchlist" : "Add to watchlist"}
    </button>
  );
};
