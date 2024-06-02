import express from 'express';
import bodyParser from 'body-parser';
import planetsRouter from './routes/planetsRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/planets', planetsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


