import { App } from "./app";

const port = 3000;

const main = () => {
  App().listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
