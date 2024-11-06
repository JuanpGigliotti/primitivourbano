import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const newId = () => uuidv4();

let products = [];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid title' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description' });
    }

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ message: 'Invalid code' });
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid category' });
    }

    if (price === undefined || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Invalid price' });
    }

    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ message: 'Invalid stock' });
    }

    const newProduct = {
        id: newId(),
        title,
        description,
        code,
        price,
        stock,
        category
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, code, price, stock, category } = req.body;
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (code !== undefined) product.code = code;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;

    res.json({ message: 'Product updated', product });
});

router.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
});

export default router;
