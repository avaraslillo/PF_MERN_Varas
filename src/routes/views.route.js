import { Router } from 'express';
import fetch from 'node-fetch';

const viewsRouter = Router();
const urlProductRouter='http://localhost:8080/api/products';

viewsRouter.get('/', async(req, res) => {
    try{
        const limit = req.query.limit;
        const sort = req.query.sort;
        const category = req.query.category;
        const stock = req.query.stock;
        const page = req.query.page;
        const searchURLParams ={
            limit: limit,
            sort: sort,
            category: category,
            stock: stock,
            page: page
        }
        const url = `${urlProductRouter}?${new URLSearchParams(searchURLParams)}`;

        const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data.payload;
            res.render('home', {
                listOfProducts: listOfProducts,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                prevLink: data.prevLink,
                nextLink: data.nextLink,
                style: 'home.css'
            });
        });

        //const listOfProducts = await response.json();
        

        //res.render('home', {listOfProducts});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }    
});

viewsRouter.get('/realtimeproducts', async(req, res) => {
    try{
        const limit = req.query.limit;
        const sort = req.query.sort;
        const category = req.query.category;
        const stock = req.query.stock;
        const page = req.query.page;
        const searchURLParams ={
            limit: limit,
            sort: sort,
            category: category,
            stock: stock,
            page: page
        }

        const url = `${urlProductRouter}?${new URLSearchParams(searchURLParams)}`;
        const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data.payload;
            res.render('realTimeProducts', {
                listOfProducts: listOfProducts,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                style: 'home.css'
            });
        });

        //const listOfProducts = await response.json();
        

        //res.render('home', {listOfProducts});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error al leer el archivo'});
    }    
});

export default viewsRouter;