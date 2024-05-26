import Joi from 'joi';
import planets from '../planetsData.js';

// Define the Joi schema for a planet
const planetSchema = Joi.object({
  name: Joi.string().required(),
});

// Function to generate a unique ID
const generateUniqueId = (planets) => {
  const ids = planets.map(planet => planet.id);
  let newId = 1;
  while (ids.includes(newId)) {
    newId += 1;
  }
  return newId;
};

// Controller functions
export const getAll = (req, res) => {
  res.status(200).json(planets);
};

export const getOneById = (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id, 10));
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });
  res.status(200).json(planet);
};

export const create = (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newId = generateUniqueId(planets);
  const newPlanet = {
    id: newId,
    name: req.body.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
};

export const updateById = (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
};


export const deleteById = (req, res) => {
  const planetId = parseInt(req.params.id, 10);
  const filteredPlanets = planets.filter(p => p.id !== planetId);

  if (filteredPlanets.length === planets.length) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

  planets.splice(0, planets.length, ...filteredPlanets);
  res.status(200).json({ msg: 'Planet deleted successfully' });
};
