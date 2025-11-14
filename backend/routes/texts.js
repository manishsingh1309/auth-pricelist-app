import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.get('/:page', async (req, res) => {
  const { page } = req.params;
  const { lang } = req.query;
  const language = lang || 'en';

  try {
    const result = await pool.query(
      'SELECT key, value FROM texts WHERE page = $1 AND language = $2',
      [page, language]
    );

    const texts = {};
    result.rows.forEach(row => {
      texts[row.key] = row.value;
    });

    res.json(texts);
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
