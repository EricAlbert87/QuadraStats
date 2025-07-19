import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTranslation } from 'react-i18next'

export default function LineChartComponent() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/nhl')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>{t('lineChartTitle')}</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="points" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}
