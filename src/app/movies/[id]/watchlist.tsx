"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Film, Star } from "react-feather";
import { toggleWatchlist } from "@/services/watchlistService";

type Props = {
  isInWatchlist: boolean;
  movieId: number;
  title: string;
};

export const Watchlist = ({ movieId, isInWatchlist, title }: Props) => {
  const [watchlist, setWatchlist] = useState<boolean>(isInWatchlist);

  const handleClick = async () => {
    const isInWatchlist = await toggleWatchlist(movieId);
    setWatchlist(isInWatchlist);

    toast(
      <p>
        <span className="highlight-text">{title}</span> {watchlist ? "removed from watchlist" : "added to watchlist"}
      </p>,
      { icon: <Film />, className: "yellow-toast" },
    );
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
