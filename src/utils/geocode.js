request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZWdnYm9pIiwiYSI6ImNranhhbzBhbDBmb2QycXBnMjZ4cGM5cmgifQ.es8dDYJoBcv70aQtlZpDkw'
 
    request({url, json : true}, (error, {body})=>{
        const {features} = body
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(features.length === 0){
            callback('Unable to find location. Try again with different search results!', undefined)
        }
        else{
            callback(undefined, {
                latitude : features[0].center[1],
                longitude : features[0].center[0],
                location : features[0].place_name
            })
        }
    })
}

module.exports = geocode 