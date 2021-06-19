const express = require('express')
const { celebrate } = require('celebrate')

const {
    deleteTodo,
    updateTodo,
    getTodosApi,
    saveTodosApi
} = require('../controllers/todos')
const { toDoSchemaApi } = require('../validation/ToDo')

const router = express.Router()


router.get('/getAll', getTodosApi)

router.post('/todo', celebrate(toDoSchemaApi), saveTodosApi)

router.delete('/todo', deleteTodo)

router.patch('/todo', celebrate(toDoSchemaApi), updateTodo)

module.exports = router;