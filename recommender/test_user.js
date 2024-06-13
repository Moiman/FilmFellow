fetch("http://localhost:5000/recommender/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ratings: {},
    favourites: [121],
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Result from Python:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
