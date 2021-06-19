const { celebrate } = require('celebrate')
const express = require('express')

const {
    getTodos,
    saveTodos
} = require('../controllers/todos')
const { toDoSchema } = require('../validation/ToDo')

const router = express.Router()

router.get('/', getTodos)

router.post('/todo', celebrate(toDoSchema), saveTodos)

module.exports = router;