const todo = require('../model/todos')

exports.getTodos = (req, res, next) => {
    res.render('list', {"todos": todo.getAll()})
}

exports.saveTodos = (req, res, next) => {
    let obj = req.body;
    todo.setName(obj.taskname).save()
    res.redirect('/')
}