const fs = require('fs')
const path = require('path')

const filePath = path.join(process.cwd(), 'model', 'data.json')

class ToDo {
    constructor(name){
        this.name = name
    }

    getAll() {
        let data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data)     
    }

    save() {

    }
}

module.exports = new ToDo