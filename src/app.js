import express from 'express';
import mongoose from 'mongoose';   
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import __dirname from "./utils.js";

import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

dotenv.config();
const uriConexion = process.env.URLMONGODB;

mongoose.connect(uriConexion);

app.use(express.static(__dirname + '/public'));

// Middlewares para analizar JSON y datos de formularios
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + '/views');
app.set("view engine", "handlebars");

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Escuchando en el puerto 8080'));
