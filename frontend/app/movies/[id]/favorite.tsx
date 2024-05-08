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
        toast.success(<p>{movieTitle} added to favorites</p>);
      } else {
        toast(<p>{movieTitle} removed from favorites</p>);
      }
    } catch (err) {
      console.error("Failed to favorite movie", movieId);
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
