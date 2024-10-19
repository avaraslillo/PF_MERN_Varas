const verDetalles = (id) =>  {
    window.location.href = 'productDetail/' + id;
  }

const agregarAlCarrito = async(cid,pid) => {
    try{
        await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        Swal.fire({
            title: "Éxito",
            text: "Se agregó el producto al carrito",
            icon: 'success',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          });
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