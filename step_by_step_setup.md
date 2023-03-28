# lab_ts_backend

In preparation for a live coding session.

Replace values in `{{}}` with your own values.

## I want to be able to push changes to GitHub

_Done when a commit is on the GitHub repository._

Go to the web page and create a new repo.
`git clone {{git@github.com:marcusradell/lab_ts_backend.git}}`

Use VSCode to make a commit.

```
git remote add origin {{git@github.com:marcusradell/lab_ts_backend.git}}
git branch -M main
git push -u origin main
```

Check for the commit on GitHub.

## I want to have a working Express app

_Done when we can visit http://localhost:3000 and see that we got a `Hello World!`._

`npm init --yes`
`npm i express`
Add `node_modules/` into .gitignore.

Paste in the following code from http://expressjs.com/en/starter/hello-world.html into `src/index.js`:

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

`node src`

Check your browser for `Hello World!` when visiting `http:localhost:3000`.

Commit the code.

## I want to use TypeScript

_Done when I have compiled the code using `tsc`, then run `node build, then check the browser._

Rename file into `src/index.ts`.
Use quick fix `cmd+.` to convert require into an import.
Use quick fix to install types for express.

`npm i typescript` to install typescript and the binary `tsc`.
`npx tsc --init` to create a `tsconfig.json` file.
Configure `tsconfig.json` with `"rootDir": "./src"` and `"outDir": "./build"`.

`npx tsc`
Make sure it outputs a file with javascript into `build/index.js`.
Add `build/` to .gitignore.

`node build`
Check `http://localhost:3000.

Commit!

## I want to document the commands as npm scripts

_Done when `npm run build && npm start` works (check web page)._

In `package.json` replace the content in `"script"` with:

```
    "build": "tsc",
    "start": "node build"
```

Check and commit!

## I want to host the code using containerization

_Done when `docker build -t lab_ts_backend . && docker run -p 3000:3000 --rm -it lab_ts_backend` works and you can visit the web site._

Search for `node.js dockerfile`. I got to https://nodejs.org/en/docs/guides/nodejs-docker-webapp.

Modify the content of `Dockerfile` so it becomes:

```
FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "node", "build/" ]
```

Add a `.dockerignore` with `build/` and `node_modules/`.

Move any `devDependencies` to `dependencies`. This can be undone with a more advanced dockerfile setup.

Try and see if everything works.

Commit!

## I want to use GCP Cloud Run to host the backend

_Done when I can visit a Cloud Run URL that hosts the latest version of my app._

Login to GCP and create a new project named `lab-ts-backend`.

Search for `Cloud Run` and create a new service.

Choose option `Continuously deploy new revisions from a source repository`.
Service name: `app`.
Region: `europe-north1`.
Max instances: `1`.
Authentication: `Allow unauthenticated invocations`.
Container port (under a submenu): `3000`.

Scroll back up and click on `Set up cloud build`.
Choose `GitHub` as the provider and authenticate.
Choose `lab_ts_backend` as the repository.
Create the Cloud Build.

Create the service.

Check results and commit!

## I want to serve a list of programming speed typing challenges

_Done when `curl https://app-6dsti55tsa-lz.a.run.app/challenge/list` returns [{name: "Hello world!"}] in its body as JSON._

Add a new route to the app:

```
app.get("/challenge/list", (req, res) => {
  res.json([{ name: "Hello World!" }]);
});
```

Verify locally, push to prod, and verify in prod.

## I want to be able to add a new challenge

_Done when `curl localhost:3000/challenge/add -d '{"name": "Fizzbuzz"}' -H "Content-Type: application/json" -v` returns status code 200 and the list endpoint shows the new challenge._

```
app.post("/challenge/add", (req, res) => {
  const { name } = req.body;
  challenges.push({ name });
  res.sendStatus(200);
});
```

Test and commit!

_Skipping some instructions for brevity._

## I want to be able to get a challenge by ID

```
curl "localhost:3000/challenge/display?id=6e2929e1-f1b4-460c-ad7f-c5c77ed1b32d" -v
```

## I want to be able to remove a challenge

Add the endpoint and filter challenges on ID to remove the specific challenge. That means that we need to add IDs for challenges.

Install `uuid @types/uuid` and use `v4` to generate new UUIDs.

```
curl "localhost:3000/challenge/remove" -v -d '{"id": "6e2929e1-f1b4-460c-ad7f-c5c77ed1b32d"}' -H "Content-Type: application/json"
```

## I want to setup Prisma with Postgres

Add a script for running Postgres via Docker in `package.json`.

Place a matching `.env.example` entry for the connection string.

Run `npx prisma init`.

Replace the `.env` `DATABASE_URL` value with your `.env.example` value (the key should be the same for both).

`.gitignore` `.env`.

`prisma/schema.prisma` should contain the following model:

```
model ChallangeRow {
  id    String @id
  email String @unique
}
```

Run `npx prisma migrate dev` to create and apply migrations and update the prisma client.

_TODO: Add pitch! Spela in en egen promo med datum och pitch!_
