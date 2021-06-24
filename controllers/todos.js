const todo = require('../model/todos')

exports.getTodos = (req, res, next) => {
    todo.getAll().then(toDos => {
        res.render('list', { "todos": toDos })
    })
}

exports.getTodosApi = (req, res, next) => {
    todo.getAll().then(toDos => {
        res.header('Access-Control-Allow-Origin', '*').status(200).json(toDos)
    })
}

exports.saveTodosApi = async (req, res, next) => {
    try {
        let name = req.body.taskname
        let result = await todo.setName(name).save()
        if (typeof result === "undefined" || !result || result.length < 1)
            throw new Error('Save unsuccessful')

        res.header('Access-Control-Allow-Origin', '*').status(202).json(result)
    } catch (err) {
        res.status(500).json("Save unsuccessful")
    }
}

exports.saveTodos = (req, res, next) => {
    let name = req.body.taskname
    let response = todo.setName(name).save()
    res.redirect('/')
}

exports.deleteTodo = (req, res, next) => {
    try {
        let name = req.body.taskname
        let result = todo.setName(name).delete()

        if (!result)
            throw new Error('Delete unsuccessful')

        res.status(202).json("Deleted successfully")
    } catch (err) {
        res.status(500).json("Delete unsuccessful")
    }
}

exports.updateTodo = (req, res, next) => {
    try {
        let name = req.body.oldname
        let newName = req.body.newname

        if (!req.body.newname)
            throw new Error('Update unsuccessful')

        let result = todo.setName(name).update(newName)

        if (!result)
            throw new Error('Update unsuccessful')

        res.header('Access-Control-Allow-Origin', '*').status(202).json("Updated successfully")
    } catch (err) {
        res.header('Access-Control-Allow-Origin', '*').status(500).json("Update unsuccessful")
    }
}