import dotenv from "dotenv";
dotenv.config();
import path from 'path'
const { PORT, MONGO_CONNECTION } = process.env;
import express from "express";
const expressHBS = require('express-handlebars')
import mongoose from "mongoose";

import postRouter from "./routes/postRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        isHavePrice: function (price: number, options: any): any {
            return price != 0 ? options.fn(this) : options.inverse(this)
        },
        dateDiff: function (startDate: Date = new Date(Date.now()), endDate: Date): string {
            console.log(endDate)
            let diffTime: number = endDate.getTime() - startDate.getTime()
            let diffDay: number = diffTime / (1000 * 3600 * 24)
            return `${diffDay} gün önce`
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(postRouter);

const start = async () => {
    try {
        const MongoConnection: string = MONGO_CONNECTION ?? "";
        await mongoose.connect(MongoConnection);

        app.listen(process.env.PORT || 3000, async () => {
            console.log(`Application started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("ERROR", error);
    }
};

start();
