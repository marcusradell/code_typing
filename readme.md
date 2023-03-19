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

Modify the content so it becomes:

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
