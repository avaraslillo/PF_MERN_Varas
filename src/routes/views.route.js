import { Router } from 'express';
import fetch from 'node-fetch';

const viewsRouter = Router();
const urlProductRouter='http://localhost:8080/api/products';

viewsRouter.get('/', async(req, res) => {
    try{
        const response = await fetch(urlProductRouter)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data;

            res.render('home', {
                listOfProducts: listOfProducts,
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
        const response = await fetch(urlProductRouter)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data;

            res.render('realTimeProducts', {
                listOfProducts: listOfProducts,
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