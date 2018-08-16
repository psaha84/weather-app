const request = require('request');

var getGeocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2I48vMWu7ItrfbpxOT1gb8K5TpfWv09Q&address=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback("Unable to connect googleapis service");
		} else if (body.status == 'ZERO_RESULTS') {
			callback("Invalid address");
		} else {
			callback(undefined, {
				formatedAddress: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
			});
		}
	})
}

module.exports.getGeocodeAddress = getGeocodeAddress;
