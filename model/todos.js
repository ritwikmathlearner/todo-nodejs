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
        let newArr = listArr.map(element => {
            let diff = findDiff(this.name,element.name);
            console.log(diff == '')
            if (diff == '') {
                return {
                    "name": value
                }
            } else {
                return element
            }
        })
        fs.writeFileSync(filePath, JSON.stringify(newArr))
    }
}

function findDiff(str1, str2) {
    let diff = "";
    str2.split('').forEach(function (val, i) {
        if (val != str1.charAt(i))
            diff += val;
    });
    return diff;
}

module.exports = new ToDo