// App.jsx - Hawaii Island Cards with filter and reduce
// Generated with assistance from Claude (Anthropic)

import { useState } from 'react';
import IslandCard from './IslandCard';

// expanded island data array with region field for filtering
const islands = [
  {
    id: 1,
    name: "Maui",
    region: "Central",
    description: "Known as the Valley Isle, famous for Road to Hana and Haleakala.",
    tip: "Visit Haleakala crater at sunrise — arrive 30 min early.",
    visitors: 3200000,
  },
  {
    id: 2,
    name: "Oahu",
    region: "Central",
    description: "Home to Honolulu, Waikiki Beach, and Pearl Harbor.",
    tip: "Take TheBus — it covers the entire island and is very affordable.",
    visitors: 5800000,
  },
  {
    id: 3,
    name: "Kauai",
    region: "North",
    description: "The Garden Isle, renowned for Na Pali Coast and Waimea Canyon.",
    tip: "Rent a kayak to reach Honopu Beach — no other access is permitted.",
    visitors: 1400000,
  },
  {
    id: 4,
    name: "Big Island",
    region: "South",
    description: "Home to active volcanoes, black sand beaches, and stargazing.",
    tip: "Visit Hawaii Volcanoes National Park at night to see lava glow.",
    visitors: 1800000,
  },
  {
    id: 5,
    name: "Molokai",
    region: "North",
    description: "The Friendly Isle, known for its untouched natural beauty.",
    tip: "Visit the sea cliffs — the tallest in the world at 3000 feet.",
    visitors: 250000,
  },
];

function App() {
  // state for the selected filter
  const [filter, setFilter] = useState("All");

  // filter islands based on selected region
  const filteredIslands = filter === "All"
    ? islands
    : islands.filter(island => island.region === filter);

  // reduce to calculate total visitors across filtered islands
  const totalVisitors = filteredIslands.reduce((sum, island) => sum + island.visitors, 0);

  return (
    <div style={{ backgroundColor: '#e0f4ff', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
      
      {/* page title */}
      <h1 style={{ color: '#003566', marginBottom: '10px' }}>Hawaii Island Cards</h1>

      {/* total visitors stat using reduce */}
      <p style={{ color: '#0077b6', fontSize: '16px', marginBottom: '24px' }}>
        Total Visitors: {totalVisitors.toLocaleString()}
      </p>

      {/* filter dropdown */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ color: '#003566', fontSize: '16px', marginRight: '10px' }}>
          Filter by Region:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #0077b6',
            fontSize: '15px',
            color: '#003566',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Islands</option>
          <option value="Central">Central</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
      </div>

      {/* island cards using .map() */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {filteredIslands.map(island => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>
    </div>
  );
}

export default App;