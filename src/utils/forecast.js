const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91a29a926287fcb8b59469289ce25762&query=' + latitude + ',' + longitude + '&unit=f'


    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the weather services',undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,'It is currently ' + body.current.temperature + ' degrees out. Chance of ' + body.current.precip + '% rain.')
        }
    })
}

module.exports = forecast