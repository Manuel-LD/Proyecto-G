document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const contrasenaInput = document.getElementById("contrasena");

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

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const email = emailInput.value.trim();
        const contrasena = contrasenaInput.value.trim();

        if (!email || !contrasena) {
            showAlert("Por favor, complete todos los campos.", "danger");
            return;
        }

        // Simulación de autenticación
        if (email === "usuario@example.com" && contrasena === "123456") {
            showAlert("Inicio de sesión exitoso.", "success");
            // Redirigir o realizar alguna acción adicional
        } else {
            showAlert("Correo electrónico o contraseña incorrectos.", "danger");
        }
    });
});
