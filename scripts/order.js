// Obtenemos los datos de la orden guardados en localStorage
const orderData = JSON.parse(localStorage.getItem('orderData'));
const orderDetailsDiv = document.getElementById('order-details');

// Verificamos que haya datos
if (orderData) {
    // Ajustamos el objeto para incluir 'shipment' con datos de ejemplo.
    // Puedes reemplazar estos valores por dinámicos si lo deseas.
    const extendedOrderData = {
        shipment: {
            id_shipment: 1,
            address: "Av. Paseo de la Reforma 123, Ciudad de México, CDMX",
            tracking_number: "TRACK123",
            status: "En tránsito",
            shipping_date: "2024-12-01",
            estimated_delivery_date: "2024-12-10"
        },
        id_order: orderData.id_order,
        amount: orderData.amount,
        subtotal: orderData.subtotal,
        total: orderData.total,
        date_creation: orderData.date_creation,
        user: {id_user:6}
    };

    // Mostramos la información en la página
    orderDetailsDiv.innerHTML = `
        <p><strong>ID de Orden:</strong> ${extendedOrderData.id_order}</p>
        <p><strong>Cantidad (amount):</strong> ${extendedOrderData.amount}</p>
        <p><strong>Subtotal:</strong> $${extendedOrderData.subtotal}</p>
        <p><strong>Total:</strong> $${extendedOrderData.total}</p>
        <p><strong>Fecha de creación:</strong> ${extendedOrderData.date_creation}</p>
        <p><strong>Envío:</strong></p>
        <ul>
            <li><strong>Dirección:</strong> ${extendedOrderData.shipment.address}</li>
            <li><strong>Número de seguimiento:</strong> ${extendedOrderData.shipment.tracking_number}</li>
            <li><strong>Estado:</strong> ${extendedOrderData.shipment.status}</li>
            <li><strong>Fecha de envío:</strong> ${extendedOrderData.shipment.shipping_date}</li>
            <li><strong>Fecha estimada de entrega:</strong> ${extendedOrderData.shipment.estimated_delivery_date}</li>
        </ul>
    `;

    // Función que se ejecuta al presionar "Confirmar orden"
    function confirmOrder() {
        fetch('http://18.119.124.239:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(extendedOrderData)
        })
        .then(response => {
            console.log('Status:', response.status);
            if (!response.ok) {
                throw new Error('Error al crear la orden en la API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Orden creada con éxito:', data);
            alert('La orden se confirmó correctamente en la API.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al crear la orden en la API.');
        });
    }

    const confirmOrderButton = document.getElementById('confirmOrderButton');
    confirmOrderButton.addEventListener('click', confirmOrder);

} else {
    // Si no hay datos, mostramos un mensaje
    orderDetailsDiv.innerHTML = `<p>No se encontraron datos de la orden.</p>`;
}
