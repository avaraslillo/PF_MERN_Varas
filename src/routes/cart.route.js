import { Router } from 'express';
import cartModel from '../models/cart.model.js';
const cartRouter = Router();
const path = './src/db/carritos.json';


//Función para agregar un carrito
cartRouter.post('/', async(req, res) => {
    try{
        const newCart = await cartModel.create(req.body);
        return res.json({'status': 'success', 'message': 'Se agrego el carrito'});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

//Función para obtener un carrito por su ID
cartRouter.get('/:cid', async(req, res) => {
    try{
        const cart = await cartModel.findById(req.params.cid).populate('products.product');
        if(cart){
           return res.json({status:'success', payload:cart});
        }
        else{
            return res.status(404).json({message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

//Función para agregar un producto con su PID a un carrito con su CID
cartRouter.post('/:cid/product/:pid', async(req, res) => {
    try{
        const product_id = req.params.pid;
        const cart = await cartModel.findById(req.params.cid);

        if(cart){
            const productIndex = cart.products.findIndex(product => product.product == product_id);
            
            if(productIndex!==-1){
                const product = cart.products[productIndex];
                product.quantity = product.quantity + 1;
            }
            else{
                await cart.products.push({product:product_id});
                
            }
            await cart.save();
            return res.json({status: 'success', message: 'Se agregó el producto'});

        }
        else{
            return res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

//Función para eliminar un producto de un carrito
cartRouter.delete('/:cid/product/:pid', async(req, res) => {
    try{
        const product_id = req.params.pid;
        const cart = await cartModel.findById(req.params.cid);
        if(cart){
            const product = cart.products.id(product_id);
            if(product){
                product.remove();
                res.json({status: 'success', message: 'Se elimino el producto'});
            }
            else{
                res.status(404).json({status: 'error', message: 'No se encontró el producto'});
            }
        }
        else{
            res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

//Función para actualizar la cantidad de ejemplares de un producto en un carrito
cartRouter.put('/:cid/product/:pid', async(req, res) => {
    try{
        const product_id = req.params.pid;
        const quantity = req.body.quantity;
        const cart = await cartModel.findById(req.params.cid);
        if(cart){
            const productIndex = cart.products.findIndex(product => product.product == product_id);
            
            if(productIndex!==-1){
                const product = cart.products[productIndex];
                product.quantity = quantity;
            }
            else{
                res.status(404).json({status: 'error', message: 'No se encontró el producto'});
            }
        }
        else{
            res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
    }
});

//Función para eliminar todos los productos de un carrito
cartRouter.delete('/:cid', async(req, res) => {
    try{
        const cart = await cartModel.findById(req.params.cid);
        if(cart){
            const array_of_products = cart.products;
            for(const product of array_of_products){
                await product.remove();
            }
            res.json({status: 'success', message: 'Se eliminaron todos los productos del carrito'});
        }

        else{
            res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

export default cartRouter;