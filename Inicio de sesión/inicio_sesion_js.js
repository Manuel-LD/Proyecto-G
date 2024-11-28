

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Se evita el envío automático del formulario

    const form = document.getElementById('loginForm'); //Obtenemos el form y sus propiedades atravez del Id
    const inputs = form.querySelectorAll('input');
    const emailInput = document.getElementById('exampleInputEmail1').value.trim(); //obtenemos los valores ingresados en input de email atravez de su id
    const passwordInput = document.getElementById('exampleInputPassword1').value.trim();//obtenemos los valores ingresados en input de contraseña atravez de su id
    const errorAlert = document.getElementById('errorAlert');
    
    errorAlert.classList.add('d-none'); // Ocultar alertas previas
    form.classList.remove('was-validated');

    let isValid = true;

    // Validar los inputs - Con el forEach recorres todos los inputs del formulario
    inputs.forEach(input => {
        if (!input.checkValidity() || input.value.trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    // Si no es válido, mostrar alerta y detener flujo
    if (!isValid) {
        errorAlert.textContent = 'Por favor, completa todos los campos correctamente.';
        errorAlert.classList.remove('d-none');
        return;
    }
    
    // Codificar valores cnn función btos que se guarda en la constante
    const encodedEmail = btoa(emailInput); //aquí codificamos los datos ingresados por el input. con btoa()
    const encodedPassword = btoa(passwordInput);

    // Recuperar valores almacenados en localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    console.log(atob(storedEmail)); //aquí mostramos en consola los datos guardados en el local storage para poder ingresar. con atob() es una función para decodificar.
    
    console.log(atob(storedPassword));
    
    // Validar credenciales
    if (encodedEmail === storedEmail && encodedPassword === storedPassword) { //validamos los datos codificados ingresados actualmente con los que se encuentran en el localstorage
        alert('Inicio de sesión exitoso');
        window.location.href = window.location.href; // Con esto nos redirijimos a la misma pagina actual.
        // Redirigir a la página deseada
    }
    else {
        errorAlert.textContent = 'Usuario o contraseña inválidos.';
        errorAlert.classList.remove('d-none');
    }
});