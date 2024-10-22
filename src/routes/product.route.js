import { Router } from 'express';
import io from '../app.js';
import productModel from '../models/product.model.js';
const productRouter = Router();


//Función para obtener todos los productos
productRouter.get('/', async(req, res) => {
    try{
        const limit = req.query.limit ? req.query.limit: 10;
        const page = req.query.page ? parseInt(req.query.page): parseInt(1);
        const sort = req.query.sort;
        const sortOptions = {};
        if (sort) {
            sortOptions['price'] = ((sort=='asc') ? 1 : ((sort=='desc') ? -1 : 1));
        }
        const query = {
        };
        
        if (req.query.category) {
            query.category = req.query.category;
        }
        if(req.query.stock){
            query.stock = req.query.stock;
        }

        const options = {
            page,
            limit,
            sort: sortOptions
        };

        const result = await productModel.paginate(query, options);


        if(result.docs.length === 0){
            return res.status(404).json(
                {"status": "error",
                "payload":{"message": 'No hay productos cargados'},
                "totalPages": result.totalPages,
                "prevPage": parseInt(result.page - 1)>0 ? parseInt(result.page - 1) : null,
                "nextPage": parseInt(result.page + 1)<=result.totalPages ? parseInt(result.page + 1) : null,
                "page": result.page,
                "hasPrevPage": result.hasPrevPage,
                "hasNextPage": result.hasNextPage,
                "prevLink": result.hasPrevPage ? `/products?page=${parseInt(result.page - 1)}` : null,
                "nextLink": result.hasNextPage ? `/products?page=${parseInt(result.page + 1)}` : null
                }

            );
        }
        else{
            return res.json({
                "status": "success", 
                "payload": result.docs,
                "totalPages": result.totalPages,
                "prevPage": parseInt(result.page - 1)>0 ? parseInt(result.page - 1) : null,
                "nextPage": parseInt(result.page + 1)<=result.totalPages ? parseInt(result.page + 1) : null,
                "page": result.page,
                "hasPrevPage": result.hasPrevPage,
                "hasNextPage": result.hasNextPage,
                "prevLink": result.hasPrevPage ? `/?page=${parseInt(result.page - 1)}` : null,
                "nextLink": result.hasNextPage ? `/?page=${parseInt(result.page + 1)}` : null
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

//Función para obtener un solo producto por su ID
productRouter.get('/:id', async(req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        if(product){
           return res.json({"status": "success", "payload": product});
        }
        else{
            return res.status(404).json({status: 'error', message: 'No se encontró el producto'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

//Función para agregar un nuevo producto
productRouter.post('/', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        //Todos los atributos son obligatorios a excepción de thumbnails
        if(!title || !description || !code || !price || !status || !stock || !category){
           return res.status(400).json({status: 'error', message: 'Faltan campos obligatorios'});
        }
        const newProduct = await productModel.create(req.body);
        res.status(201).json({"status": "success", "payload":{"message": 'Se agregó el producto',"product": newProduct }});
        io.emit('newProduct', newProduct);
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

//Función para actualizar un producto
productRouter.put('/:id', async(req, res) => {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        //Todos los atributos son obligatorios a excepción de thumbnails
        if(!title || !description || !code || !price || !status || !stock || !category){
           return res.status(400).json({status: 'error', message: 'Faltan campos obligatorios'});
        }
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({status: 'error', message: 'No se encontró el producto'});
        }
        const updatedProduct = await productModel.updateOne({_id: req.params.id}, req.body);
        res.status(201).json({"status": "success", "payload":{"message": 'Se actualizo el producto',"product": updatedProduct }});
        io.emit('updateProduct', product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }
});

//Función para eliminar un producto
productRouter.delete('/:id', async(req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({status: 'error', message: 'No se encontró el producto'});
        }
        await productModel.deleteOne({_id: req.params.id});
        res.json({"status": "success", "payload":{"message": 'Se eliminó el producto'}});
        io.emit('deleteProduct', product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

export default productRouter;





