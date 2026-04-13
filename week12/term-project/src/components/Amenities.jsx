// Amenities.jsx - displays property amenities using .map()

// list of amenities
const amenitiesList = [
{ id: 1, name: "Ocean View", icon: "Ocean" },
{ id: 2, name: "Pool", icon: "Pool" },
{ id: 3, name: "Gym", icon: "Gym" },
{ id: 4, name: "WiFi", icon: "WiFi" },
{ id: 5, name: "Parking", icon: "Parking" },
{ id: 6, name: "Air Conditioning", icon: "AC" },
  ];
  
function Amenities() {
return (
// amenities section
<section
id="amenities"
style={{
backgroundColor: "#e8f4f8",
padding: "80px 40px",
textAlign: "center",
}}
>
{/* section title */}
<h2 style={{ color: "#0096c7", fontSize: "36px", marginBottom: "20px" }}>
 Amenities
</h2>
  
{/* divider line */}
<div
style={{
width: "60px",
height: "4px",
backgroundColor: "#ff6b35",
margin: "0 auto 40px",
}}
/>
  
{/* amenities grid */}
<div
style={{
display: "flex",
flexWrap: "wrap",
justifyContent: "center",
gap: "20px",
maxWidth: "900px",
margin: "0 auto",
 }}
>
{amenitiesList.map((amenity) => (
<div
key={amenity.id}
style={{
backgroundColor: "#ffffff",
borderRadius: "12px",
padding: "30px 20px",
width: "140px",
boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
}}
>
{/* icon text */}
<div style={{ fontSize: "16px", marginBottom: "12px", color: "#333" }}>
{amenity.icon}
</div>
  
{/* amenity name */}
<p
style={{
color: "#333",
fontSize: "14px",
margin: 0,
fontWeight: "500",
}}
>
{amenity.name}
</p>
</div>
))}
</div>
</section>
);
}
  
  export default Amenities;