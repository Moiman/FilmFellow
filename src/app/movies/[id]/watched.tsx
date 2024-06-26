"use client";

import { useState } from "react";
import Modal from "@/components/modal";
import { StarRating } from "./starRating";
import { errorToast } from "@/components/errorToast";

interface Props {
  watched: boolean;
  toggleWatched: () => Promise<void>;
  setUserRating: (stars: number | null) => Promise<void>;
  movieTitle: string;
}

export const Watched = ({ watched, toggleWatched, setUserRating, movieTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      await toggleWatched();
      if (!watched) {
        setIsOpen(true);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className={watched ? "button-pink" : ""}
        onClick={handleClick}
        aria-label={watched ? `Remove ${movieTitle} from watched` : `Mark ${movieTitle} as watched`}
      >
        {watched ? "Remove from watched" : "Mark as watched"}
      </button>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        content={
          <div
            className="modal-content"
            style={{ alignItems: "center", gap: "20px" }}
          >
            <h5>
              Do you want to rate <span className="yellow">{movieTitle}</span> ?
            </h5>
            <StarRating
              rating={null}
              setRating={async (stars: number) => {
                await setUserRating(stars);
                closeModal();
              }}
              size={45}
            />
            <button
              onClick={closeModal}
              className="button-pink"
              aria-label="Mark the movie as watched without leaving a rating"
            >
              No thanks!
            </button>
          </div>
        }
      />
    </>
  );
};
