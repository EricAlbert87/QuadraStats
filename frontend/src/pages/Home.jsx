import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to QuadraStats</h1>
        <p>Your live dashboard for NHL, NFL, Golf, and Tennis statistics.</p>
        <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
      </div>
    </div>
  );
}

import Footer from '../components/Footer';

export default function HomeWithFooter() {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}

export { Home };
