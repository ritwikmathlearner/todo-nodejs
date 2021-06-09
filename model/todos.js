const { throws } = require('assert')
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
        listArr.push({"name":this.name})
        fs.writeFileSync(filePath, JSON.stringify(listArr))
    }
}

module.exports = new ToDo