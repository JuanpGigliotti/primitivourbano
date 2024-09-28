import express from 'express';
import __dirname__ from "./utils.js";
import { handlebars } from 'express-handlebars';

//asi es como se importa las routes
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';

const app = express();

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname__ + '/views');
app.set ('view engine','handlebars'); 

//express json url encoded y las routes de los carts
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);





const PORT = 8080;

app.listen(PORT, () => {
console.log(`listening on port ${PORT}`);
});

