import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cartRouter from './routes/cart.route.js';
import productRouter from './routes/product.route.js';
import viewsRouter from './routes/views.route.js';
import __dirname from './utils.js';

import { Server } from 'socket.io';

const app = express();

dotenv.config(); //nos permitia poder trabjar con las variables de entorno

//Leer y almacenar variables de entorno
const URIConexion = process.env.MONGODB_CONNECTION;

//Conexión a la base de datos
mongoose.connect(URIConexion)
    .then( () => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error en conexion:', error))
;


app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);






const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(httpServer);

io.on('connection', socket => {

    console.log('Cliente conectado');

      // Enviar un mensaje a todos los clientes conectados
    io.emit('message', 'Hola, soy el servidor!');
    socket.emit('message', 'Hola, este es un mensaje personalizado para ti');

    socket.on('message', data => {
        console.log(data);
    })

    socket.on('enlace', async(data) => {
        try{
            await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: 'Hubo un error en la solicitud'});
        }
    });


    socket.on('eliminarProducto', async(id) => {
        try{
            await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE'
            });
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: 'Hubo un error en la conexión con el Websocket'});
        }
    })

    


})

export default io;