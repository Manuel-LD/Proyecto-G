// Obtener las referencias a los elementos del formulario
const inputName = document.getElementById("newItemName");
const inputDescription = document.getElementById("newItemDescription");
const inputStock = document.getElementById("newItemStock");
const inputPrice = document.getElementById("newItemPrice");
const inputImage = document.getElementById("newItemImageUrl");

// Función de validación
function validacionFormulario(event) {
    // Prevenir que el formulario se envíe si hay errores
    event.preventDefault();

    // Comprobar si los campos están vacíos
    let valid = true;

    if (inputName.value === "") {
        alert("Introduce tu nombre");
        valid = false;
    }
    if (inputDescription.value === "") {
        alert("Introduce una descripción.");
        valid = false;
    }
    if (inputStock.value === "") {
        alert("Introduce la cantidad de piezas disponibles");
        valid = false;
    }
    if (inputPrice.value === "") {
        alert("Introduce el precio del producto");
        valid = false;
    }
    if (inputImage.value === "") {
        alert("Introduce una imagen");
        valid = false;
    }

    // Si todo es válido, enviar el formulario (si fuera necesario)
    if (valid) {
        console.log("Formulario válido. Ahora puedes enviar los datos.");
        // Aquí puedes enviar el formulario o hacer cualquier otra cosa
    } else {
        console.log("Formulario no válido. Corrige los errores.");
    }
}

// Agregar un event listener al formulario para ejecutar la validación al enviarlo
const form = document.getElementById("newItemForm");
form.addEventListener("submit", validacionFormulario);
