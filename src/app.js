const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//both required to get body of fetch request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.post('/weather', (req, res) => {

   const address = req.body.address
    

    if(!address){
        return res.send({
            error:"you must provide and address"
        })
    }


    geocode(address,(error,data)=>{
        
        if(error){
           return res.send({error:error})
        }
    
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
    
            if(error){
                return res.send({error:error})
            }
    
            res.send({
                forecast:forecastdata,
                location:data.location,
                address:address
            })
            
        })
        
    
    })



   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port=3003, () => {
    console.log('Server is up on port '+port)
})