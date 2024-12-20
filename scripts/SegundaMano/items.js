// 1. Fetch the products from the API
async function fetchProducts() {
    try {
        const response = await fetch('http://18.119.124.239:8080/api/products');
        const data = await response.json();
        renderProducts(data);
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
                    <button onclick="addToCart(${i}, ${id_products}, '${description}', '${url_image}', ${price}, 1)">Add 1 to cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// 3. Add product to the cart with a specific quantity
let cart = [];

function addToCart(index, id, description, image, price, quantity) {
    // Check if the product is already in the cart
    const productIndex = cart.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
        // If the product is already in the cart, just update the quantity
        cart[productIndex].quantity += quantity;
    } else {
        // If the product is not in the cart, add it with the specified quantity
        const product = { id, description, image, price, quantity };
        cart.push(product);
    }

    displayCart();
    saveCartToLocalStorage(); // Guardamos el carrito en localStorage
}

// 4. Remove item from cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    saveCartToLocalStorage(); // Guardamos el carrito en localStorage
}

// 5. Display cart items with quantities
function displayCart() {
    const cartItemContainer = document.getElementById('cartItem');
    const countElement = document.getElementById('count');
    const totalElement = document.getElementById('total');
    let total = 0;

    if (cart.length === 0) {
        cartItemContainer.innerHTML = "Your cart is empty";
        totalElement.innerHTML = "$0.00";
        countElement.innerHTML = "0";
    } else {
        cartItemContainer.innerHTML = cart.map((item, i) => {
            const { description, image, price, quantity } = item;
            total += price * quantity;  // Multiplicamos por la cantidad
            totalElement.innerHTML = `$${total}.00`;
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
        countElement.innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);  // Contamos las unidades
    }
}

// 6. Save the cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardamos el carrito en localStorage
}

// 7. Proceed to the order page
function proceedToOrder() {
    window.location.href = "order.html"; // Redirigimos a la página de la orden
}

// 8. Initialize the page by fetching the products
fetchProducts();

