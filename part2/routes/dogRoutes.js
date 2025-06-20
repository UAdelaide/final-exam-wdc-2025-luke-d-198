const express = require('express');
const router = express.Router();
const db = require('../models/db');

// get dogs for user
router.get('/', async (req, res) => {
  try {
    const user_id = req.session.user.user_id;
    const [rows] = await db.query(`
      SELECT dog_id, name
      FROM Dogs
      WHERE owner_id = ?
    `, [user_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get dogs' });
  }
});


module.exports = router;