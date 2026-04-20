// Dashboard.jsx - Luminous Stays Visitor Statistics Dashboard
// Generated with assistance from Claude (Anthropic)

import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import tourismData from '../data/tourism.json'

// register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// visitor type data for pie chart
const visitorTypes = {
  labels: ['Vacation Rental', 'Hotel', 'Condo', 'Other'],
  datasets: [{
    data: [35, 45, 15, 5],
    backgroundColor: ['#0096c7', '#ff6b35', '#48cae4', '#90e0ef'],
  }]
}

// length of stay data for line chart
const lengthOfStay = {
  labels: ['2021', '2022', '2023', '2024'],
  datasets: [{
    label: 'Average Length of Stay (days)',
    data: [8.2, 9.1, 8.7, 9.3],
    borderColor: '#ff6b35',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    tension: 0.4,
    fill: true
  }]
}

function Dashboard() {
  // state for island selector
  const [selectedIsland, setSelectedIsland] = useState('Maui')
  // state for weather data
  const [weather, setWeather] = useState(null)
  // state for loading
  const [loading, setLoading] = useState(true)

  // fetch weather from OpenWeatherMap
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Wailea,Maui,US&appid=${apiKey}&units=imperial`)
      .then(res => res.json())
      .then(data => {
        setWeather(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // prepare bar chart data from tourism JSON
  const barData = {
    labels: tourismData.visitorArrivals.map(d => d.month),
    datasets: [{
      label: 'Visitor Arrivals - Maui',
      data: tourismData.visitorArrivals.map(d => d.visitors),
      backgroundColor: '#0096c7',
      borderRadius: 4
    }]
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* dashboard title */}
      <h1 style={{ color: '#003566', textAlign: 'center', marginBottom: '8px', fontSize: '32px' }}>
        Luminous Stays
      </h1>
      <p style={{ color: '#0096c7', textAlign: 'center', marginBottom: '32px', fontSize: '16px' }}>
        Maui Visitor Statistics Dashboard
      </p>

      {/* weather widget */}
      <div style={{
        backgroundColor: '#0096c7',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '32px',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '8px' }}>Current Weather — Wailea, Maui</h3>
        {loading ? (
          <p>Loading weather...</p>
        ) : weather && weather.main ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div><strong>{Math.round(weather.main.temp)}°F</strong><p>Temperature</p></div>
            <div><strong>{weather.weather[0].description}</strong><p>Conditions</p></div>
            <div><strong>{weather.main.humidity}%</strong><p>Humidity</p></div>
          </div>
        ) : (
          <p>Weather data unavailable</p>
        )}
      </div>

      {/* island selector */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <label style={{ color: '#003566', fontSize: '16px', marginRight: '12px', fontWeight: '500' }}>
          Select Island:
        </label>
        <select
          value={selectedIsland}
          onChange={(e) => setSelectedIsland(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid #0096c7',
            fontSize: '15px',
            color: '#003566',
            cursor: 'pointer'
          }}
        >
          <option value="Maui">Maui</option>
          <option value="Oahu">Oahu</option>
          <option value="Kauai">Kauai</option>
          <option value="Big Island">Big Island</option>
        </select>
      </div>

      {/* bar chart - visitor arrivals */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ color: '#003566', marginBottom: '16px' }}>Visitor Arrivals by Month — {selectedIsland}</h2>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      {/* charts row */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* pie chart - visitor types */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', flex: '1', minWidth: '300px' }}>
          <h2 style={{ color: '#003566', marginBottom: '16px' }}>Visitor Types</h2>
          <Pie data={visitorTypes} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>

        {/* line chart - length of stay */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', flex: '1', minWidth: '300px' }}>
          <h2 style={{ color: '#003566', marginBottom: '16px' }}>Average Length of Stay</h2>
          <Line data={lengthOfStay} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard