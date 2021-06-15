const todo = require('../model/todos')

exports.getTodos = (req, res, next) => {
    todo.setDB().getAll().then(toDos => {
        res.render('list', {"todos": toDos})
    })
}

exports.saveTodos = (req, res, next) => {
    let name = req.body.taskname;
    todo.setDB().setName(name).save()
    res.redirect('/')
}

exports.deleteTodo = (req, res, next) => {
    try {
        let name = req.body.taskname;
        let result  = todo.setDB().setName(name).delete()
        
        if(!result)
            throw new Error('Delete unsuccessful')

        res.status(202).json("Deleted successfully")
    } catch(err) {
        res.status(500).json("Delete unsuccessful")
    }
}

exports.updateTodo = (req, res, next) => {
    try {
        let name = req.body.oldname
        let newName = req.body.newname
        
        let result = todo.setDB().setName(name).update(newName)
        
        if(!result)
            throw new Error('Update unsuccessful')

        res.status(202).json("Updated successfully")
    } catch(err) {
        console.log(err)
        res.status(500).json("Update unsuccessful")
    }
    res.end()
}