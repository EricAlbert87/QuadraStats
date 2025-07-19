import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

function SportChart({ id, title, url, parser, color }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const parsedData = parser(text);
        setData(parsedData);
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, [url]);

  return (
    <section id={id} className="sport-card" style={{ borderColor: color }}>
      <h2 style={{ color }}>{title}</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="points" fill={color} />
            </BarChart>
          </ResponsiveContainer>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </>
      )}
    </section>
  );
}

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  // Simple parsers for APIs (simulate data extraction)
  const parseNHL = (text) => {
    const json = JSON.parse(text);
    return json.records[0].teamRecords.slice(0, 5).map(team => ({
      name: team.team.name,
      points: team.points
    }));
  };

  const parseNFL = (text) => {
    try {
      const json = JSON.parse(text);
      return json.slice(0, 5).map(team => ({
        name: team.team,
        points: team.wins
      }));
    } catch {
      return [{ name: 'Team A', points: 20 }];
    }
  };

  const parseGolf = (text) => {
    try {
      const json = JSON.parse(text);
      return json.slice(0, 5).map(player => ({
        name: player.player,
        points: player.points
      }));
    } catch {
      return [{ name: 'Golfer A', points: 100 }];
    }
  };

  const parseTennis = (text) => {
    const lines = text.split('\n').slice(1, 6);
    return lines.map((line, idx) => {
      const parts = line.split(',');
      return { name: parts[2] || `Player ${idx + 1}`, points: parseInt(parts[3] || '0', 10) };
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <aside className="sidebar">
        <h3>QuadraStats</h3>
        <nav>
          <a href="#nhl">NHL</a>
          <a href="#nfl">NFL</a>
          <a href="#golf">Golf</a>
          <a href="#tennis">Tennis</a>
        </nav>
      </aside>
      <div className="main-content">
        <header>
          QuadraStats – NHL, NFL, Golf & Tennis Live Stats
          <div className="controls">
            <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </header>
        <main>
          <SportChart id="nhl" title="NHL" url="https://statsapi.web.nhl.com/api/v1/standings" parser={parseNHL} color="#007aff" />
          <SportChart id="nfl" title="NFL" url="https://raw.githubusercontent.com/BurntSushi/nfl-rankings/master/standings.json" parser={parseNFL} color="#c8102e" />
          <SportChart id="golf" title="Golf" url="https://raw.githubusercontent.com/benoitvallon/golf-rankings/master/rankings.json" parser={parseGolf} color="#228B22" />
          <SportChart id="tennis" title="Tennis" url="https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master/atp_rankings_current.csv" parser={parseTennis} color="#ff9900" />
        </main>
      </div>
    </div>
  );
}

export default App;
