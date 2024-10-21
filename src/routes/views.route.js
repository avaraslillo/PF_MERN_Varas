import { Router } from 'express';
import fetch from 'node-fetch';

const viewsRouter = Router();
const urlProductRouter='http://localhost:8080/api/products';
const urlCartRouter='http://localhost:8080/api/carts';

//Vista principal para obtener todos los productos

viewsRouter.get('/', async(req, res) => {
    try{
        const limit = req.query.limit;
        const sort = req.query.sort;
        const category = req.query.category;
        const stock = req.query.stock;
        const page = req.query.page;
        const searchURLParams ={
            limit: limit || undefined,
            sort: sort || undefined,
            category: category || undefined,
            stock: stock || undefined,
            page: page || undefined
        }
        const url = `${urlProductRouter}?${new URLSearchParams((Object.entries(searchURLParams).filter(([key, value]) => value !== undefined)))}`;

        const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data.payload;
            res.render('home', {
                defaultCart : "6715339a616f6ea1747f8722",
                listOfProducts: listOfProducts,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                page: data.page,
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
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }    
});

//Vista para obtener todos los productos con websocket
viewsRouter.get('/realtimeproducts', async(req, res) => {
    try{
        const limit = req.query.limit;
        const sort = req.query.sort;
        const category = req.query.category;
        const stock = req.query.stock;
        const page = req.query.page;
        const searchURLParams ={
            limit: limit || undefined,
            sort: sort || undefined,
            category: category || undefined,
            stock: stock || undefined,
            page: page || undefined
        }

        const url = `${urlProductRouter}?${new URLSearchParams((Object.entries(searchURLParams).filter(([key, value]) => value !== undefined)))}`;
        const response = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data.payload;
            res.render('realTimeProducts', {
                listOfProducts: listOfProducts,
                page: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                style: 'home.css'
            });
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }    
});


//Vista para obtener el detalle de un producto específico
viewsRouter.get('/productdetail/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const url = `${urlProductRouter}/${id}`;
        const product = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const product = data.payload;
            res.render('productDetail', {
                product: product,
                defaultCart : "6715339a616f6ea1747f8722",
                style: 'productDetail.css'});
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }    
});

//Vista para obtener el carrito con sus productos
viewsRouter.get('/cart/:cid', async(req, res) => {
    try{
        const id = req.params.cid;
        const url = `${urlCartRouter}/${id}`;
        const cart = await fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            const listOfProducts = data.payload.products;
            res.render('cart', {listOfProducts: listOfProducts, cartid: id ,style: 'cart.css'});
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
})


export default viewsRouter;