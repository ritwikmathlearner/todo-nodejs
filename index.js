const express = require('express')
const path = require('path')
const {
    mongoConnect
} = require('./database/database')
const cors = require('cors')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const todoRoute = require('./routes/todo_route')
const apiTodoRoute = require('./routes/api_route')

const app = express()

app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use('/assets', express.static(path.join(process.cwd(), 'public')))
app.use('/node_modules', express.static(path.join(process.cwd(), 'node_modules')));

app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'pug')

app.use(todoRoute);
app.use('/api', apiTodoRoute);
app.use(errors())
app.use((error, req, res, next) => {
    if(error.joi) {
        res.status(400).json({error: error.joi.message})
    }
    res.status(400).json({error: error})
})

mongoConnect(() => {
    app.listen(5000)
})