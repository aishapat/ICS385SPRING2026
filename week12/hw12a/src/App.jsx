// App.jsx - main component that renders all Hawaii island cards

import IslandCard from './IslandCard';

// island data array from the study guide
const islands = [
  {
    id: 1,
    name: "Maui",
    description: "Known as the Valley Isle, famous for Road to Hana and Haleakala.",
    tip: "Visit Haleakala crater at sunrise — arrive 30 min early.",
  },
  {
    id: 2,
    name: "Oahu",
    description: "Home to Honolulu, Waikiki Beach, and Pearl Harbor.",
    tip: "Take TheBus — it covers the entire island and is very affordable.",
  },
  {
    id: 3,
    name: "Kauai",
    description: "The Garden Isle, renowned for Na Pali Coast and Waimea Canyon.",
    tip: "Rent a kayak to reach Honopu Beach — no other access is permitted.",
  },
];

function App() {
  return (
    <div style={{
      backgroundColor: '#e0f4ff',
      minHeight: '100vh',
      padding: '40px',
      textAlign: 'center'
    }}>
      // page title
      <h1 style={{ color: '#003566', marginBottom: '30px' }}>
        Hawaii Island Cards
      </h1>
      // render all island cards using map
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {islands.map(island => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>
    </div>
  );
}

export default App;