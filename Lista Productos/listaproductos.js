//ESTE ARCHIVO ES UNICAMENTE PARA CORROBORAR QUE EL JSON FUNCIONA CORRECTAMENTE 

// función para cargar y mostrar los productos "cargarProcutos"
async function cargarProductos() {
    try {
        // usamos fetch para obtener los datos del archivo JSON
        const respuesta = await fetch('./listaproductos.json');
        
        // se verifica si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Error al cargar los datos: ${respuesta.statusText}`);
        }

        // convierte la respuesta a formato JSON
        const data = await respuesta.json();


        // crear elementos en el DOM y mostrar los productos en la página
        mostrarProductos(data.products);

    } catch (error) {
        console.error('Error:', error);
    }
}

// función para mostrar productos en el DOM 
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.img}" alt="${producto.name}" />
            <h2>${producto.name}</h2>
            <p>Precio: ${producto.price}</p>
            <p>Color: ${producto.color}</p>
            <p>Descripción: ${producto.description}</p>
        `;
        contenedor.appendChild(productoDiv);
    });
}

// se llama a la función para cargar y mostrar los productos
cargarProductos();