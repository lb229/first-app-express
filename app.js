import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import router from './routes/planetRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to accept JSON from the client
app.use(express.json());

// Middleware to log the client's requests
app.use(morgan('dev'));

// Use the planets router
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});