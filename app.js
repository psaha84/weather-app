const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var argv = yargs.options({
	a: {
		alias: 'address',
		string: true,
		demand: true,
		description: 'enter address'
	}
}).help().alias('help', 'h').argv;

geocode.getGeocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
	    if (errorMessage) {
		    console.log(errorMessage);
	    } else {
        console.log(`It is currently ${results.temperature}, but it feels like ${results.apparentTemperature}`);
      }
    });
	}
});
