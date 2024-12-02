document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const contrasenaInput = document.getElementById("contrasena");
    const confirmarContrasenaInput = document.getElementById("confirmarContrasena");

    const showAlert = (message, type) => {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        form.prepend(alertDiv);
    };

    const clearAlerts = () => {
        const alerts = document.querySelectorAll(".alert");
        alerts.forEach(alert => alert.remove());
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Acepta solo números con 10 dígitos
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        clearAlerts();

        let isValid = true;

        // Validación de campos vacíos
        if (!nombreInput.value.trim() || !apellidoInput.value.trim()) {
            showAlert("El nombre y apellido son obligatorios.", "danger");
            isValid = false;
        }

        // Validación de correo electrónico
        if (!validateEmail(emailInput.value)) {
            showAlert("Por favor, ingresa un correo electrónico válido.", "danger");
            isValid = false;
        }

        // Validación de teléfono
        if (!validatePhone(telefonoInput.value)) {
            showAlert("El número de teléfono debe contener 10 dígitos.", "danger");
            isValid = false;
        }

        // Validación de contraseñas
        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            showAlert("Las contraseñas no coinciden.", "danger");
            isValid = false;
        }

        // Validación de términos y condiciones
        const terminosCheckbox = document.getElementById("terminos");
        if (!terminosCheckbox.checked) {
            showAlert("Debes aceptar los términos y condiciones.", "danger");
            isValid = false;
        }

        return isValid;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        const registeredUsers=JSON.parse(localStorage.getItem('users')) || [];//si no existe datos en el json regresa un []
        const isUserRegistered=registeredUsers.find( user => user.email === emailInput.value)
        if(isUserRegistered && validateForm()){
            return alert('El usuario ya esta registrado');
        }
        registeredUsers.push(
            {name:nombreInput.value,
             apellido:apellidoInput.value,
             email:btoa(emailInput.value), //btoa para encriptar
             telefono:telefonoInput.value,
             contrasena:btoa(contrasenaInput.value), //btoa para encriptar, tambien agregué value
            })

        localStorage.setItem('users',JSON.stringify(registeredUsers));
        // Mostrar mensaje de éxito si la validación es exitosa
        showAlert("Formulario enviado correctamente.", "success");
        form.reset(); // Reiniciar los campos del formulario
    });
});