import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const cart = [];
let products = [];  

router.get('/', (req, res) => {
    res.json(cart);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cartFound = cart.find(c => c.id === id);
    if (!cartFound) {
        return res.status(404).json({ message: 'cart not found' });
    }
    res.json(cartFound);
});

router.post('/', (req, res) => {
    const { products: productsInCart } = req.body;

    if (!Array.isArray(productsInCart)) {
        return res.status(400).json({ message: 'products not provided' });
    }

    const newCart = { id: uuidv4(), products: productsInCart };

    cart.push(newCart);
    res.status(201).json({ message: 'cart created', carrito: newCart });
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cartFound = cart.find(c => c.id === cid);
    const productFound = products.find(p => p.id === pid);

    if (!cartFound) {
        return res.status(404).json({ message: 'cart not found' });
    }

    if (!productFound) {
        return res.status(404).json({ message: 'product not found' });
    }

    if (!cartFound.products.some(p => p.id === productFound.id)) {
        cartFound.products.push(productFound);
    }

    res.status(200).json({ message: 'product added', carrito: cartFound });
});

export default router;
