import { Router } from 'express';
import io from '../app.js';
import productModel from '../models/product.model.js';
const productRouter = Router();


//Función para obtener todos los productos
productRouter.get('/', async(req, res) => {
    try{
        const limit = req.query.limit ? req.query.limit: 10;
        const page = req.query.page ? parseInt(req.query.page): parseInt(1);
        const sort = req.query.sort ? req.query.sort: null;
        const query = req.query.q ? req.query.q: null;
        const products = await productModel.find(query).sort().limit(limit).skip((page - 1) * limit);

        const totalCount = await productModel.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        if(products.length === 0){
            return res.status(404).json(
                {"status": "error",
                "payload":{"message": 'No hay productos cargados'},
                "totalPages": totalPages,
                "prevPage": parseInt(page - 1)>0 ? parseInt(page - 1) : null,
                "nextPage": parseInt(page + 1)<=totalPages ? parseInt(page + 1) : null,
                "page": page,
                "hasPrevPage": parseInt(page - 1)>0 ? true : false,
                "hasNextPage": parseInt(page + 1)<=totalPages ? true : false,
                "prevLink": parseInt(page - 1)>0 ? `/api/products?page=${parseInt(page - 1)}` : null,
                "nextLink": parseInt(page + 1)<=totalPages ? `/api/products?page=${parseInt(page + 1)}` : null
                }

            );
        }
        else{
            return res.json({
                "status": "success", 
                "payload": products,
                "totalPages": totalPages,
                "prevPage": parseInt(page - 1)>0 ? parseInt(page - 1) : null,
                "nextPage": parseInt(page + 1)<=totalPages ? parseInt(page + 1) : null,
                "page": page,
                "hasPrevPage": parseInt(page - 1)>0 ? true : false,
                "hasNextPage": parseInt(page + 1)<=totalPages ? true : false,
                "prevLink": parseInt(page - 1)>0 ? `/api/products?page=${parseInt(page - 1)}` : null,
                "nextLink": parseInt(page + 1)<=totalPages ? `/api/products?page=${parseInt(page + 1)}` : null
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
            return res.status(404).json({message: 'No se encontró el producto'});
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
           return res.status(400).json({message: 'Faltan campos obligatorios'});
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
           return res.status(400).json({message: 'Faltan campos obligatorios'});
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
        await archivoExiste();
        const fileOfProducts = await fs.promises.readFile(path, 'utf-8');
        let products = JSON.parse(fileOfProducts);
        const product = productModel.deleteOne({_id: req.params.id});
        res.json({"status": "success", "payload":{"message": 'Se eliminó el producto'}});
        io.emit('deleteProduct', product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({status:'error',message: 'Hubo un error en el servidor'});
    }

});

export default productRouter;





