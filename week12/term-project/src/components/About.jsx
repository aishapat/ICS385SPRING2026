// About.jsx - Property description section

function About() {
    return (
      <section
        id="about"
        style={{
          backgroundColor: "#ffffff",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        {/* section title */}
        <h2
          style={{
            color: "#0096c7",
            fontSize: "36px",
            marginBottom: "20px",
          }}
        >
          About Luminous Stays
        </h2>
  
        {/* divider line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: "#ff6b35",
            margin: "0 auto 30px",
          }}
        />
  
        {/* description */}
        <p
          style={{
            color: "#333",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto 20px",
            lineHeight: "1.8",
          }}
        >
          Luminous Stays is a collection of oceanfront vacation rentals located in
          Wailea, Maui. Our spaces are designed to offer comfort, privacy, and a
          peaceful stay right by the ocean.
        </p>
  
        <p
          style={{
            color: "#555",
            fontSize: "16px",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Whether you're visiting for a honeymoon, family trip, or a quiet break
          from everyday life, our goal is to give you a simple, relaxing, and
          memorable experience in Maui.
        </p>
  
        {/* stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "50px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#0096c7", fontSize: "32px", margin: "0" }}>
              5
            </h3>
            <p style={{ color: "#555", margin: "4px 0 0" }}>Stays</p>
          </div>
  
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#0096c7", fontSize: "32px", margin: "0" }}>
              5★
            </h3>
            <p style={{ color: "#555", margin: "4px 0 0" }}>Guest Rating</p>
          </div>
  
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#0096c7", fontSize: "32px", margin: "0" }}>
              Maui
            </h3>
            <p style={{ color: "#555", margin: "4px 0 0" }}>Hawaiʻi</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default About;