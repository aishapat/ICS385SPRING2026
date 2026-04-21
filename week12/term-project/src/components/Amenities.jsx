// Amenities.jsx - displays property amenities using .map()

const amenitiesList = [
  { 
    id: 1, 
    name: "Full Kitchen", 
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=300"
  },
  { 
    id: 2, 
    name: "Pool", 
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=300"
  },
  { 
    id: 3, 
    name: "Gym", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300"
  },
  { 
    id: 4, 
    name: "WiFi", 
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300"
  },
  { 
    id: 5, 
    name: "Parking", 
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=300"
  },
  { 
    id: 6, 
    name: "Laundry", 
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=300"
  },
];

function Amenities() {
  return (
    <section id="amenities" style={{
      backgroundColor: "#e8f4f8",
      padding: "80px 40px",
      textAlign: "center",
    }}>
      {/* section title */}
      <h2 style={{ color: "#0096c7", fontSize: "36px", marginBottom: "20px" }}>
        Amenities
      </h2>

      {/* divider line */}
      <div style={{
        width: "60px",
        height: "4px",
        backgroundColor: "#ff6b35",
        margin: "0 auto 40px",
      }}/>

      {/* amenities grid - evenly spread */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        {amenitiesList.map((amenity) => (
          <div key={amenity.id} style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            overflow: "hidden"
          }}>
            {/* amenity photo */}
            <img
              src={amenity.image}
              alt={amenity.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover"
              }}
            />

            {/* amenity name */}
            <p style={{
              color: "#333",
              fontSize: "15px",
              margin: "14px 0",
              fontWeight: "500",
            }}>
              {amenity.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;