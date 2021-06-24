const express = require('express')
const { celebrate } = require('celebrate')

const {
    deleteTodo,
    updateTodo,
    getTodosApi,
    saveTodosApi
} = require('../controllers/todos')
const { toDoUpdateSchemaApi, toDoSaveSchemaApi } = require('../validation/ToDo')

const router = express.Router()


router.get('/getAll', getTodosApi)

router.post('/todo', celebrate(toDoSaveSchemaApi), saveTodosApi)

router.delete('/todo', deleteTodo)

router.patch('/todo', celebrate(toDoUpdateSchemaApi), updateTodo)

module.exports = router;