fetch("http://localhost:5000/recommender/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ratings: { 121: 5.0, 122: 1.0 },
    favourites: [
      123, 77, 1892, 89, 2493, 1891, 9806, 745, 27205, 238, 329, 11, 105, 197,
      348, 1124, 120, 673, 857, 679, 762, 272, 12, 13, 629, 550, 562, 10681,
      155, 1422, 98, 489, 807, 280, 218, 2501, 73, 603, 424, 278, 22, 497, 274,
      680, 862, 85, 585, 101,
    ],
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Result from Python:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
