import express from 'express';
import pool from '../config/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;

  const allowedFields = ['article_no', 'product_service', 'in_price', 'price', 'unit', 'in_stock', 'description'];
  
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: 'Invalid field' });
  }

  try {
    const query = `UPDATE products SET ${field} = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [value, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
