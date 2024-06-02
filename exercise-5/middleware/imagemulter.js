import express from 'express';
import bodyParser from 'body-parser';
import planetsRouter from '../routes/planetsRoutes';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files

app.use('/planets', planetsRouter(upload)); // Passa `upload` come parametro

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
