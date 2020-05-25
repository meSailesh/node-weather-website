const request = require('request')

const forecast = (lat, long, callback) => {
  const accessKey = 'd2f94aed380593e471ec32931a77ab03'
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${long}&units=f`
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find the weather information for the given location')
    } else {
      callback(undefined, `It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out.`)
    }
  })
}

module.exports = forecast