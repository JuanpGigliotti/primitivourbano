import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

roueter.get('/', (req,res) => {
    res.render("index", {});
})

export default router;