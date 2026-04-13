// Hero.jsx - Full width hero section with tropical background

function Hero() {
    return (
      // hero section with real tropical Maui background image
      <section style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px 20px',
        position: 'relative'
      }}>
        {/* dark overlay so text is readable over the image */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 100, 150, 0.45)'
        }}/>
  
        {/* content on top of overlay */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#caf0f8', fontSize: '16px', letterSpacing: '3px', marginBottom: '16px', textTransform: 'uppercase' }}>
            Wailea, Maui, Hawaii
          </p>
          <h1 style={{ color: '#ffffff', fontSize: '56px', fontWeight: '700', margin: '0 0 16px 0', lineHeight: '1.1' }}>
            Luminous Stays
          </h1>
          <p style={{ color: '#caf0f8', fontSize: '20px', marginBottom: '40px', maxWidth: '600px' }}>
            Your luxury oceanfront escape in the heart of Maui
          </p>
          <a href="#contact" style={{
            backgroundColor: '#ff6b35',
            color: '#ffffff',
            padding: '16px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Book Your Stay
          </a>
        </div>
      </section>
    );
  }
  
  export default Hero;