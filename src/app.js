const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sailesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sailesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Hello from the help page!',
        title: 'Help',
        name: 'Sailesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
            return res.send({
                error
            })
           }   
           res.send({
            address:req.query.address,
            location,
            latitude,
            longitude,
            forecast: forecastData
        })
          })
      })
})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help',
        name: 'Sailesh',
        errorMsg: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sailesh',
        errorMsg: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})