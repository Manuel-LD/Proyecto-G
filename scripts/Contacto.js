
emailjs.init("obltqTS4McW3XvH5h");  
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();  

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const comment = document.getElementById('mensaje').value.trim();//se queda
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
    if (!comment) {
        alert('Por favor, ingrese un comment.');
        return;
    }
    

    // Si todo es válido, enviar los datos
    const formData = {
        // nombre,
        // apellido,
        // email,
        // telefono,
        comment,
        user:{
            id_user:1
        }
    };
    enviarCorreo(formData);
    enviarDatosAPI(formData);
});

function enviarCorreo(data) {
    console.log("Datos del formulario:", data);
    emailjs.send("service_dt2qd9c", "template_qav85q9", {
        from_name: data.nombre,
        from_lastname: data.apellido,
        from_email: data.email,
        from_phone: data.telefono,
        message: data.comment
    }).then(function(response) {
        console.log('Correo enviado con éxito:', response);
        alert('Gracias por tu comment. Hemos recibido tu información.');
        
        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('comment').value = '';
        document.getElementById('terminos').checked = false;
    }, function(error) {
        console.log('Error al enviar el correo:', error);
        alert('Hubo un problema al enviar el correo. Intenta nuevamente.');
    });
}
// datos mandados con la solicutud POST
function enviarDatosAPI(data){
    fetch('http://18.119.124.239:8080/api/messages', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log("Datos enviados correctamente", json))
      .catch(err => console.log("Error al enviar datos",err));
}
