const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./Utils/geoCodeAPI");
const foreCast = require("./Utils/forecastAPI");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express confgs
const publicDirectoryPath = path.join(__dirname, "..", "/public");
const viewsPath = path.join(__dirname, "..", "/templates/views");
const partialsPath = path.join(__dirname, "..", "/templates/partials");

app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.get("", (req, res) => {
  res.render("index", { name: "SMYNTICS Corp", title: "Weather" });
});
app.get("/about", (req, res) => {
  res.render("about", { name: "SMYNTICS Corp", title: "About page" });
});
app.get("/help", (req, res) => {
  res.render("help", { name: "SMYNTICS Corp", title: "Help page" });
});

//request for weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  //responding with weather data
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      foreCast(latitude, longitude, (error, foreCastdata) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          location,
          forecast: foreCastdata,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "SMYNTICS Corp",
    title: "Help Page Error 404",
    errorMessage: "Help page not found!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "SMYNTICS Corp",
    title: "Error 404",
    errorMessage: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server has started in " + port);
});

//Heroku setup -
//Note- Heroku CLI(command line interface) should be installed.
//heroku keys: add = in project root folder.
//heroku create __application name(should be a unique one)
