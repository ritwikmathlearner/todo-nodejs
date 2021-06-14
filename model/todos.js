const fs = require('fs')
const path = require('path')
const { mongoConnect, getDB } = require('../database/database')


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
        } catch(err) {
            console.log(err)
        }
        return
    }

    async save() {
        try {
            const result = await this.items.insertOne({name:this.name})
        } catch (err) {
            console.log(err)
        }
        // let self = this
        // let listArr = self.getAll()
        // if (this.name.trim() === '' || exists(listArr, this.name))
        //     return
        // listArr.push({
        //     "name": this.name
        // })
        // fs.writeFileSync(filePath, JSON.stringify(listArr))
    }

    delete() {
        let self = this
        let listArr = self.getAll()
        let newArr = listArr.filter(element => element.name !== this.name)
        fs.writeFileSync(filePath, JSON.stringify(newArr))
    }

    update(value) {
        let self = this
        let listArr = self.getAll()

        if (exists(listArr, value)) {
            throw 500
        }

        let newArr = listArr.map(element => {
            console.log(this.name.toString().trim(), element.name.toString().trim())
            if (this.name.toString().trim() === element.name.toString().trim()) {
                return {
                    "name": value
                }
            } else {
                return element
            }
        })
        fs.writeFileSync(filePath, JSON.stringify(newArr))
        return true
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