fetch("http://0.0.0.0:5000/recommender/movie/existing", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ TMDB_id: 671 }),
})
  .then(response => response.json())
  .then(result => {
    console.log("Result from Python:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
