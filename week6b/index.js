import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS
app.use(express.static("public"));

// Tell Express where your EJS files live
app.set("view engine", "ejs");
app.set("views", "./views"); // make sure this matches your folder path

// Arrays for your course generator
const courseIDs = ["BUS 320", "ICS360", "ICS385", "MKT300"];
const courseNames = ["Entrepreneurship", "Database Design", "Web Dev Admin", "Principles Marketing"];

// GET route → load page
app.get("/", (req, res) => {
  res.render("index.ejs", { 
    courseID: null,
    courseName: null
  });
});

// POST route → generate random course
app.post("/submit", (req, res) => {
  const randomID = courseIDs[Math.floor(Math.random() * courseIDs.length)];
  const randomName = courseNames[Math.floor(Math.random() * courseNames.length)];

  res.render("index.ejs", {
    courseID: randomID,
    courseName: randomName
  });
});

// Start server
app.listen(port, () => {
  console.log(`Course Generator running on http://localhost:${port}`);
});