const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { mongoConnect } = require('./database/database')

const todoRoute = require('./routes/todo_route')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/assets', express.static(path.join(process.cwd(), 'public')))
app.use('/node_modules', express.static(path.join(process.cwd(), 'node_modules')));

app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'pug')

app.use(todoRoute);

mongoConnect(() => {
    app.listen(3000)
})