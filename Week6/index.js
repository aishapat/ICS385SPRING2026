import express from "express"; // import express framework
import bodyParser from "body-parser"; // import body-parser to read form data

const app = express(); // start the web server
const port = 3000; // port number for the server

// tell express to use EJS template and where views are
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true })); // allow form data

// preset lists
const choresList = ["Wash dishes", "Take out trash", "Yard work"];
const campingList = ["Pack tent", "Bring sleeping bag", "Bring propane gas stove"];

// route for chores list
app.get("/chores", (req, res) => {
  res.render("list", { title: "Chores To-Do List", items: choresList });
});

// route for camping list
app.get("/camping", (req, res) => {
  res.render("list", { title: "Camping To-Do List", items: campingList });
});

// start server and listen for requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
