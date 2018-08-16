const yargs = require('yargs');
const axios = require('axios');

var argv = yargs.options({
	a: {
		alias: 'address',
		string: true,
		demand: true,
		description: 'enter address'
	}
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2I48vMWu7ItrfbpxOT1gb8K5TpfWv09Q&address=${encodedAddress}`;

axios.get(url).then((response) => {
  if (response.data.status == 'ZERO_RESULTS') {
    throw new Error("invalid address");
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/da3aea57954548e4c6b860442d8ddea3/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temperature}, but it feels like ${apparentTemperature}`);
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
     console.log("unable to connect");
  } else {
    console.log(error.message);
  }
});

