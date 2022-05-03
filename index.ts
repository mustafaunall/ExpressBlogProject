import dotenv from "dotenv";
dotenv.config();
import path from 'path'
const { PORT, MONGO_CONNECTION } = process.env;
import express from "express";
const expressHBS = require('express-handlebars')
import mongoose from "mongoose";

import postRouter from "./routes/postRouter";

const app = express();

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isHavePrice: function (price: Number, options: any) {
            return price != 0 ? options.fn(this) : options.inverse(this)
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(postRouter);

const start = async () => {
    try {
        const MongoConnection: string = MONGO_CONNECTION ?? "";
        await mongoose.connect(MongoConnection);

        app.listen(PORT, async () => {
            console.log(`Application started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("ERROR", error);
    }
};

start();
