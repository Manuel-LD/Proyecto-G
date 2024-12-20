// 1. Obtener los datos del carrito desde localStorage
function loadOrderData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Si no hay datos, obtenemos un arreglo vacío
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotalElement = document.getElementById('orderTotal');
    let total = 0;
    let subtotal = 0;
    let amount = 0;

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        orderTotalElement.innerHTML = "$0.00";
    } else {
        // Renderizamos los productos en la orden
        orderItemsContainer.innerHTML = cart.map((item, i) => {
            const { description, image, price, quantity } = item;
            subtotal += price * quantity; // Calculamos el subtotal
            amount += quantity; // Sumar la cantidad de productos
            total += price * quantity * 1.04; // Aplicamos un impuesto del 4% (esto lo puedes ajustar si es necesario)

            return `
                <div class="order-item">
                    <div class="order-item-img">
                        <img src="${image}" alt="${description}" />
                    </div>
                    <div class="order-item-info">
                        <h4>${description}</h4>
                        <p>Price: $${price}.00 x ${quantity}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Actualizamos el total de la orden
        orderTotalElement.innerHTML = `$${total.toFixed(2)}`; // Mostramos el total con 2 decimales
    }
}

// 2. Finalizar la compra y crear la orden
async function finishOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); // Calcular el subtotal
    const amount = cart.reduce((acc, item) => acc + item.quantity, 0); // Total cantidad de productos
    const total = subtotal * 1.04; // Aplicar impuestos (4%)
    const date_creation = new Date().toISOString().split('T')[0]; // Fecha de creación (formato YYYY-MM-DD)

    // Información de envío (personaliza estos datos o recolectalos de un formulario)
    const shipment = {
        id_shipment: 1,  // Puedes usar un valor único o predefinirlo
        address: "Av. Paseo de la Reforma 123, Ciudad de México, CDMX",  // Aquí va la dirección de envío
        tracking_number: "TRACK123",  // Número de seguimiento (puedes generarlo o dejarlo vacío si no aplica)
        status: "En tránsito",  // Estado del envío
        shipping_date: date_creation,  // La fecha de envío será la misma que la de creación de la orden
        estimated_delivery_date: "2024-12-10"  // Estimación de entrega (asegurate de que sea una fecha válida)
    };

    // Estructura de la nueva orden
    const order = {
        shipment: shipment,
        id_order: Date.now(),  // ID único basado en el timestamp (verifica si la API espera algo diferente)
        amount: amount,
        subtotal: subtotal,
        total: total,
        date_creation: date_creation
    };

    try {
        // Enviar la solicitud POST a la API para crear la nueva orden
        const response = await fetch('http://18.119.124.239:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        // Si la respuesta es OK, procesamos la orden
        if (response.ok) {
            const newOrder = await response.json();
            alert('Order successfully created! Your order ID is: ' + newOrder.id_order);

            // Limpiar el carrito en localStorage
            localStorage.removeItem('cart');

            // Redirigir a la página de confirmación
            window.location.href = "index.html"; // O la página que desees redirigir
        } else {
            // Si la respuesta no es exitosa, obtenemos el detalle de la respuesta
            const errorText = await response.text();  // Intentamos obtener el mensaje de error como texto
            const errorData = await response.json().catch(() => {});  // Intentamos parsear como JSON, por si hay un mensaje en formato JSON
            
            // Mostramos el mensaje de error, si existe
            const errorMessage = errorData?.message || errorText || 'Unknown error';
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error creating order:', error);
        alert('There was an error creating your order. Please try again later. ' + error.message);
    }
}




// 3. Cargar los datos al iniciar la página
loadOrderData();
