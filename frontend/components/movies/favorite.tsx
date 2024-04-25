"use client";

import { useState } from "react";
import { Heart } from "react-feather";

import { toggleIsFavorite } from "@/services/favoriteService";

interface Props {
  isFavorite: boolean;
  movieId: number;
}

export const Favorite = ({ movieId, isFavorite }: Props) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const handleFavoriteClick = async () => {
    try {
      await toggleIsFavorite(movieId);
      setFavorite(!favorite);
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