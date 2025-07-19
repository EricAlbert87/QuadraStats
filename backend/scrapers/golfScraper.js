const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/benoitvallon/golf-rankings/master/rankings.json');
    const json = await response.json();
    return json.slice(0, 5).map(player => ({
      name: player.player,
      points: player.points
    }));
  } catch (error) {
    console.error('Error fetching Golf data:', error);
    return [];
  }
};
