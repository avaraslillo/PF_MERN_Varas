import express from 'express';
import handlebars from 'express-handlebars';
import cartRouter from './routes/cart.route.js';
import productRouter from './routes/product.route.js';
import viewsRouter from './routes/views.route.js';
import __dirname from './utils.js';

import { Server } from 'socket.io';

const app = express();


app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.use(express.static(__dirname+'/public'));



const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(httpServer);

io.on('connection', socket => {

    console.log('Se conectó un cliente');

      // Enviar un mensaje a todos los clientes conectados
    io.emit('message', 'Hola, soy el servidor!');
    socket.emit('message', 'Hola, este es un mensaje personalizado para ti');

    socket.on('message', data => {
        console.log(data);
    })


})

export default io