import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.get('/', (req,res) => {
    res.render("index", {});
});

router.get('/users', async (req,res) => {
    
    let page = pasrseInt(req.query.page);
    let row = parseInt(req.query.row);
    if(!page) page=1;
    if(!row) row=10;
    let result = await userModel.paginate({},{page, limit: row, lean:true});
    
    result.prevLink = result.hasPrevPage ? `https://localhost:8080/users?page=${result.prevPage}&rows=${row}` : '';  
    result.nextLink = result.hasNextPage ? `https://localhost:8080/users?page=${result.nextPage}&rows=${row}` : '';

    result.isValid = !(page <=0 || page > result.totalPages);
    res.render("user", result);


});

router.get('/statusQuery', async (req,res) => {
    
    let page = pasrseInt(req.query.page);
    let row = parseInt(req.query.row);
    if(!page) page=1;
    if(!row) row=10;

    let result = await userModel.paginate({},{page, limit: row, lean:true});
    result.prevLink = result.hasPrevPage ? `https://localhost:8080/users?page=${result.prevPage}&rows=${row}` : '';
    result.nextLink = result.hasNextPage ? `https://localhost:8080/users?page=${result.nextPage}&rows=${row}` : '';
    res.json(result);


});

export default router;