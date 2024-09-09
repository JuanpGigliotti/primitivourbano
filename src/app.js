import express from 'express';
import path from 'path';
import __dirname__ from "./utils.js";

//asi es como se importa las routes
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';


const app = express();
const PORT = 8080;

app.listen(PORT, () => {
console.log('listening on port ${PORT}');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);