const express = require('express')
const path = require('path')
const cors = require('cors')
const {
    errors
} = require('celebrate')
const mongoose = require('mongoose')

const app = express()

const todoRoute = require('./routes/todo_route')
const apiTodoRoute = require('./routes/api_route')

const DbConnectionString = 'mongodb://localhost:27017/mytodo?retryWrites=true&w=majority'

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

mongoose.connect(DbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(response => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
