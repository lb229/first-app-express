import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";


import planets from "./planets.js"

dotenv.config();
await import('express-async-errors');
const app = express();
const port = process.env.PORT || 3000;

//this is a middleware is used to accept JSON from the client
app.use(express.json());

//this is a middleware to log the client's requests
app.use(morgan("dev"));

// a simple route to get the planets
app.get('/planets', (req, res) => {
  res.json(planets);
});

//error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send('something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});