const request = require("request")

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=32a9fd2b542b93c5cf1e18262446f3f2&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'

    request({url, json : true}, (error, {body})=>{
        const {error: bodyError, current} = body
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(bodyError){
            callback(bodyError.info, undefined)
        }
        else{
            callback(undefined, {
                temperature : current.temperature,
                description : current.weather_descriptions,
                wind_speed : current.wind_speed
            })
        }
    })
}



module.exports = forecast