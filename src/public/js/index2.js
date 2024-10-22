const verDetalles = (id) =>  {
    window.location.href = 'productDetail/' + id;
  }

const agregarAlCarrito = async(pid,cid="670b1bde07c4f9f9779d4d0c") => {
    try{
        //Se llama a la API para agregar el producto al carrito
        await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            //Si se agregó correctamente, se muestra una alerta indicando al usuario
        }).then(response => {
            if(response.status === 200 || response.status === 201 || response.status === 204
            || response.status === 304
            ){
                Swal.fire({
                    title: "Éxito",
                    text: "Se agregó el producto al carrito",
                    icon: 'success',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Aceptar'
                  });
            }
            //Si hubo un error, se muestra una alerta indicando al usuario
            else{
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al agregar el producto al carrito",
                    icon: 'error',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Aceptar'
                  });
            }
        })
        
    }
    catch(error){
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Hubo un error al agregar el producto al carrito",
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          });
    }
}

