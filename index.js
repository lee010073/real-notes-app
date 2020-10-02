const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const port = 3000;
const notesdata = require("./notesdata.json");

//setting up handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting up BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setting up dynamic page start from handlebars
app.get("/", (req, res) => {
  res.render("index", {
    title: "Note-taking Application",
    notesdata,
  });
});

//setting up static for public dir(css)(deleted html to prevent crush with handlebars dynamic engine)
app.use(express.static(path.join(__dirname, "public")));

//setting up the access of notes routes
app.use("/api/routes", require("./api/routes"));

//setting-up the local starting index page//
//app.get("/", (req, res) => {
//  res.sendFile(path.join(__dirname, "public", "/index.html"));
//});

//set up the server //
app.listen(port, () => console.log(`here is the start of ${port}`));
