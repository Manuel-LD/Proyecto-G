// Función para cargar y mostrar los productos
async function cargarProductos() {
    try {
        // Usa fetch para obtener los datos del archivo JSON
        const respuesta = await fetch('../listaproductos.json');
        
        // Verifica si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Error al cargar los datos: ${respuesta.statusText}`);
        }

        // Convierte la respuesta a formato JSON
        const data = await respuesta.json();

        // Itera sobre cada producto y muestra sus detalles en la consola (o en la página)
        data.products.forEach(producto => {
            console.log(`ID: ${producto.id}`);
            console.log(`Nombre: ${producto.name}`);
            console.log(`Categoría: ${producto.category}`);
            console.log(`Imagen: ${producto.img}`);
            console.log(`Precio: ${producto.price}`);
            console.log(`Color: ${producto.color}`);
            console.log(`Descripción: ${producto.description}`);
            console.log('---------------------------');
        });

        // Puedes usar estos datos para crear elementos en el DOM y mostrar los productos en la página
        mostrarProductos(data.products);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar productos en el DOM (opcional)
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos'); // Asegúrate de tener un div con este ID en tu HTML
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

// Llama a la función para cargar y mostrar los productos
cargarProductos();
