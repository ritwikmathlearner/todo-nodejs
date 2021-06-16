const express = require('express')

const { getTodos, saveTodos, deleteTodo, updateTodo, getTodosApi } = require('../controllers/todos')

const router = express.Router()

router.get('/', getTodos)

router.get('/api/getAll', getTodosApi)

router.post('/todo', saveTodos)

router.delete('/todo', deleteTodo)

router.patch('/todo', updateTodo)

module.exports = router;