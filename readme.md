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
