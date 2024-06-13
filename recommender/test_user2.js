fetch("http://localhost:5000/recommender/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ratings: {
      121: 1.0,
      122: 5.0,
      123: 3.5,
      999999: 5.0,
      585: 1.0,
      1892: 4.5,
      238: 5.0,
      13: 1.0,
      105: 2.5,
      348: 2.0,
      679: 2.0,
      489: 4.5,
      155: 1.5,
      1124: 1.0,
      280: 1.5,
      10681: 2.0,
      197: 5.0,
      85: 4.5,
      27205: 4.5,
      857: 1.0,
      562: 1.0,
      603: 1.0,
      24: 1.0,
      497: 1.0,
      77: 1.0,
      888888: 5.0,
    },
    favourites: [761053],
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Result from Python:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
