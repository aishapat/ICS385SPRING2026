// CTASection.jsx - encourages visitors to book their stay

function CTASection() {
    return (
      // CTA section
      <section
        id="contact"
        style={{
          backgroundColor: "#ff6b35",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        {/* main heading */}
        <h2
          style={{
            color: "#ffffff",
            fontSize: "40px",
            marginBottom: "16px",
          }}
        >
          Your Maui stay is waiting
        </h2>
  
        {/* subtext */}
        <p
          style={{
            color: "#fff3ee",
            fontSize: "18px",
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: "1.8",
          }}
        >
          A simple, comfortable place to stay in Maui with ocean views, privacy,
          and easy access to the island. We’d love to host you.
        </p>
  
        {/* book now button */}
        <a
          href="mailto:luminousstays@hawaii.com"
          style={{
            backgroundColor: "#ffffff",
            color: "#ff6b35",
            padding: "16px 48px",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "600",
            display: "inline-block",
          }}
        >
          Book Your Stay
        </a>
      </section>
    );
  }
  
  export default CTASection;