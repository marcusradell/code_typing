import express from "express";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const challenges: { name: string }[] = [{ name: "Hello World!" }];

app.get("/challenge/list", (req, res) => {
  res.json(challenges);
});

app.post("/challenge/add", (req, res) => {
  const { name } = req.body;
  challenges.push({ name });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
