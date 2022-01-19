const request = require('postman-request');

const foreCast = (address, sendBack) => {
   
   let long = address.long;
   let lat = address.lat;
   const url = 'http://api.weatherstack.com/current?access_key=d1ded08babe130cb6cd213392496238c&query='+lat+','+long;
   request({ url: url, json:true }, (error, { body }) => {
if(error) {
    sendBack('Unable to connect to weather service!', undefined);
} else if (body.error) {
    sendBack('Unable to find location', undefined);
} else {
sendBack(undefined, {
    desc: body.current.weather_descriptions[0],
    temp: body.current.temperature,
    feel: body.current.feelslike

});
   
}
   });
   
 
};

module.exports = foreCast;