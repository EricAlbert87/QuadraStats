import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BarChartComponent from './components/BarChartComponent'
import LineChartComponent from './components/LineChartComponent'

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app">
      <header>
        <h1>{t('title')}</h1>
        <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </header>
      <main>
        <BarChartComponent />
        <LineChartComponent />
      </main>
    </div>
  )
}

export default App
