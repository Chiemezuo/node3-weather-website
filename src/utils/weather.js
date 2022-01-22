const request = require('request')

//Let us start by getting the weather of a location.
const foreCast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ed7c71ddb747cd2d3ccaba29789cc690&query=${lat},${long}`
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to access this service")
        } else if (response.body.error){
            callback(response.body.error.info)
        } else {
            const appended = response.body
            const temperature = appended.current.temperature
            const feelsLike = appended.current.feelslike
            callback(undefined, `It is ${temperature} degrees, but it feels like ${feelsLike} degrees. The humidity is ${appended.current.humidity}%`)
            
        }
    })
}

module.exports = foreCast