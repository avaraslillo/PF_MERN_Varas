import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const productRouter = Router();
const path = './src/db/productos.json';

productRouter.get('/', async(req, res) => {
    try{
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(fileOfProducts);
        if(products.length === 0){
            return res.status(404).json({message: 'No hay productos cargados'});
        }
        else{
            return res.json(products);
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

productRouter.get('/:id', async(req, res) => {
    try{
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(fileOfProducts);
        const product = products.find(product => product.id == req.params.id);
        if(product){
           return res.json(product);
        }
        else{
            return res.status(404).json({message: 'No se encontró el producto'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }
});

productRouter.post('/', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;

        if(!title || !description || !code || !price || !status || !stock || !category){
           return res.status(400).json({message: 'Faltan campos obligatorios'});
        }
        const newProduct = {
            id: uuidv4(),
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: (thumbnails) ? thumbnails : []
        };
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        if(fileOfProducts.length === 0){
            await fs.promises.writeFile(path, JSON.stringify([newProduct]));
            res.status(201).json({message: 'Se agregó el producto'});
        }
        else{
            const products = JSON.parse(fileOfProducts);
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products));
            res.status(201).json({message: 'Se agregó el producto'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }
});

productRouter.put('/:id', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;

        if(!title || !description || !code || !price || !status || !stock || !category){
           return res.status(400).json({message: 'Faltan campos obligatorios'});
        }
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(fileOfProducts);
        let product = products.find(product => product.id == req.params.id);
        if(product){
            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.status = status;
            product.stock = stock;
            product.category = category;
            product.thumbnails = (thumbnails) ? thumbnails : [];
            await fs.promises.writeFile(path, JSON.stringify(products));
            res.json({message: 'Se actualizó el producto'});
        }
        else{
            res.status(404).json({message: 'No se encontró el producto'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }
});

productRouter.delete('/:id', async(req, res) => {
    try{
        let fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        let products = JSON.parse(fileOfProducts);
        let product = products.find(product => product.id == req.params.id);
        if(product){
            products = products.filter(product => product.id != req.params.id);
            await fs.promises.writeFile(path, JSON.stringify(products));
            res.json({message: 'Se eliminó el producto'});
        }
        else{
            res.status(404).json({message: 'No se encontró el producto'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

export default productRouter;





