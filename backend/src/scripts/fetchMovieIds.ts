import fs from "fs";
import zlib from "zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
const streamPipeline = promisify(pipeline);
// const data = fs.readFileSync("movie_ids_03_14_2024.json", "utf8");
const movieArray = [];
const today = new Date();
today.setDate(today.getDate() - 1);

const formattedDate = today.toISOString().split("T")[0].replaceAll("-", "_").split("_");
const rearrangedDate = `${formattedDate[1]}_${formattedDate[2]}_${formattedDate[0]}`;
console.log(rearrangedDate);

const fetchAndExtractGZ = async () => {
  try {
    const response = await fetch(`http://files.tmdb.org/p/exports/movie_ids_${rearrangedDate}.json.gz`);
    console.log(response.body);
    if (!response.ok) {
      throw response.status;
    }
    const gunzip = zlib.createGunzip();
    streamPipeline(response.body, gunzip);
    const output = fs.createWriteStream("./movieids.json");

    const writeStream = gunzip.pipe(output);
    writeStream.on("close", () => {
      const writtenFile = fs.readFileSync("./movieids.json");
      console.log(writtenFile.length);
      // const validJSON: string = "[" + data.replace(/\n+(?=\{)/g, ",\n") + "]";
      // const movieData = JSON.parse(validJSON);
      // console.log(movieData);
      // let movieIds = movieData.map(movie => movie.id);
      // console.log(movieIds.length);
    });

  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
await fetchAndExtractGZ();
