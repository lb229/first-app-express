import db from '../config/db';

export const getAllPlanets = async (req, res) => {
  try {
    const [planets] = await db.query('SELECT * FROM planets');
    res.json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlanetById = async (req, res) => {
  try {
    const { id } = req.params;
    const [planet] = await db.query('SELECT * FROM planets WHERE id = ?', [id]);
    res.json(planet[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPlanet = async (req, res) => {
  try {
    const { name } = req.body;
    await db.query('INSERT INTO planets (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Planet created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePlanet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.query('UPDATE planets SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: 'Planet updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePlanet = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM planets WHERE id = ?', [id]);
    res.json({ message: 'Planet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadPlanetImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePath = req.file.path;
    await db.query('UPDATE planets SET image = ? WHERE id = ?', [imagePath, id]);
    res.json({ message: 'Planet image updated', imagePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
