require('dotenv').config()
const { PORT, MONGO_CONNECTION } = process.env
const express = require('express')
const mongoose = require('mongoose')
const expressHBS = require('express-handlebars')

const userRouter = require('./routes/userRouter')

const app = express()

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(userRouter)

const start = async () => {
    try {
        await mongoose.connect(MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, async () => {
            console.log(`Application started on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log('ERROR', error)
    }
}

start()
