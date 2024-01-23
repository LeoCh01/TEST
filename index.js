const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  express.json(),
  cors({
    origin: "*",
  })
);

// Define your API routes here
app.get("/hi", (req, res) => {
  res.send("Hello, World!");
});

// Parse the CSV file
app.get("/parse", (req, res) => {
  const results = [];
  fs.createReadStream("test.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function csvToJson(fileName) {
  const file = fs.readFileSync(fileName, "utf8");
  const lines = file.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}

console.log(csvToJson("test.csv"));
