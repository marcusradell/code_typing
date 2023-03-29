# Code Typing

A speed typing practice tool for programmers.

_NOTE: this is a laboration for setting up code architecture and does not try to be a complete app._

## Prerequisites

- `node.js`
- `docker` (optional)
- `postman` (optional)

## Setup

`npm i`
`cp .env.example .env`
`npm run dev-db`
`npx prisma dev --migrate`

## Develop

`npm run dev`

## Deploy

_Deploy script will only listen to one branch, and needs to be updated in GCP Cloud Build._

`git push`
