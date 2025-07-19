const fetch = require('node-fetch');

module.exports = async function() {
  try {
    // Using a sample JSON file of NFL teams and wins for demonstration.
    const response = await fetch('https://raw.githubusercontent.com/BurntSushi/nfl-rankings/master/standings.json');
    const json = await response.json();
    return json.slice(0, 5).map(team => ({
      name: team.team,
      points: team.wins
    }));
  } catch (error) {
    console.error('Error fetching NFL data:', error);
    return [];
  }
};
