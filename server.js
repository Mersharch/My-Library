
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


//REQUIRING ROUTES
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))



//DATABSE CONNECTION
mongoose.connect(process.env.DB_URL, { useNewUrlParser:true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB connected successfully'))


//USING ROUTES
app.use('/', indexRouter)
app.use('/authors', authorRouter)

//START SERVER
app.listen(process.env.PORT || 5000, () => console.log('Server has Started'))