// // Requesting weather information
const request = require("postman-request");

const foreCast = (lat, long, callback) => {
  //This is the url-
  //http://api.weatherstack.com/current?access_key=838b2e3e29d1f72da22c94d50f5f16c2&query=12.96643,77.58723&units=f
  const url =
    "http://api.weatherstack.com/current?access_key=838b2e3e29d1f72da22c94d50f5f16c2&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback(
          "Unable to connect to Weatherstack.com network. Please check your connection.",
          undefined
        );
        console.log(error);
      } else if (body.error) {
        callback(
          "Unable to fetch the given location. ( Weatherstack.com network didn't get the coordinates)",
          undefined
        );
      } else {
        callback(
          undefined,
          "The weather is " +
            body.current.weather_descriptions[0] +
            ". It's currently " +
            body.current.temperature +
            " degrees out. It feels like " +
            body.current.feelslike +
            " degrees out." +
            "The pressure is " +
            body.current.pressure +
            " and the humidity is " +
            body.current.humidity +
            "%"
        );
      }
    }
  );
};

module.exports = foreCast;
