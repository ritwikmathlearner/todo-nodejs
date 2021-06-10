const express = require('express')
const { getTodos, saveTodos, deleteTodo } = require('../controllers/todos')

const router = express.Router()

router.get('/', getTodos)

router.post('/todo', saveTodos)

router.post('/delete-todo', deleteTodo)

module.exports = router;