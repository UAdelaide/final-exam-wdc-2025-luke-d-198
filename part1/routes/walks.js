var express = require('express');

var router = express.Router();
var db = require('../db');

/* GET list of dogs. */
router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        d.name AS dog_name,
        d.size,
        o.username AS owner_username
      FROM
        Dogs d
      JOIN
        Users o ON d.owner_id = o.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrive dogs. ' });
  }
});

/* GET list of open walk requests. */
router.get('/walkrequests/open', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        r.request_id,
        d.name AS dog_name,
        r.requested_time,
        r.duration_minutes,
        r.location,
        o.username AS owner_username
      FROM
        WalkRequests r
      JOIN
        Dogs d ON r.dog_id = d.dog_id
      JOIN
        Users o ON d.owner_id = o.user_id
      WHERE
        r.status = 'open'
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrive walk requests.' });
  }
});

/* GET list of walker summaries. */
router.get('/walkers/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        w.username AS walker_username,
        COUNT(DISTINCT ra.rating_id) AS total_requests,
        ROUND(AVG(ra.rating), 2) AS average_rating,
        COUNT(DISTINCT re.request_id) AS completed_walks
      FROM
        Users w
      LEFT JOIN
        WalkApplications wa ON wa.walker_id = w.user_id
      LEFT JOIN
        WalkRequests re ON wa.request_id = re.request_id AND re.status = 'completed'
      LEFT JOIN
        WalkRatings ra ON ra.walker_id = w.user_id AND ra.request_id = re.request_id
      WHERE
        w.role = 'walker'
      GROUP BY
        w.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get walker summaries.' });
  }
});

module.exports = router;
