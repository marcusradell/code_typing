import { appFactory } from "./app";

const port = 3000;

const main = () => {
  appFactory().listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
