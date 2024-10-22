# PF para Curso Backend Avanzado CH

Este proyecto es una API que maneja un listado de productos y un listado de carritos de compra a los cuales es posible agregar productos.

## Tabla de contenidos

- [Instalación](#instalacion)
- [API Endpoints (Productos)](#api-endpoints-productos)
- [API Endpoints (Carritos)](#api-endpoints-carritos)
- [Vistas](#vistas)
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

Este endpoint obtiene todo el listado de productos. Puede ser accedido mediante la siguiente URL (usando método GET): http://localhost:8080/api/products. Es posible establecer un número de página mediante el parámetro *page*, establecer un límite de productos a visualizar con *limit*, establecer orden ascedente o descedente por precio con el parámetro *sort* (valores *asc* o *desc*), filtrar por categoría mediante el parámetro *category*, y por disponibilidad mediante el parámetro *stock*.

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

### Eliminar un Producto de un Carrito

Este endpoint elimina un producto de un carrito de compra ya existente. Puede ser accedido mediante la siguiente URL (usando método DELETE): http://localhost:8080/api/carts/{$cid}/product/{$pid}, con $cid siendo el ID del carrito de compra y $pid siendo el ID del producto.

### Actualizar la cantidad de ejemplares de un producto dentro de un carrito

Este endpoint actualiza la cantidad de ejemplares de un producto ya existente dentro de un carrito de compra. Puede ser accedido mediante la siguiente URL (usando método PUT): http://localhost:8080/api/carts/{$cid}/product/{$pid}, con $cid siendo el ID del carrito de compra y $pid siendo el ID del producto. Además, se debe enviar a través del body un parámetro llamado quantity.

### Actualizar la cantidad de ejemplares de varios productos dentro de un carrito

Este endpoint actualiza la cantidad de ejemplares de un producto ya existente (o los agrega en caso de que aún no existan) dentro de un carrito de compra. Puede ser accedido mediante la siguiente URL (usando método PUT): http://localhost:8080/api/carts/{$cid}, con $cid siendo el ID del carrito de compra. Además, se deben enviar a través del body los IDs de los productos a agregar dentro del parámetro products.

### Eliminar todos los productos de un carrito

Este endpoint elimina todos los productos del carrito, dejándolo vacío. Puede ser accedido mediante la siguiente URL (usando método DELETE): http://localhost:8080/api/carts/{$cid}, con $cid siendo el ID del carrito de compra.

## Vistas

### Listado de productos

Esta vista permite visualizar el listado de productos, permitiendo filtros por *page*, *sort*, *limit*, *category* y *stock* al igual que el endpoint mencionado previamente. Puede ser accedida desde un navegador mediante la siguiente URL: http://localhost:8080.

### Listado de productos en tiempo real

Esta vista permite visualizar el listado de productos, con notificaciones en tiempo real cuando algún producto es agregado o eliminado. Puede ser accedida desde un navegador mediante la siguiente URL: http://localhost:8080/realtimeproducts.

### Visualización del detalle de un producto

Esta vista permite visualizar el detalle de un producto. Puede ser accedido desde un navegador mediante la siguiente URL: http://localhost:8080/productdetail/${pid} con $pid siendo el ID del producto.

### Visualización de productos dentro de un carrito

Esta vista permite visualizar el listado de productos de un carrito. Puede ser accedido desde un navegador mediante la siguiente URL: http://localhost:8080/cart/${cid} con $cid siendo el ID del carrito.

## Manejo de Errores

Esta API incluye manejo básico de errores:

- 404 Not Found: Si un producto o carrito no es encontrado.
- 400 Bad Request: Si hay campos obligatorios que no están presentes o son inválidos en el request body.
- 500 Internal Server Error: Para errores inesperados en el servidor
