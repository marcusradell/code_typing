import express from "express";
import { v4 } from "uuid";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let challenges: { id: string; name: string }[] = [
  { id: "6e2929e1-f1b4-460c-ad7f-c5c77ed1b32d", name: "Hello World!" },
];

app.get("/challenge/list", (req, res) => {
  res.json(challenges);
});

app.get("/challenge/display", (req, res) => {
  const id = req.query.id;

  if (!id) return res.sendStatus(400);

  const challenge = challenges.find((challenge) => challenge.id === id);

  if (!challenge) return res.sendStatus(400);

  res.json(challenge);
});

app.post("/challenge/add", (req, res) => {
  const { name } = req.body;
  challenges.push({ name, id: v4() });
  res.sendStatus(200);
});

app.post("/challenge/remove", (req, res) => {
  const { id } = req.body;

  if (!id) return res.sendStatus(400);

  challenges = challenges.filter((challenge) => challenge.id !== id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
