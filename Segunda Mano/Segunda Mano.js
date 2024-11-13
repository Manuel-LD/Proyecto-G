document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el botón de "Agregar al carrito"
    const addCartButtons = document.querySelectorAll('.btn-add-cart');

    addCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = "Nombre del Producto"; // Obtén el nombre dinámicamente si es necesario
            const productPrice = 50; // Obtén el precio dinámicamente también
            
            // Crear un objeto para el producto
            const product = {
                name: productName,
                price: productPrice
            };

            // Obtener carrito existente o inicializar uno nuevo
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Agregar producto al carrito
            cart.push(product);

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Producto agregado al carrito');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon'); // Selecciona el ícono del carrito en tu navbar

    // Obtener productos del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartIcon.textContent = `Carrito (${cart.length})`; // Actualiza el texto del carrito
});

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    const tooltip = document.querySelector('.custom-tooltip');

    productContainer.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });

    productContainer.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});