const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const todoRoute = require('./routes/todo_route')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use('/assets', express.static(path.join(process.cwd(), 'public')))

app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'pug')

app.use('/', todoRoute);


app.listen(3000)