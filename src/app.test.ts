import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { App } from "./app";

const resetDb = async () => {
  const prismaClient = new PrismaClient();

  const deletes = Object.keys(prismaClient)
    .filter((key) => !key.startsWith("_") && !key.startsWith("$"))
    .map((key) => (prismaClient as any)[key].deleteMany());

  await Promise.all(deletes);
};

test("Server is running", async () => {
  const response = await request(App()).get("/");

  expect(response.status).toEqual(200);
});

test("Add, list, get by ID, remove, and list", async () => {
  await resetDb();

  const app = request(App());

  const data = {
    name: "Roman Numerals",
    content: `if(number < 1) throw new Error("Roman numerals doesn't support 0 or negative numbers.);`,
  };

  const postResponse = await app.post("/api/challenges").send(data);

  expect(postResponse.status).toEqual(200);

  const getAllResponse = await app.get("/api/challenges");

  // NOTE: We are not asserting the ID nor the level, because the ID is randomly generated
  // and the level is calculated based on a non-deterministic source (system clock).
  const testableBody = getAllResponse.body.map(
    ({ id, level, ...rest }: any) => {
      return { ...rest };
    }
  );

  expect(getAllResponse.status).toEqual(200);
  expect(testableBody).toEqual([{ ...data }]);

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

test("Add same name twice fails", async () => {
  await resetDb();

  const app = request(App());

  const data = {
    name: "Keep it DRY",
    content: "const x = 5; const y = 5;",
  };

  await app.post("/api/challenges").send(data);
  const secondAddResponse = await app.post("/api/challenges").send(data);

  expect(secondAddResponse.status).toEqual(400);
});
