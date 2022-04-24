const express = require('express')
require('dotenv').config()

const app = express()
const { PORT } = process.env


app.listen(3000, () => {
    console.log(`Application started on http://localhost:${PORT}`)
})