const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(viewsPath)

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        name: "Chiemezuo"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About",
        name: "Chiemezuo"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Chiemezuo"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'An address is required'
        })
    }

    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, forecast) =>{
            if (error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Chiemezuo'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Chiemezuo'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})