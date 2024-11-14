
const nameError = document.getElementById('nameError');  //Selecciona el div con el mensaje de error
const addressError = document.getElementById('addressError');  //Selecciona el div con el mensaje de error


function validarName() { //Función para validar el nombre,
  const name = document.getElementById('inputName').value; //Para obtener el valor del input del nombre

  if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(name)) { // Puede llevar letras y espacios, pueden llevar acentos.
    nameError.style.display = "none"; //No se muestra el error del div
    return true; //Se permite el envío del formulario

  } else { //Si se escribe un valor no valido se muestra el div con el error
    nameError.style.display = "block"; //Se muestra el error en la página.
    return false; //No se permite que se envie el formulario
    }
}

function validarEmail() { //Función para validar el Email,
  const email = document.getElementById('inputEmail').value; //Para obtener el valor del input del Email

  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) { //
    emailError.style.display = "none"; //No se muestra el error del div
    return true; //Se permite el envío del formulario

  } else { //Si se escribe un valor no valido se muestra el div con el error
    emailError.style.display = "block"; //Se muestra el error en la página.
    return false; //No se permite que se envie el formulario
    }


}

function validarPassword() { //Función para validar el contraseña,
  const password = document.getElementById('inputPassword').value; //Para obtener el valor del input del Email

  if (/^.{8,15}$/.test(password)) { //
    passwordError.style.display = "none"; //No se muestra el error del div
    return true; //Se permite el envío del formulario

  } else { //Si se escribe un valor no valido se muestra el div con el error
    passwordError.style.display = "block"; //Se muestra el error en la página.
    return false; //No se permite que se envie el formulario
    }

}

function validarAddress() { //Función para validar el contraseña,
  const address = document.getElementById('inputAddress').value; //Para obtener el valor del input del Email

  if (/^[a-zA-Z0-9#]{8,30}$/.test(address)) { //
    addressError.style.display = "none"; //No se muestra el error del div
    return true; //Se permite el envío del formulario

  } else { //Si se escribe un valor no valido se muestra el div con el error
    addressError.style.display = "block"; //Se muestra el error en la página.
    return false; //No se permite que se envie el formulario
    }

}















function envioFormulario(event) { //Función para prevenir el envío del formulario si esta incorrecto
  if (!validarName()) { //Sino es verdadero.
      event.preventDefault(); // Evita que el formulario se envíe
  }

  if (!validarEmail()) { //Sino es verdadero.
    event.preventDefault(); // Evita que el formulario se envíe
}

  if (!validarPassword()) { //Sino es verdadero.
  event.preventDefault(); // Evita que el formulario se envíe
}

if (!validarAddress()) { //Sino es verdadero.
  event.preventDefault(); // Evita que el formulario se envíe
}


}


document.getElementById('userForm1').onsubmit = envioFormulario; //El atributo onSubmit permite asociar una función de test en el formulario. Si la función retorna falso, les datos del formulario no se envían, quedan en la página.
