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
        toast.success(
          <p>
            <span className="yellow">{movieTitle}</span> removed from favorites
          </p>,
        );
      } else {
        toast.success(
          <p>
            <span className="yellow">{movieTitle}</span> added to favorites
          </p>,
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
