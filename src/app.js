const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');


// __dirname gets access to the entire directory
// __filename gets access to the entire file

const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// node can multiple templating engines for views.
// here we are using hbs
// We need express to understand that we are using hbs

// Setup handlebars engine and views / partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req,res) => {
res.render('index', {
    title: 'Weather',
    helpText: 'Welcome to the Weather Page',
    name: 'A robot'
});
});

app.get('/about', (req,res) => {
res.render('about', {
    title: 'About Me',
    name: 'A robot',
    helpText: 'I am a Robot not unlike your social life!!',
})
});

app.get('/help', (req,res) => {
res.render('help', {
    helpText: 'Sorry I only help robots. And you are a stone like your social life.',
    title: 'Help Page',
    name: 'A robot'
})
});

app.get('/weather', (req,res)=> {
   if(!req.query.address) {
       return res.send({
       error: 'You must provide an address'
       });
   }

   geoCode(req.query.address, (error, { location, latitude, longitude } = {}) => {
    if(error)
    {
        return res.send({
          error: error
        });
        
    }
    const lat = latitude;
    const long = longitude;

    foreCast({ lat, long }, (error, { desc, temp, feel } = {}) => {
     
        if(error)
    {
        return res.send({
          error: error
        });
        
    }
    let forecast = '';
    if(desc && temp && feel)
    {
        forecast = "In " + location + ", it is currently " + temp + " degrees. But it feels like " + feel + " degrees. So it is generally " + desc + ".";
    }
    res.send({
        forecast: forecast,
        location: location
    });


    });

   });

    
        });

        
// Help 404
app.get('/help/*', (req,res)=> {
res.render('404', {
    helpText: 'Sorry no such help document exists... like your social Life!!',
    title: 'Help 404',
    name: 'A robot'
})
}); 

// 404
app.get('*', (req,res) => {
res.render('404', {
helpText: 'Sorry this page does not exist like your social life!!',
title: '404',
name: 'A robot'
});
});        


// To start the server
app.listen(port, () => {
    console.log('Server is up on port '+ port);
});