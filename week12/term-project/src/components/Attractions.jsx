// Attractions.jsx - shows popular Maui spots for guests

// attractions data
const attractionsList = [
    {
      id: 1,
      name: "Road to Hana",
      description:
        "A long, winding drive through Maui's east side with rainforests, waterfalls, and ocean views. It's known for being slow, but the scenery makes it worth it. Along the way you'll find small stops, beaches, and lookout points that show the natural side of the island.",
    },
    {
      id: 2,
      name: "Haleakalā National Park",
      description:
        "A national park built around a massive dormant volcano. Most people come early in the morning to watch the sunrise from the summit above the clouds. The park also has hiking trails and quiet open landscapes that feel very different from the rest of Maui.",
    },
    {
      id: 3,
      name: "Wailea Beach",
      description:
        "A calm, golden sand beach in South Maui with clear, warm water. It's a good spot for swimming, snorkeling, or just relaxing by the ocean. The area is well maintained and sits next to walking paths and luxury resorts.",
    },
    {
      id: 4,
      name: "Maui Local Food",
      description:
        "Maui food is a mix of Hawaiian, Filipino, Japanese, and Portuguese influences. You'll find dishes like poke, loco moco, spam musubi, kalua pork, and malasadas all over the island. There are also small local shops and food trucks that serve fresh, simple meals made daily.",
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
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {attractionsList.map(attraction => (
            <div key={attraction.id} style={{
              backgroundColor: '#e8f4f8',
              borderRadius: '12px',
              padding: '30px 24px',
              width: '220px',
              textAlign: 'left',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              {/* attraction name */}
              <h3 style={{ color: '#0096c7', fontSize: '18px', marginBottom: '12px' }}>
                {attraction.name}
              </h3>
              {/* attraction description */}
              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Attractions;