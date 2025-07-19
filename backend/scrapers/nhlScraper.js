const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://statsapi.web.nhl.com/api/v1/standings');
    const json = await response.json();
    return json.records[0].teamRecords.slice(0, 5).map(team => ({
      name: team.team.name,
      points: team.points
    }));
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    return [];
  }
};
