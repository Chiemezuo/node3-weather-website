const request = require('request')

//To do the geocoding
const geoCode = (value, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoiY2hpZW1lenVvIiwiYSI6ImNreHo3bWtyNTAxenQycHFkYmhwZGk3a2UifQ.PlCMvPV6o-HKM2hkWlmltA&limit=1`

    request({url, json: true}, (error, response) => {
        if (error){
            callback("unable to connect to this")
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const appended = response.body
            callback(undefined, {
                latitude: appended.features[0].center[1],
                longitude: appended.features[0].center[0],
                location: appended.features[0].place_name
            })
        }
    })
}

module.exports = geoCode