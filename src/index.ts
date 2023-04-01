import { appFactory } from "./app";

const port = 3000;

const main = async () => {
  if (process.env.SANDBOX) {
    await require("./sandbox").sandbox();
  } else {
    appFactory().listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
};

main();
