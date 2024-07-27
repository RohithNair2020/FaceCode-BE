import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.send('Welcome to Facecode');
});

router.get('/ping', (_req, res) => {
  const status = {
    port: process.env.PORT || 8081,
    status: true
  }
  res.json(status);
});

export default router;
