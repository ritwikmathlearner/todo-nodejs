const todo = require('../model/todos')

exports.getTodos = (req, res, next) => {
    res.render('list', {"todos": todo.getAll()})
}

exports.saveTodos = (req, res, next) => {
    let name = req.body.taskname;
    todo.setName(name).save()
    res.redirect('/')
}

exports.deleteTodo = (req, res, next) => {
    try {
        let name = req.body.taskname;
        todo.setName(name).delete()
        res.status(202).json("Deleted successfully")
    } catch(err) {
        res.status(500).json("Delete unsuccessful")
    }
}