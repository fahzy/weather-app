const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Kabelo Leiee'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        message: 'I don\'t know bruh. Try restarting your page or something.',
        name: 'Kabelo Leiee'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Kabelo Leiee'
    })
})

app.get('', (req, res)=>{
    res.send('<h1>Hello express!<h1>')
})

app.get('/help', (req, res)=>{
    res.send([{
        name: 'Kabelo',
        age: 21
    },
    {
        help: 'me',
        mf: 'doom'
    }])
})

app.get('/about', (req, res)=>{
    res.send('<h1>About<h1>')
})

app.get('/weather', (req, res)=>{
    const address = req.query.address

    if(!address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, data)=>{
            if(error){
                return res.send({
                    error
                })
            }

            return res.send({
                forecast: data,
                location
            })
        })
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: 'Page Not Found',
        name: 'Kabelo Leiee',
        message: 'The article you are looking for doesn\'t exist.'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search option'
        })
    }
    else console.log("The Query:", req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: 'Page Not Found',
        name: 'Kabelo Leiee',
        message: 'The page you are looking for doesn\'t exist.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})