const fs = require('fs')
const path = require('path')
const {
    mongoConnect,
    getDB
} = require('../database/database')


const filePath = path.join(process.cwd(), 'model', 'todo.json')

class ToDo {
    setDB() {
        this.items = getDB().collection('item')
        return this
    }

    setName(name) {
        this.name = name
        return this
    }

    async getAll() {
        try {
            return await this.items.find({}).toArray()
        } catch (err) {
            console.log(err)
        }
        return
    }

    async save() {
        try {
            const result = await this.items.insertOne({
                name: this.name
            })
        } catch (err) {
            console.log(err)
        }
    }

    async delete() {
        try {
            const query = {
                name: this.name
            }
             
            const result = await this.items.deleteOne(query)

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

            await this.items.updateOne(filter, updateDoc, options)
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