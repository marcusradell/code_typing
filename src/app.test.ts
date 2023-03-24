import request from "supertest";
import { App } from "./app";

test("it works", async () => {
  const response = await request(App()).get("/");
  expect(response.status).toEqual(200);
});
