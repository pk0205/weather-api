const path = require("path");

const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup hbs and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(staticPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Prashant Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Prashant Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help  ",
    name: "Prashant Kumar",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  // console.log(address);
  if (!address) {
    return res.send({
      error: "Please provide an address.",
    });
  }
  forecast(address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    return res.send({ response });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help  ",
    name: "Prashant Kumar",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prashant Kumar",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up");
});
