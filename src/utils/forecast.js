const request = require('request')

const forecast=(latitude,longitude,callback)=>{

    // const url ='http://api.weatherstack.com/current?access_key=65531930be118ce50d24ea0f155bab16&query=23.0225,72.5714'
    const url ='http://api.weatherstack.com/current?access_key=65531930be118ce50d24ea0f155bab16&query='+latitude+','+longitude;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+' .It is currently '+response.body.current.temperature + ' degress out here in '+response.body.location.name + ' .There is a '+ response.body.current.precip + '% chance of rain'   )
        }
    })
}

module.exports=forecast