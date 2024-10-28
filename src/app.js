import express from 'express';
import mongoose from 'mongoose';   
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import __dirname from "./utils.js";

import viewsRouter from './routes/views.router.js';

const app = express();

dotenv.config();
const uriConexion = process.env.URLMONGODB;

mongoose.connect(uriConexion);

app.use(express.static(__dirname + '/public'));


app.engine("handlebars",handlebars.engine());

app.set("views", __dirname + '/views');

app.set("view engine", "handlebars");

app.use('/',viewsRouter);

app.listen(8080, () => console.log('listening on PORT 8080'));