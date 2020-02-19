const express = require("express");
const cors = require("cors");
const data = require("./data.json");

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function loadRandomQuiz(page) {
  return { response_code: 0, results: getRandom(data.results, page) };
}

// create server
const server = express();
const port = 4000;

// GET question endpoint
server.get("/api/questions", cors(), (req, res) => {
  let page = req.query.page;
  res.json(loadRandomQuiz(page));
});

// starting server
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
