
emailjs.init("obltqTS4McW3XvH5h");  
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();  

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const terminos = document.getElementById('terminos').checked;  

    // Validar los campos
    if (!nombre) {
        alert('Por favor, ingrese su nombre.');
        return;
    }else if(!/^[a-zA-Z\s]+$/.test(nombre)){
        alert('El nombre solo puede contener letras y espacios')
        return;
    }
    // Validar apellido
    if (!apellido) {
        alert('Por favor, ingrese su apellido.');
        return;
    }else if(!/^[a-zA-Z\s]+$/.test(apellido)){
        alert('El apellido solo puede contener letras y espacios')
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }
    const telefonoRegex = /^[0-9]+$/;
    if (!telefono || !telefonoRegex.test(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido.');
        return;
    }
    if (!mensaje) {
        alert('Por favor, ingrese un mensaje.');
        return;
    }
    

    // Si todo es válido, enviar los datos
    const formData = {
        nombre,
        apellido,
        email,
        telefono,
        mensaje
    };
    enviarCorreo(formData);
});

function enviarCorreo(data) {
    console.log("Datos del formulario:", data);
    emailjs.send("service_dt2qd9c", "template_qav85q9", {
        from_name: data.nombre,
        from_lastname: data.apellido,
        from_email: data.email,
        from_phone: data.telefono,
        message: data.mensaje
    }).then(function(response) {
        console.log('Correo enviado con éxito:', response);
        alert('Gracias por tu mensaje. Hemos recibido tu información.');
        
        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('mensaje').value = '';
        document.getElementById('terminos').checked = false;
    }, function(error) {
        console.log('Error al enviar el correo:', error);
        alert('Hubo un problema al enviar el correo. Intenta nuevamente.');
    });
}
