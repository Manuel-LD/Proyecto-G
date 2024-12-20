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
    //base de datos
    const saveUserToDatabase = async (user) => {
        const url = "http://18.119.124.239:8080/api/users";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log("Usuario guardado en la base de datos.");
            } else {
                const error = await response.json();
                console.error("Error al guardar el usuario:", error);
                showAlert("Error al guardar el usuario en la base de datos.", "danger");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            showAlert("Error de conexión con la base de datos.", "danger");
        }
    };

    form.addEventListener("submit",async (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        const registeredUsers=JSON.parse(localStorage.getItem('users')) || [];//si no existe datos en el json regresa un []
        const isUserRegistered=registeredUsers.find( user => user.email === emailInput.value)
        if(isUserRegistered && validateForm()){
            return alert('El usuario ya esta registrado');
        }
        const newUser = {
            first_name: nombreInput.value,
            last_name: apellidoInput.value,
            address:'veracruz',
            email: btoa(emailInput.value), // Encriptar con btoa
            phone_number: telefonoInput.value,
            // contrasena: btoa(contrasenaInput.value), // Encriptar contraseña
            rol:'vendedor'
        };
        registeredUsers.push(newUser)
            // Guardar en la base de datos
        await saveUserToDatabase(newUser);

        localStorage.setItem('users',JSON.stringify(registeredUsers));
        // Mostrar mensaje de éxito si la validación es exitosa
        showAlert("Formulario enviado correctamente.", "success");
        form.reset(); // Reiniciar los campos del formulario
    });
});