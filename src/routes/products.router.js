import { Router } from 'express';

const router = Router();

let products = [];


//obtener los recursos de los carritos

router.get('/', (req, res) =>{
    res.json(products);
});

//obtener recursos en especfico

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if(!product){
        return res.status(404).json({message: 'Producto no encontrado'});
    }
    res.json(product);
});


//crear un nuevo product

router.post('/', (req, res) => {
    
    const {id, titulo, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!id || !titulo || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: id, titulo, description, code, price, status, stock, category, thumbnails' });
    }

    const newProduct = req.body;
    
    products.push(newProduct);
    res.status(201).json({message: 'product creado excelentemente'});
});

//route put

router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if(productIndex === -1){
        return res.status(404).json({message: 'Producto no encontrado'});
    }

    const updatedProduct = { ...products[productIndex], ...req.body };

    products[productIndex] = updatedProduct;

    res.json(updatedProduct);
});

//route delete

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if(productIndex === -1){
        return res.status(404).json({message: 'Producto no encontrado'});
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({ message: 'Producto eliminado exitosamente', producto: deletedProduct[0] });
});

export default router;  
