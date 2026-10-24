const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener todos los productos activos
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen_url, c.nombre AS categoria
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.activo = TRUE
    `);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener categorías
router.get('/categorias', async (req, res) => {
  try {
    const [categorias] = await pool.query('SELECT * FROM categorias');
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;