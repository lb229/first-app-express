import express from 'express';
import Joi from 'joi';
import planets from '../planetsData.js';

const router = express.Router();

// Define the Joi schema for a planet
const planetSchema = Joi.object({
  name: Joi.string().required()
});

// Function to generate a unique ID
const generateUniqueId = (planets) => {
  //#1 extract all exisiting IDs from the planets array
  const ids = planets.map(planet => planet.id);
  //#2 initializa newID to 1 (the starting ID)
  let newId = 1;
  //#3 loop to find the first UNIQUE ID not present in the ids array
  while (ids.includes(newId)) {
    //If newID is already taken, increment it by 1
      newId += 1;
  }
  return newId;
};

// GET /api/planets: Return all planets
router.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id Return a planet by id
router.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id, 10));


  if (!planet) return res.status(404).json({ msg: 'Planet not found' });

  res.status(200).json(planet);
});

// POST /api/planets: Create a planet
router.post('/api/planets', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newId = generateUniqueId(planets);
  const newPlanet = {
      id: newId,
      name: req.body.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

// PUT /api/planets/:id: Update a planet by id
router.put('/api/planets/:id', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

// DELETE /api/planets/:id Delete a planet by id
router.delete('/api/planets/:id', (req, res) => {
    const planetId = parseInt(req.params.id, 10);
   //filter out the planet with the specifies ID
   const filteredPlanets = planets.filter(p => p.id !== planetId);

   //check if any planet was removed
   if (filteredPlanets.length === planets.length) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

   //update the planets array with the filtered array
   planets.splice(0, planets.length, ...filteredPlanets);

   res.status(200).json({ msg: 'Planet deleted successfully' });

});

export default router;