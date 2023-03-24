import request from "supertest";
import { App } from "./app";

test("Server is running", async () => {
  const response = await request(App()).get("/");

  expect(response.status).toEqual(200);
});

test("Add, list, get by ID, remove, and list", async () => {
  const app = request(App());

  const data = {
    name: "Roman Numerals",
    content: `if(number < 1) throw new Error("Roman numerals doesn't support 0 or negative numbers.);`,
  };

  const postResponse = await app.post("/api/challenges").send(data);

  expect(postResponse.status).toEqual(200);

  const getAllResponse = await app.get("/api/challenges");

  const testableBody = getAllResponse.body.map(({ id, ...rest }: any) => {
    return { ...rest };
  });

  expect(getAllResponse.status).toEqual(200);
  expect(testableBody).toEqual([{ ...data, level: 1 }]);

  const challengeId = getAllResponse.body[0].id;

  const getByIdResponse = await app.get(`/api/challenges/${challengeId}`);

  expect(getByIdResponse.status).toEqual(200);
  expect(getByIdResponse.body).toEqual({
    id: challengeId,
    ...data,
    level: 1,
  });

  const deleteResponse = await app.delete(`/api/challenges/${challengeId}`);

  expect(deleteResponse.status).toEqual(200);

  const getAllEmptyResponse = await app.get("/api/challenges");

  expect(getAllEmptyResponse.status).toEqual(200);
  expect(getAllEmptyResponse.body).toEqual([]);
});
