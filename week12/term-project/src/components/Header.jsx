// Header.jsx - Navigation bar for Luminous Stays

function Header() {
    return (
      // sticky header so it stays at top when scrolling
      <header style={{
        backgroundColor: '#0096c7', // tropical sky blue
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* brand name on the left */}
        <h1 style={{ color: '#ffffff', fontSize: '22px', margin: 0 }}>
          Luminous Stays
        </h1>
  
        {/* navigation links on the right */}
        <nav style={{ display: 'flex', gap: '24px' }}>
          <a href="#about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px' }}>About</a>
          <a href="#amenities" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px' }}>Amenities</a>
          <a href="#attractions" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px' }}>Attractions</a>
          <a href="#contact" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '15px' }}>Contact</a>
        </nav>
      </header>
    );
  }
  
  export default Header;