const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master/atp_rankings_current.csv');
    const text = await response.text();
    // Parse CSV (simplified: just get first 5 lines)
    const lines = text.split('\n').slice(1, 6);
    return lines.map((line, idx) => {
      const parts = line.split(',');
      return { name: parts[2] || `Player ${idx + 1}`, points: parseInt(parts[3] || '0', 10) };
    });
  } catch (error) {
    console.error('Error fetching Tennis data:', error);
    return [];
  }
};
