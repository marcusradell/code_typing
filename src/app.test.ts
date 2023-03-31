import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { App } from "./app";

const challengeUrl = "/api/challenges";

const prismaClient = new PrismaClient();

const arrangeApp = async () => {
  const deletes = Object.keys(prismaClient)
    .filter((key) => !key.startsWith("_") && !key.startsWith("$"))
    .map((key) => (prismaClient as any)[key].deleteMany());

  await Promise.all(deletes);

  return request(App());
};

test("Server is running", async () => {
  const response = await request(App()).get("/");

  expect(response.status).toEqual(200);
});

test("Empty list of challenges", async () => {
  const app = await arrangeApp();

  const response = await app.get(challengeUrl);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual([]);
});

test("Add a challenge", async () => {
  const app = await arrangeApp();

  const data = {
    name: "Roman Numerals",
    content: `if(number < 1) throw new Error("Roman numerals doesn't support 0 or negative numbers.);`,
  };

  const postResponse = await app.post(challengeUrl).send(data);

  const getResponse = await app.get(challengeUrl);

  const deterministicResult = getResponse.body.map((challenge: any) => {
    // Fields level and id are non-deterministic and need to be removed from the object.
    const { level, id, ...deterministicResult } = challenge;

    return deterministicResult;
  });

  expect(postResponse.status).toEqual(200);
  expect(getResponse.status).toEqual(200);
  expect(deterministicResult).toEqual([data]);
});

test("Get challenge by ID", async () => {
  const app = await arrangeApp();

  const data = {
    name: "Roman Numerals",
    content: `if(number < 1) throw new Error("Roman numerals doesn't support 0 or negative numbers.);`,
  };

  const postResponse = await app.post(challengeUrl).send(data);

  const getByIdResponse = await app.get(
    `${challengeUrl}/${postResponse.body.id}`
  );

  const { level, id, ...deterministicResult } = getByIdResponse.body;

  expect(getByIdResponse.status).toEqual(200);
  expect(deterministicResult).toEqual(data);
});

test("Add, list, get by ID, remove, and list", async () => {
  const app = await arrangeApp();

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
  const app = await arrangeApp();

  const data = {
    name: "Keep it DRY",
    content: "const x = 5; const y = 5;",
  };

  await app.post("/api/challenges").send(data);
  const secondAddResponse = await app.post("/api/challenges").send(data);

  expect(secondAddResponse.status).toEqual(400);
});
