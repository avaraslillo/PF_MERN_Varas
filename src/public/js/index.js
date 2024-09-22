

const socket = io();

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
      nuevoSetDeImagenes.appendChild(document.createElement('br'));
    }
  }

  return nuevoSetDeImagenes;
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