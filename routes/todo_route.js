const express = require('express')

const { getTodos, saveTodos, deleteTodo, updateTodo, getTodosApi, saveTodosApi } = require('../controllers/todos')

const router = express.Router()

router.get('/', getTodos)

router.get('/api/getAll', getTodosApi)

router.post('/todo', saveTodos)

router.post('/api/todo', saveTodosApi)

router.delete('/todo', deleteTodo)

router.patch('/todo', updateTodo)

module.exports = router;