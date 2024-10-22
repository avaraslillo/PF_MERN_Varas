import { Router } from 'express';
import cartModel from '../models/cart.model.js';
const cartRouter = Router();


//Función para agregar un carrito
cartRouter.post('/', async(req, res) => {
    try{
        const newCart = await cartModel.create(req.body);
        return res.json({'status': 'success', 'message': 'Se agregó el carrito'});
        
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
            return res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
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

//Función para ingresar un conjunto de productos a un carrito con su CID
cartRouter.put('/:cid', async(req, res) => {
    try{
        const cart = await cartModel.findById(req.params.cid);
        const array_of_products = req.body.products;
        if(cart){
            for(const productID of array_of_products){
                //Si el producto ya existe, se actualiza la cantidad de ejemplares
                const productIndex = cart.products.findIndex(p => p.product == productID);
                if(productIndex!==-1){
                    const foundProduct = cart.products[productIndex];
                    foundProduct.quantity = foundProduct.quantity+1;
                }
                //Si el producto no existe, se agrega al carrito
                else{
                    await cart.products.push({product:productID, quantity: 1});
                }
            }
            await cart.save();
            return res.json({status: 'success', message: 'Se actualizó el carrito'});
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
            console.log(cart.products);
            const product = cart.products.find(product => product.product == product_id);
            console.log(product);
            if(product){
                const index = cart.products.indexOf(product);
                cart.products.splice(index, 1);
                await cart.save();
                return res.json({status: 'success', message: 'Se eliminó el producto'});
            }
            else{
                returnres.status(404).json({status: 'error', message: 'No se encontró el producto'});
            }
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

//Función para actualizar la cantidad de ejemplares de un producto en un carrito
cartRouter.put('/:cid/product/:pid', async(req, res) => {
    try{
        const product_id = req.params.pid;
        const quantity = req.body.quantity;
        const cart = await cartModel.findById(req.params.cid);
        console.log(cart);
        if(cart){
            const productIndex = cart.products.findIndex(product => product.product == product_id);
            console.log(productIndex);
            
            if(productIndex!==-1){
                const product = cart.products[productIndex];
                product.quantity = quantity;
                await cart.save();
                return res.json({status: 'success', message: 'Se actualizó la cantidad del producto'});
            }
            else{
                return res.status(404).json({status: 'error', message: 'No se encontró el producto'});
            }
        }
        else{
            return res.status(404).json({status: 'error', message: 'No se encontró el carrito'});
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
            cart.products = [];
            await cart.save();
            return res.json({status: 'success', message: 'Se eliminaron todos los productos del carrito'});
        }

        else{
            returnres.status(404).json({status: 'error', message: 'No se encontró el carrito'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

export default cartRouter;