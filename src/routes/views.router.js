import { Router } from "express";
import productsModel from "../models/products.model.js";    

const router = Router();

router.get('/', (req, res) => {
    res.render("index", {});
});

router.get('/products', async (req, res) => {
    let page = parseInt(req.query.page);
    let row = parseInt(req.query.row);
    if (!page) page = 1;
    if (!row) row = 10;

    let result = await productsModel.paginate({}, { page, limit: row, lean: true });
    
    result.prevLink = result.hasPrevPage ? `https://localhost:8080/products?page=${result.prevPage}&row=${row}` : '';  
    result.nextLink = result.hasNextPage ? `https://localhost:8080/products?page=${result.nextPage}&row=${row}` : '';

    result.isValid = !(page <= 0 || page > result.totalPages);
    if (!result.isValid) {
        return res.status(400).json({ message: 'Invalid page number' });
    }

    res.render("product", result);
});

router.get('/statusQuery', async (req, res) => {
    let page = parseInt(req.query.page);
    let row = parseInt(req.query.row);
    if (!page) page = 1;
    if (!row) row = 10;

    let result = await productsModel.paginate({}, { page, limit: row, lean: true });
    
    result.prevLink = result.hasPrevPage ? `https://localhost:8080/products?page=${result.prevPage}&row=${row}` : '';
    result.nextLink = result.hasNextPage ? `https://localhost:8080/products?page=${result.nextPage}&row=${row}` : '';

    res.json(result);
});

export default router;
