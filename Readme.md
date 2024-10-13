# PF para Curso Backend Avanzado CH

Este proyecto es una API que maneja un listado de productos y un listado de carritos de compra a los cuales es posible agregar productos.

## Tabla de contenidos

- [Instalación](#instalacion)
- [API Endpoints (Productos)](#api-endpoints-productos)
- [API Endpoints (Carritos)](#api-endpoints-carritos)
- [Manejo de Errores](#manejo-de-errores)

## Instalación

Para empezar con este proyecto, seguir estos pasos:

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/avaraslillo/2ENT_MERN_Varas.git
    ```

2. Navegar al directorio del proyecto:

    ```bash
    cd 2ENT_MERN_VARAS
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

5. Inicializar el servidor:

    ```bash
    npm start
    ```

La API se ejecutará en la siguiente URL `http://localhost:8080`.


Es posible interactuar con la API utilizando herramientas como Postman y CURL.

## API Endpoints (Productos)

### Obtener todos los productos

Este endpoint obtiene todos el listado de productos. Es posible configurar un límite de productos. Puede ser accedido mediante la siguiente URL (usando método GET): http://localhost:8080/api/products

### Obtener producto por ID

Este endpoint obtiene un único producto que coincida con el ID enviado como parámetro. Puede ser accedido mediante la siguiente URL (usando método GET): http://localhost:8080/api/products/{$id}, con $id siendo definido por el usuario.

### Crear Producto

Este endpoint crea un nuevo producto con los siguientes parámetros: title, description, code, price, state, stock, category y thumbnails. Todos los datos son obligatorios a excepción de thumbnails. Puede ser accedido mediante la siguiente URL (usando método POST): http://localhost:8080/api/products

### Actualizar Producto

Este endpoint actualiza un producto ya existente con los siguientes parámetros: title, description, code, price, state, stock, category y thumbnails. Todos los datos son obligatorios a excepción de thumbnails. Puede ser accedido mediante la siguiente URL (usando método POST): http://localhost:8080/api/products/{$id}, con $id siendo definido por el usuario que debe ser actualizado.

### Eliminar Producto

Este endpoint elimina un producto ya existente. Puede ser accedido mediante la siguiente URL (usando método DELETE): http://localhost:8080/api/products/{$id}, con $id siendo definido por el usuario que debe ser eliminado.

### Visualizar el listado de productos.

Este endpoint obtiene el listado de productos y los muestra en una tabla. Puede ser accedido mediante la siguiente URL (directamente desde el navegador): http://localhost:8080

### Visualizar el listado de productos en tiempo real.

Este endpoint obtiene el listado de productos y los muestra en una tabla. Además, se muestran alertas en tiempo real cada vez que se agrega o elimina un producto, gracias al protocolo Websocket. Puede ser accedido mediante la siguiente URL (directamente desde el navegador): http://localhost:8080/realtimeproducts

## API Endpoints (Carritos)

### Obtener carrito por ID

Este endpoint obtiene un único carrito de compra que coincida con el ID enviado como parámetro. Puede ser accedido mediante la siguiente URL (usando método GET): http://localhost:8080/api/carts/{$cid}, con $cid siendo definido por el usuario.

### Crear Carrito

Este endpoint genera un nuevo carrito de compra. Puede ser accedido mediante la siguiente URL (usando método POST): http://localhost:8080/api/carts

### Ingresar Producto a un Carrito

Este endpoint agrega un producto a un carrito de compra ya existente. Puede ser accedido mediante la siguiente URL (usando método POST): http://localhost:8080/api/carts/{$cid}/product/{$pid}, con $cid siendo el ID del carrito de compra y $pid siendo el ID del producto.


## Manejo de Errores

Esta API incluye manejo básico de errores:

- 404 Not Found: Si un producto o carrito no es encontrado.
- 400 Bad Request: Si hay campos obligatorios que no están presentes o son inválidos en el request body.
- 500 Internal Server Error: Para errores inesperados en el servidor
