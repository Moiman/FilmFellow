import fs from "fs";
import zlib from "zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
const streamPipeline = promisify(pipeline);

// const result = await streamToString(stream);
// const data = fs.readFileSync("movie_ids_03_14_2024.json", "utf8");
const movieArray = [];
const today = new Date();
today.setDate(today.getDate() - 1);

const date =
  ("0" + (today.getMonth() + 1)).slice(-2) + "_" + ("0" + today.getDate()).slice(-2) + "_" + today.getFullYear();
console.log(date);

const fetchAndExtractGZ = async () => {
  try {
    const response = await fetch(`http://files.tmdb.org/p/exports/movie_ids_${date}.json.gz`);
    console.log(response.body);
    if (!response.ok) {
      throw response.status;
    }

    const blob = await response.blob();
    const ds = new DecompressionStream("gzip");
    const decompressedStream = blob.stream().pipeThrough(ds);
    const decompressedBlob = await new Response(decompressedStream).blob();
    const text = await decompressedBlob.text();

    const validJSON = "[" + text.replace(/\n+(?=\{)/g, ",\n") + "]";
    console.log(validJSON);
    const movieDatal = JSON.parse(validJSON);
    console.log(validJSON.length);
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
await fetchAndExtractGZ();
