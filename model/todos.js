const {
    throws
} = require('assert')
const fs = require('fs')
const path = require('path')

const filePath = path.join(process.cwd(), 'model', 'data.json')

class ToDo {
    setName(name) {
        this.name = name
        return this
    }

    getAll() {
        let data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data)
    }

    save() {
        let self = this
        let listArr = self.getAll()
        if (this.name.trim() === '' || exists(listArr, this.name))
            return
        listArr.push({
            "name": this.name
        })
        fs.writeFileSync(filePath, JSON.stringify(listArr))
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