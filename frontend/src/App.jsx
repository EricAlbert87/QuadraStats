import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

function SportChart({ id, title, endpoint, color, refreshSignal }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://your-backend-url.onrender.com/api/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
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
  }, [endpoint]);

  useEffect(() => {
    if (refreshSignal > 0) {
      fetchData();
    }
  }, [refreshSignal]);

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
  const [refreshSignal, setRefreshSignal] = useState(0);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const refreshAll = () => {
    setRefreshSignal(refreshSignal + 1);
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
            <button className="refresh-all" onClick={refreshAll}>Refresh All</button>
          </div>
        </header>
        <main>
          <SportChart id="nhl" title="NHL" endpoint="nhl" color="#007aff" refreshSignal={refreshSignal} />
          <SportChart id="nfl" title="NFL" endpoint="nfl" color="#c8102e" refreshSignal={refreshSignal} />
          <SportChart id="golf" title="Golf" endpoint="golf" color="#228B22" refreshSignal={refreshSignal} />
          <SportChart id="tennis" title="Tennis" endpoint="tennis" color="#ff9900" refreshSignal={refreshSignal} />
        </main>
      </div>
    </div>
  );
}

export default App;
