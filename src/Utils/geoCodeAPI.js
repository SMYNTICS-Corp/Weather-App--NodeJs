const request = require("postman-request");

const geocode = (address, callback) => {
  //This is the url-
  //https://geocode.search.hereapi.com/v1/geocode?q=kalikavu&limit=4&apiKey=fXGO1Zqb7Gt5JmZ9oac-AosgxWcbgrtxb28w_lCzqRg
  const url =
    "https://geocode.search.hereapi.com/v1/geocode?q=" +
    encodeURIComponent(address) +
    "&limit=4&apiKey=fXGO1Zqb7Gt5JmZ9oac-AosgxWcbgrtxb28w_lCzqRg";
  request(
    {
      url,
      json: true,
    },
    // (error, { body } = {}) => {
    (error, { body }) => {
      if (error) {
        callback(
          "Unable to connect to network. Please check your connection.",
          undefined
        );
        //To understand the given location doesn't exist-
      } else if (body.items.length === 0) {
        callback("Unable to fetch the given location.", undefined);
      } else {
        callback(undefined, {
          location: body.items[0].address.label,
          latitude: body.items[0].position.lat,
          longitude: body.items[0].position.lng,
        });
      }
    }
  );
};

module.exports = geocode;
