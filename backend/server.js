const express = require('express');
const cors = require('cors');
const nflScraper = require('./scrapers/nflScraper');
const nhlScraper = require('./scrapers/nhlScraper');
const golfScraper = require('./scrapers/golfScraper');
const tennisScraper = require('./scrapers/tennisScraper');

const app = express();
app.use(cors({ origin: '*' }));

app.get('/api/nfl', async (req, res) => {
  try {
    const data = await nflScraper();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/nhl', async (req, res) => {
  try {
    const data = await nhlScraper();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/golf', async (req, res) => {
  try {
    const data = await golfScraper();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tennis', async (req, res) => {
  try {
    const data = await tennisScraper();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
