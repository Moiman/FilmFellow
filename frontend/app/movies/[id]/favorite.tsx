"use client";

import { useState } from "react";
import { Heart } from "react-feather";

import { toggleIsFavorite } from "@/services/favoriteService";
import { toast } from "react-toastify";

interface Props {
  isFavorite: boolean;
  movieId: number;
  movieTitle: string;
}

export const Favorite = ({ movieId, isFavorite, movieTitle }: Props) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const handleFavoriteClick = async () => {
    try {
      await toggleIsFavorite(movieId);
      setFavorite(!favorite);

      if (favorite) {
        toast(
          <p>
            <span className="highlight-text">{movieTitle}</span> removed from favorites
          </p>,
          {
            icon: <Heart />,
            className: "yellow-toast",
          },
        );
      } else {
        toast(
          <p>
            <span className="highlight-text">{movieTitle}</span> added to favorites
          </p>,
          {
            icon: <Heart />,
            className: "cyan-toast",
          },
        );
      }
    } catch (err) {
      console.error("Failed to favorite movie", movieId);
      toast.error(<p>Something went wrong!</p>);
    }
  };

  return (
    <button
      className={favorite ? "button-transparent pink" : "button-transparent"}
      onClick={handleFavoriteClick}
    >
      <Heart size={24} />
      {favorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};
