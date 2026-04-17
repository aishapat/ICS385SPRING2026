// IslandCard.jsx - reusable card component for each Hawaiian island
// Generated with assistance from Claude (Anthropic)

function IslandCard({ name, description, tip }) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '300px',
        textAlign: 'center'
      }}>
        // island name
        <h2 style={{ color: '#0077b6' }}>{name}</h2>
        // island description
        <p style={{ color: '#333', fontSize: '14px' }}>{description}</p>
        // visitor tip
        <p style={{ 
          backgroundColor: '#e0f7fa', 
          padding: '10px', 
          borderRadius: '8px',
          fontSize: '13px',
          color: '#006064'
        }}>
          Tip: {tip}
        </p>
      </div>
    );
  }
  
  export default IslandCard;