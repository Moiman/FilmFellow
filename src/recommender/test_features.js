fetch("http://127.0.0.1:5000/recommender/movie/features", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    features: [
      "Adventure",
      "Fantasy",
      "lord of the rings",
      "j. r. r. tolkien",
      "tolkien",
      "middle-earth",
      "elf",
      "hobbit",
      "gondor",
      "rohan",
      "rivendell",
      "sauron",
      "saruman",
      "aragorn",
      "legolas",
      "gimli",
      "gandalf",
      "frodo",
      "the shire",
      "mordor",
      "viggo mortensen",
      "elijah wood",
      "orlando bloom",
      "ian mckellen",
      "liv tyler",
      "cate blanchett",
    ],
  }),
})
  .then(response => response.json())
  .then(result => {
    console.log("Result from Python:", JSON.stringify(result));
  })
  .catch(error => {
    console.error("Error:", error);
  });
