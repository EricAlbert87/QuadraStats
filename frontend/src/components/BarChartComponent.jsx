import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTranslation } from 'react-i18next'

export default function BarChartComponent() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/nfl')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>{t('barChartTitle')}</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="points" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}
