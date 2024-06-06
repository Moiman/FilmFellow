"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Star } from "react-feather";
import { toggleWatchlist } from "@/services/watchlistService";
import { errorToast } from "@/components/errorToast";

type Props = {
  isInWatchlist: boolean;
  movieId: number;
  title: string;
};

export const Watchlist = ({ movieId, isInWatchlist, title }: Props) => {
  const [watchlist, setWatchlist] = useState<boolean>(isInWatchlist);

  const handleClick = async () => {
    try {
      const isInWatchlist = await toggleWatchlist(movieId);
      setWatchlist(isInWatchlist);

      toast(
        <p>
          <span className="highlight-text">{title}</span> {watchlist ? "removed from watchlist" : "added to watchlist"}
        </p>,
        {
          icon: <Star className={watchlist ? "yellow-icon-filled" : "cyan-icon-filled"} />,
          className: watchlist ? "yellow-toast" : "cyan-toast",
        },
      );
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <button
      className={watchlist ? "button-transparent yellow" : "button-transparent"}
      onClick={handleClick}
      aria-label={watchlist ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
    >
      <Star size={24} />
      {watchlist ? "Remove from watchlist" : "Add to watchlist"}
    </button>
  );
};
