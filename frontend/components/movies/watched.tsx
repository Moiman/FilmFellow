"use client";

import { useState } from "react";

export const Watched = () => {
  const [watched, setWatched] = useState<boolean>(false);

  return (
    <button
      className={watched ? "button-pink" : ""}
      onClick={() => setWatched(!watched)}
    >
      {watched ? "Remove from watched" : "Mark as watched"}
    </button>
  );
};
