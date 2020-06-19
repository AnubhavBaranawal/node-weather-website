const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//DEfine paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Step up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup Static directry to serve  sz       
app.use(express.static(publicDirectoryPath))


//app.com
//app.com/help
//app.com/about

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Anubhav Baranawal'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Anubhav Baranawal'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful Text',
        name: 'Anubhav Baranawal',
        title: 'Help'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast( latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({ error })
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search terms'            
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Anubhav Baranawal',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Anubhav Baranawal',
        message: 'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})
    