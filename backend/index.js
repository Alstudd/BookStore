import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    return response.status(234).send("Hello World")
});

app.use('/books', booksRoute);

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT || 5555, () => {
            console.log(`App is listening to port: ${process.env.PORT || 5555}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })
