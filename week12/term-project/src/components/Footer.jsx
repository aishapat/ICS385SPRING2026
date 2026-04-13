// Footer.jsx - bottom of the page with contact info and copyright

function Footer() {
    return (
      // footer with tropical blue background
      <footer style={{
        backgroundColor: '#0096c7',
        padding: '40px',
        textAlign: 'center'
      }}>
        {/* brand name */}
        <h3 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '12px' }}>
          Luminous Stays
        </h3>
  
        {/* location */}
        <p style={{ color: '#caf0f8', fontSize: '14px', marginBottom: '8px' }}>
          Wailea, Maui, Hawaiʻi
        </p>
  
        {/* email */}
        <p style={{ color: '#caf0f8', fontSize: '14px', marginBottom: '24px' }}>
          luminousstays@hawaii.com
        </p>
  
        {/* copyright */}
        <p style={{ color: '#ffffff', fontSize: '12px', margin: 0 }}>
          © 2026 Luminous Stays. All rights reserved.
        </p>
      </footer>
    );
  }
  
  export default Footer;