const request = require('request')

const geocode =(address , callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHJ1dHZpazEiLCJhIjoiY2wycTJ5b2EwMDFlcjNpcGVvN3ZpNGx6bSJ9.g58i6kiz-vLcPwXKl3RBlA&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services')
        }else if(response.body.features.length===0){
            callback("unable to find location . find another search",undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })

}

module.exports=geocode