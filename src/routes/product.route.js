import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import io from '../app.js';
const productRouter = Router();
const path = './src/db/productos.json';

//Función para verificar si el archivo existe
const archivoExiste = async () => {
    try {
        await fs.promises.access(path);
    } catch (error) {
        // Si el archivo no existe, es creado con un arreglo vacío
        await fs.promises.writeFile(path, '[]');
    }
};

//Función para obtener todos los productos
productRouter.get('/', async(req, res) => {
    try{
        await archivoExiste();
        const limit = parseInt(req.query.limit) || 1000;

        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(fileOfProducts);
        const productsWithLimit = products.length <= limit ? products : products.slice(0, limit);
        if(productsWithLimit.length === 0){
            return res.status(404).json({message: 'No hay productos cargados'});
        }
        else{
            return res.json(productsWithLimit);
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }

});

//Función para obtener un solo producto por su ID
productRouter.get('/:id', async(req, res) => {
    try{
        await archivoExiste();
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

//Función para agregar un nuevo producto
productRouter.post('/', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        //Todos los atributos son obligatorios a excepción de thumbnails
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
        await archivoExiste();
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        //Si el archivo está vacío, se ingresa el primer producto
        if(fileOfProducts.length === 0){
            await fs.promises.writeFile(path, JSON.stringify([newProduct], null, 2));
            res.status(201).json({message: 'Se agregó el producto'});
            io.emit('newProduct', product);
        }
        //Si el archivo no está vacío, se agrega el nuevo producto
        else{
            const products = JSON.parse(fileOfProducts);
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            res.status(201).json({message: 'Se agregó el producto'});
            io.emit('newProduct', newProduct);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }
});

//Función para actualizar un producto
productRouter.put('/:id', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        //Todos los atributos son obligatorios a excepción de thumbnails
        if(!title || !description || !code || !price || !status || !stock || !category){
           return res.status(400).json({message: 'Faltan campos obligatorios'});
        }
        await archivoExiste();
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
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            res.status(201).json({message: 'Se actualizó el producto'});
            
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

//Función para eliminar un producto
productRouter.delete('/:id', async(req, res) => {
    try{
        await archivoExiste();
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        let products = JSON.parse(fileOfProducts);
        let product = products.find(product => product.id == req.params.id);
        if(product){
            products = products.filter(product => product.id != req.params.id);
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            res.json({message: 'Se eliminó el producto'});
            io.emit('deleteProduct', product);
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





