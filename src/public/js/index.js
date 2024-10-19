

const socket = io();

const verDetalles = (id) =>  {
  window.location.href = 'productDetail/' + id;
}
const agregarImagenes = (thumbnails) => {
  let nuevoSetDeImagenes="";
  if(thumbnails.length == 0){
    nuevoSetDeImagenes=document.createElement('p');
    nuevoSetDeImagenes.innerHTML="No hay imágenes";
  }
  else{
    nuevoSetDeImagenes=document.createElement('div');
    for(let i = 0; i < thumbnails.length; i++){
      const img = document.createElement('img');
      img.src = thumbnails[i];
      img.setAttribute('id', 'thumbnail_' + i);
      img.setAttribute('class', 'thumbnail');
      img.setAttribute('alt', 'thumbnails');
      img.size=100;
      nuevoSetDeImagenes.appendChild(img);
      if(i < thumbnails.length - 1){
        nuevoSetDeImagenes.appendChild(document.createElement('br'));
      }
    }
  }

  return nuevoSetDeImagenes;
}

const eliminarProducto = (id) => {
  // Envia un mensaje al servidor a través del canal de Websocket
  socket.emit('eliminarProducto', id);
}



const buscarProductos = async(page,limit,query,sort)=>{
  const searchURLParams = {
    page: page,
    limit: limit,
    query: query,
    sort: sort
  }
  try{
    await fetch(`http://localhost:8080/api/products?${new URLSearchParams(searchURLParams)}`)
    .then(response => response.json())
    .then(data =>{ 
      let tabla=document.getElementById('tbody');
      tabla.innerHTML="";
      for(let i = 0; i < data.payload.length; i++){
        let newProduct=data.payload[i];
        let tr=document.createElement('tr');
        tr.setAttribute('id',"row_"+newProduct.id);
        let td1=document.createElement('td');
        td1.innerHTML=newProduct.title;
        tr.appendChild(td1);
        let td2=document.createElement('td');
        td2.innerHTML=newProduct.description;
        tr.appendChild(td2);
        let td3=document.createElement('td');
        td3.innerHTML=newProduct.code;
        tr.appendChild(td3);
        let td4=document.createElement('td');
        td4.innerHTML=newProduct.price;
        tr.appendChild(td4);
        let td5=document.createElement('td');
        td5.innerHTML=newProduct.status;
        tr.appendChild(td5);
        let td6=document.createElement('td');
        td6.innerHTML=newProduct.stock;
        tr.appendChild(td6);
        let td7=document.createElement('td');
        td7.innerHTML=newProduct.category;
        tr.appendChild(td7);
        let td8=document.createElement('td');
        td8.innerHTML=agregarImagenes(newProduct.thumbnails);
        tr.appendChild(td8);
        let td9=document.createElement('td');
        td9.innerHTML=`<button type="button" class="btn btn-danger" onclick="eliminarProducto(${newProduct.id})">Eliminar</button>`;
        tr.appendChild(td9);
        tabla.appendChild(tr);
      }
    })
  }
  catch(error){
    console.log(error);
  }
}

socket.on('connect', () => {
    console.log('Conectado al servidor WebSocket');
  });
  
  socket.on('message', (data) => {
    console.log(`Mensaje del servidor: ${data}`);
  });

  socket.on('newProduct', (newProduct) => {
    
    // Actualizar la lista de productos en tiempo real
    // ...
    let tabla=document.getElementById('tbody');
    let tr=document.createElement('tr');
    tr.setAttribute('id',"row_"+newProduct.id);
    let td1=document.createElement('td');
    td1.innerHTML=newProduct.title;
    tr.appendChild(td1);
    let td2=document.createElement('td');
    td2.innerHTML=newProduct.description;
    tr.appendChild(td2);
    let td3=document.createElement('td');
    td3.innerHTML=newProduct.code;
    tr.appendChild(td3);
    let td4=document.createElement('td');
    td4.innerHTML=newProduct.price;
    tr.appendChild(td4);
    let td5=document.createElement('td');
    td5.innerHTML=newProduct.status;
    tr.appendChild(td5);
    let td6=document.createElement('td');
    td6.innerHTML=newProduct.stock;
    tr.appendChild(td6);
    let td7=document.createElement('td');
    td7.innerHTML=newProduct.category;
    tr.appendChild(td7);
    let td8=document.createElement('td');
    td8.appendChild(agregarImagenes(newProduct.thumbnails));
    tr.appendChild(td8);
    let td9=document.createElement('td');
    let botonEliminar=document.createElement('button');
    botonEliminar.setAttribute('class','btn btn-danger');
    botonEliminar.onclick=()=>{eliminarProducto(newProduct.id)};
    botonEliminar.innerHTML="Eliminar";
    td9.appendChild(botonEliminar);
    tr.appendChild(td9);
    tabla.appendChild(tr);
    console.log('Nuevo producto agregado:', newProduct);
    Swal.fire({
      title: "Nuevo producto",
      text: "Se ha agregado un nuevo producto: "+newProduct.title,
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar'
    });
    
  });

  socket.on('deleteProduct', (deletedProduct) => {
    document.getElementById("row_"+deletedProduct.id).remove();
    console.log('Producto eliminado:', deletedProduct);
    Swal.fire({
      title: "Producto eliminado",
      text: "Se ha eliminado el producto: "+deletedProduct.title,
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar'
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Desconectado del servidor WebSocket');
  });