const express = require('express')
const path = require('path')

const app = express()

app.use('/assets', express.static(path.join(process.cwd(), 'public')))

app.get('/', (req, res) => {
    
})


app.listen(3000)