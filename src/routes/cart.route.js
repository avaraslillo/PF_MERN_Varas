import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const cartRouter = Router();
const path = './src/db/carritos.json';

cartRouter.post('/', async(req, res) => {
    try{
        const newCart= {
            id: uuidv4(),
            products: []
        };
        const fileOfCarts = await fs.promises.readFile(path, 'utf-8');
        if(fileOfCarts.length === 0){
            await fs.promises.writeFile(path, JSON.stringify([newCart]));
            res.json({message: 'Se agregó el carrito'});
        }
        else{
            const carts = JSON.parse(fileOfCarts);
            carts.push(newCart);
            await fs.promises.writeFile(path, JSON.stringify(carts));
            res.json({message: 'Se agregó el carrito'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

cartRouter.get('/:cid', async(req, res) => {
    try{
        const fileOfCarts = await fs.promises.readFile(path, 'utf-8');
        const carts = JSON.parse(fileOfCarts);
        const cart = carts.find(cart => cart.id == req.params.cid);
        if(cart){
            return res.json(cart);
        }
        else{
            return res.status(404).json({message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

cartRouter.post('/:cid/product/:pid', async(req, res) => {
    try{
        const fileOfCarts = await fs.promises.readFile(path, 'utf-8');
        const carts = JSON.parse(fileOfCarts);
        const cart = carts.find(cart => cart.id == req.params.cid);
        if(cart){
            const product = cart.products.find(product => product.id == req.params.pid);
            if(product){
               product.quantity += 1; 
            }
            else{
                cart.products.push({id: req.params.pid, quantity: 1});
            }
            await fs.promises.writeFile(path, JSON.stringify(carts));
            res.json({message: 'Se agrego el producto'});
        }
        else{
            res.status(404).json({message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

export default cartRouter;