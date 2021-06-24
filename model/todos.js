const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const ToDoModel = mongoose.model('todo', schema)

class ToDo {
    setName(name) {
        this.name = name
        return this
    }

    async getAll() {
        try {
            return await ToDoModel.find({})
        } catch (err) {
            console.log(err)
        }
        return
    }

    async save() {
        try {
            if (!this.name) {
                throw new Error('Empty')
            }
            let todo = await ToDoModel.create({ name: this.name })
            return todo
        } catch (err) {
            return null
        }
    }

    async delete() {
        try {
            const query = {
                name: this.name
            }

            const result = await ToDoModel.deleteOne(query)

            if (result.deletedCount === 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    async update(value) {
        try {
            let self = this
            let listArr = await self.getAll()

            if (exists(listArr, value) && this.name.toString().trim() === element.name.toString().trim()) {
                throw 500
            }

            const filter = {
                name: this.name
            }
            const options = {
                upsert: true
            }

            const updateDoc = {
                $set: {
                    name: value,
                },
            }

            await ToDoModel.updateOne(filter, updateDoc, options)
            return true
        } catch (error) {
            return false
        }
    }
}

function exists(arr, data) {
    let newArr = arr.filter(element => element.name === data)
    if (newArr.length == 0) {
        return false
    }
    return true
}

module.exports = new ToDo