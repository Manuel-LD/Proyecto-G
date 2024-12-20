//btns
const btnColorNegro = document.getElementById('btnNegro');
const btnColorBlanco = document.getElementById('btnBlanco');
const btnSegundaMano = document.getElementById('segundaMano');
const btnTodos = document.getElementById('btnTodos');

function clearCards() {
    const root = document.getElementById('root');
    root.innerHTML = ''; // Limpia el contenedor de tarjetas
}

// Evento para filtrar items color Negro
btnColorNegro.addEventListener('click', async function () {
    const items = await fetchProducts(); 
    const selectedItems = items.filter(item => item.color === 'Negro');

    clearCards();
    renderProducts(selectedItems);
});

// Evento para filtrar items color Blanco
btnColorBlanco.addEventListener('click', async function () {
    const items = await fetchProducts(); 
    const selectedItems = items.filter(item => item.color === 'Blanco');

    clearCards();
    renderProducts(selectedItems);
});

// Evento para filtrar items usados
btnSegundaMano.addEventListener('click', async function () {
    const items = await fetchProducts(); 
    const selectedItems = items.filter(item => item.condition === 'Usado');

    clearCards();
    renderProducts(selectedItems);
});

// Evento para cargar todos los items
btnTodos.addEventListener('click', async function () {
    const items = await fetchProducts(); 
    clearCards();
    renderProducts(items);
});

async function showProducts() {
    const items = await fetchProducts();
    renderProducts(items);
}

showProducts();

// 1. Fetch the products from the API
async function fetchProducts() {
    try {
        const response = await fetch('http://18.119.124.239:8080/api/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// 2. Render products on the page
function renderProducts(products) {
    const root = document.getElementById('root');
    root.innerHTML = products.map((product, i) => {
        const { url_image, description, price, id_products } = product;
        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src="${url_image}" alt="${description}">
                </div>
                <div class='bottom'>
                    <p>${description}</p>
                    <h2>$${price}.00</h2>
                    <button style="background-color:#b11b1b;color:#fff;border:none;padding:8px 12px;cursor:pointer" 
                        onclick="addToCart(${i}, ${id_products}, '${description}', '${url_image}', ${price}, 1)">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 3. Add product to the cart with a specific quantity
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(index, id, description, image, price, quantity) {
    const productIndex = cart.findIndex(item => item.id === id);

    if (productIndex !== -1) {
        cart[productIndex].quantity += quantity;
    } else {
        const product = { id, description, image, price, quantity };
        cart.push(product);
    }

    displayCart();
    saveCartToLocalStorage();
}

// 4. Remove item from cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    saveCartToLocalStorage();
}

// 5. Display cart items with quantities
function displayCart() {
    const cartItemContainer = document.getElementById('cartItem');
    const countElement = document.getElementById('count');
    const totalElement = document.getElementById('total');
    let total = 0;

    document.getElementById('cart').style.fontSize = '12px';

    if (cart.length === 0) {
        cartItemContainer.innerHTML = "Tu carrito está vacío";
        totalElement.innerHTML = "$0.00";
        countElement.innerHTML = "0";
    } else {
        cartItemContainer.innerHTML = cart.map((item, i) => {
            const { description, image, price, quantity } = item;
            total += price * quantity;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src="${image}" alt="${description}">
                    </div>
                    <p style='font-size:12px;'>${description}</p>
                    <h2 style='font-size: 15px;'>$${price}.00 x ${quantity}</h2>
                    <i class='fa-solid fa-trash' onclick='removeItemFromCart(${i})'></i>
                </div>
            `;
        }).join('');
        totalElement.innerHTML = `$${total}.00`;
        countElement.innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

// 6. Save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 7. Proceed to the order page
function proceedToOrder() {
    // Primero obtenemos el carrito actualizado
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartData.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de continuar.");
        return;
    }

    // Calculamos el amount (total de ítems), subtotal (suma de precio*qty) y total
    let amount = 0;
    let subtotal = 0;
    for (let item of cartData) {
        amount += item.quantity;
        subtotal += item.price * item.quantity;
    }

    // Suponiendo un cargo fijo, por ejemplo, 20 dólares de envío:
    let total = subtotal + 20;

    // Generamos una fecha actual
    const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const orderData = {
        "id_order": 1, // ID de orden puede ser estático o generar uno,
        "amount": amount,
        "subtotal": subtotal,
        "total": total,
        "date_creation": currentDate
    };

    // Guardamos la orden en localStorage
    localStorage.setItem('orderData', JSON.stringify(orderData));

    // Redirigimos a order.html
    // Ajusta la ruta según sea necesario, si order.html está en la raíz y
    // items.js está en scripts/SegundaMano/
    window.location.href = "../../order.html";
}

// Inicializamos la página
displayCart();
fetchProducts();

// Obtenemos los datos de la orden guardados en localStorage
const orderData = JSON.parse(localStorage.getItem('orderData'));
const orderDetailsDiv = document.getElementById('order-details');

// Verificamos que haya datos
if (orderData) {
    // Eliminamos la sección de 'shipment'
    const extendedOrderData = {
        id_order: orderData.id_order,
        amount: orderData.amount,
        subtotal: orderData.subtotal,
        total: orderData.total,
        date_creation: orderData.date_creation,
        user: {id_user:6}
    };

    // Mostramos la información en la página sin detalles de envío
    orderDetailsDiv.innerHTML = `
        <p><strong>ID de Orden:</strong> ${extendedOrderData.id_order}</p>
        <p><strong>Cantidad (amount):</strong> ${extendedOrderData.amount}</p>
        <p><strong>Subtotal:</strong> $${extendedOrderData.subtotal}</p>
        <p><strong>Total:</strong> $${extendedOrderData.total}</p>
        <p><strong>Fecha de creación:</strong> ${extendedOrderData.date_creation}</p>
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
            alert('La orden se confirmó correctamente');
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
