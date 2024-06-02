import express from 'express';
import {
  getAllPlanets,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet,
  uploadPlanetImage
} from '../controller/planetsControllerDatabase'

const router = express.Router();

export default (upload) => {
  router.get('/', getAllPlanets);
  router.get('/:id', getPlanetById);
  router.post('/', createPlanet);
  router.put('/:id', updatePlanet);
  router.delete('/:id', deletePlanet);
  router.post('/:id/image', upload.single('image'), uploadPlanetImage); 

  return router;
};
