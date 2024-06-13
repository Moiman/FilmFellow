fetch("http://localhost:5000/recommender/movie/features", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ features: ["johhny depp", "orlando bloom", "keira knightley"] }),
})
  .then(response => response.json())
  .then(result => {
    console.log("Result from Python:", JSON.stringify(result));
  })
  .catch(error => {
    console.error("Error:", error);
  });
