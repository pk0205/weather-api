const request = require("request");

const baseURL = "http://api.weatherstack.com/";

const accessToken = "13f813ac85f0acfed48c36b64a134785";

const forecast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=13f813ac85f0acfed48c36b64a134785&query=" +
    location;
  // console.log(location);
  // console.log(url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("This is a error", undefined);
    } else if (response.body.success === false) {
      callback("Wrong location code", undefined);
    } else {
      console.log(response.body);
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;

// forecast("New York", (error, response) => {
//   console.log("Error :- " + error);
//   console.log("Data :- " + response);
// });
