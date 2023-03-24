import request from "supertest";
import { App } from "./app";

test("Server is running", async () => {
  const response = await request(App()).get("/");

  expect(response.status).toEqual(200);
});

test("Add, list, remove, and list", async () => {
  const app = request(App());

  const addResponse = await app
    .post("/api/challenges")
    .send({ name: "Roman Numerals" });

  expect(addResponse.status).toEqual(200);

  const listResponse = await app.get("/api/challenges");

  expect(listResponse.status).toEqual(200);

  const testableBody = listResponse.body.map(({ id, ...rest }: any) => {
    return { ...rest };
  });

  expect(testableBody).toEqual([{ name: "Roman Numerals" }]);
});
