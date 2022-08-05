const express = require("express");
const cors = require("cors");
const app = express();
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
const { Match } = require("./script/index");

app.get("/", async (req, res) => {
  res.json("Bienvenue sur l'api de TennisGame");
});

// Calcule le score
app.post("/score", async (req, res) => {
  try {
    const players = req.body;
    const Points_Generee = players.points.map((point) => {
      return point.result;
    });
    let match = new Match();
    match.start(Points_Generee);
    res.status(200).json({ match: match });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.response });
  }
});

const server = app.listen(4001, () => {
  console.log("Server started");
});
