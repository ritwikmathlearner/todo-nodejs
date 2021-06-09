const express = require('express')
const { getTodos, saveTodos } = require('../controllers/todos')

const router = express.Router()

router.get('/', getTodos)

router.post('/todo', saveTodos)

module.exports = router;