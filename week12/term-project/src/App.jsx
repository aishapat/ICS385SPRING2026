// App.jsx - main component that brings all sections together
// Generated with assistance from Claude (Anthropic)

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Amenities from './components/Amenities';
import Attractions from './components/Attractions';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// property data for Luminous Stays
const property = {
  name: 'Luminous Stays',
  island: 'Maui',
  location: 'Wailea, Maui, Hawaiʻi',
  tagline: 'Your luxury oceanfront escape in the heart of Maui',
  amenities: ['Ocean View', 'Pool', 'Gym', 'WiFi', 'Parking', 'Air Conditioning'],
  targetSegment: 'Honeymooners, couples, and retirees',
};

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Amenities />
      <Attractions />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;