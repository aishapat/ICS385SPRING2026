// Attractions.jsx - shows popular Maui spots for guests with photos

// attractions data with image URLs from Unsplash
const attractionsList = [
  {
    id: 1,
    name: "Road to Hana",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=400",
    description: "A long, winding drive through Maui's east side with rainforests, waterfalls, and ocean views. It's known for being slow, but the scenery makes it worth it. Along the way you'll find small stops, beaches, and lookout points that show the natural side of the island.",
  },
  {
    id: 2,
    name: "Haleakalā National Park",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=400",
    description: "A national park built around a massive dormant volcano. Most people come early in the morning to watch the sunrise from the summit above the clouds. The park also has hiking trails and quiet open landscapes that feel very different from the rest of Maui.",
  },
  {
    id: 3,
    name: "Wailea Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    description: "A calm, golden sand beach in South Maui with clear, warm water. It's a good spot for swimming, snorkeling, or just relaxing by the ocean. The area is well maintained and sits next to walking paths and luxury resorts.",
  },
  {
    id: 4,
    name: "Maui Local Food",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    description: "Maui food is a mix of Hawaiian, Filipino, Japanese, and Portuguese influences. You'll find dishes like poke, loco moco, spam musubi, kalua pork, and malasadas all over the island. There are also small local shops and food trucks that serve fresh, simple meals made daily.",
  },
];

function Attractions() {
  return (
    // attractions section
    <section id="attractions" style={{
      backgroundColor: '#ffffff',
      padding: '80px 40px',
      textAlign: 'center'
    }}>
      {/* section title */}
      <h2 style={{ color: '#0096c7', fontSize: '36px', marginBottom: '20px' }}>
        Explore Maui
      </h2>

      {/* divider */}
      <div style={{ width: '60px', height: '4px', backgroundColor: '#ff6b35', margin: '0 auto 40px' }}/>

      {/* attraction cards using .map() */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {attractionsList.map(attraction => (
          <div key={attraction.id} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '240px',
            textAlign: 'left',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {/* attraction photo */}
            <img
              src={attraction.image}
              alt={attraction.name}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover'
              }}
            />
            {/* card content */}
            <div style={{ padding: '16px' }}>
              {/* attraction name */}
              <h3 style={{ color: '#0096c7', fontSize: '16px', marginBottom: '8px' }}>
                {attraction.name}
              </h3>
              {/* attraction description */}
              <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                {attraction.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Attractions;