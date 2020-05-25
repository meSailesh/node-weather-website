const request = require('request')

const geocode = (address, callback) => {
  const accessToken = 'pk.eyJ1IjoibWVzYWlsZXNoMDUiLCJhIjoiY2tham83cW1wMGY3NDJ5bnZ2M25kNzExZCJ9.f0bMuE9nNuKSoSGHSSkAxg'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to location services!', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find location. Try another serach.', undefined)
    }
    else{
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude:body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode