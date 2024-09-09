import { Router } from 'express';

const router = Router();

let cart = [];
let products = [];


//obtener los recursos de los carritos

router.get('/', (req, res) =>{
    res.json(cart);
});

//obtener un recurso específico de un carrito
router.get('/:cid', (req, res) =>{
    const id = parseInt(req.params.cid);
    const cartFound = cart.find(c => c.id === id);
    if(!cartFound) {
        return res.status(404).json({message: 'carrito no encontrado'});
    }
    res.json(cartFound);
});

//crear un nuevo carrito

router.post('/', (req, res) => {

    const {id, products} = req.body;

    if (!id || !Array.isArray(products)) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: id y products (array)' });
    }

    const newCart = { id, products };

    cart.push(newCart);
    res.status(201).json({message: 'carrito creado excelentemente', carrito: newCart });
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const cartFound = cart.find(c => c.id === cid);
    const productFound = products.find(p => p.id === pid);

    if (!cartFound) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    if (!productFound) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    cartFound.products.push(productFound);
    res.status(200).json({ message: 'Producto añadido al carrito', carrito: cartFound });
});




export default router;  
