const express = require('express')
const todo = require('../model/todos')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('list', {"todos": todo.getAll()})
})

module.exports = router;