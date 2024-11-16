/*VALIDACIÓN DE FORMULARIO 1 */


//Se accede a elemementos div con el mensaje de error.
const nameErrorElement = document.getElementById('nameError'); 
const emailErrorElement = document.getElementById('emailError');
const passwordErrorElement = document.getElementById('passwordError');   
const addressErrorElement = document.getElementById('addressError');
const cityErrorElement = document.getElementById('cityError');
const postalCodeErrorElement = document.getElementById('postalCodeError');  


//Función para validar el nombre del usuario.
function validarName() {
  const namee = document.getElementById('inputName').value.trim();//Se accede al valor del input y trim() elimina los espacios al principio y al final de una cadena de texto.
  console.log(namee);

  if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(namee)) { // Puede llevar letras (mayúsculas y minúsculas) y espacios y llevar acentos. Tiene un rango de 1 a 40. El método test compara cadena regular con el valor del input, arroja true o false.

    nameErrorElement.style.display = "none"; //No se muestra el error del div.
    return true;

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    nameErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }
}


//Función para validar el Email.
function validarEmail() { 
  const email = document.getElementById('inputEmail').value.trim();
  console.log(email);

  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) { //Acepta letras (mayúsculas y minúsculas), números, guiones, puntos, signo + y arroba.

    emailErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    emailErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }
}


//Función para validar el contraseña.
function validarPassword() { 
  const password = document.getElementById('inputPassword').value;
  console.log(password);

  if (/^.{8,15}$/.test(password)) { //Acepta cualquier carácter (letra, número, símbolo, etc); tiene un rango de 8-15 caracteres.

    passwordErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    passwordErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false;
    }
}


//Función para validar la dirección.
function validarAddress() { 
  const address = document.getElementById('inputAddress').value.trim();
  console.log(address);

  if (/^[a-zA-Z0-9#\s]{8,30}$/.test(address)) { //Acepta letras, números, símbolo # y tiene un rango de 8-30.
    
    addressErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no valido se muestra el div con el error
    addressErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }

}


//Función para validar la ciudad.
function validarCity() {
  const city = document.getElementById('inputCity').value.trim();
  console.log(city); 

  if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(city)) { // Puede llevar letras (mayúsculas y minúsculas) y espacios, pueden llevar acentos.

    cityErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    cityErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }
}


//Función para validar código postal.
function validarPostalCode() {
  const postalCode = document.getElementById('inputPostalCode').value.trim(); 
  console.log(postalCode);

  if (/^\d{5}$/.test(postalCode)) { // Acepta 5 dígitos.

    postalCodeErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    postalCodeErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }
}


//Función para prevenir el envío del formulario si esta incorrecto.
function envioFormulario(event) {
  event.preventDefault(); //Evita que se recargue la página.

  //Mando llamar inputs para obtener la información que se guardará más tarde.
  const namee = document.getElementById('inputName').value; 
  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;
  const address = document.getElementById('inputAddress').value;
  const postalCode = document.getElementById('inputPostalCode').value;
  
  //Gurda valor booleano que retorna la función.
  const NameValid = validarName();
  const EmailValid = validarEmail();
  const PasswordValid = validarPassword();
  const AddressValid = validarAddress();
  const CityValid = validarCity();
  const PostalCodeValid = validarPostalCode();

  //Se comprueba si todas las validaciones son correctas.
  if (NameValid && EmailValid && PasswordValid && AddressValid && CityValid && PostalCodeValid) {
    console.log("Se enviaron datos al servidor");
  }else{
    console.log("No se enviaron al servidor");
    return
  }
}

//Se añade un evento de tipo submit y se envía formulario si la función envioFormulario no lo impide.
document.getElementById('userForm').addEventListener('submit', envioFormulario);



//FORMULARIO DE METODO DE PAGO


//Se accede a elemementos div con el mensaje de error.
const numCardErrorElement = document.getElementById('numCardError');  
const nameCardErrorElement = document.getElementById('nameCardError'); 
const dateErrorElement = document.getElementById('dateError'); 
const cvvErrorElement = document.getElementById('cvvError');


//Función para validar el número de tarjeta.
function validarNumCard() {
  const numCard = document.getElementById('inputNumCard').value.trim(); //Se accede al valor del intput
  console.log(numCard);

  if (/^\d{14,19}$/.test(numCard)) { //Puede llevar de 14-19 dígitos.
    
    numCardErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no válido se muestra el div con el error.

    numCardErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
}
}


//Función para validar el nombre en la tarjeta.
function validarNameCard() {
  const nameCard = document.getElementById('inputNameCard').value.trim(); 
  console.log(nameCard); 

  if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nameCard)) { //Puede llevar letras (mayúsculas y minúsculas), acentos y espacios, tiene un rango de 1 a 40 caracteres.

    nameCardErrorElement.style.display = "none"; //No se muestra el error del div.
    return true;

  } else { //Si se escribe un valor no válido se muestra el div con el error

    nameCardErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false;
    }
}

//Función para validar la fecha en la tarjeta.
function validarDateCard() {
  const dateCard1 = document.getElementById('inputDate1').value;
  const dateCard2 = document.getElementById('inputDate2').value; 
  console.log(dateCard1,dateCard2);

  if (dateCard1 === "Mes" || dateCard2 === "Año" ) { //Devuelve true si al menos una condición es verdadera.

    dateErrorElement.style.display = "block"; //Se muestra el error del div.
    return false; 

  } else { //Si se escribe un valor válido no se muestra el error.

    dateErrorElement.style.display = "none"; //No se muestra el error en la página.
    return true; 
    }
}


//Función para validar el CVV.
function validarCvv() {
  const cvv = document.getElementById('inputCvv').value.trim(); 
  console.log(cvv)

  if (/^\d{3}$/.test(cvv)) { // Puede contener 3 dígitos.

    cvvErrorElement.style.display = "none"; //No se muestra el error del div.
    return true; 

  } else { //Si se escribe un valor no valido se muestra el div con el error
    
    cvvErrorElement.style.display = "block"; //Se muestra el error en la página.
    return false; 
    }
}


//Función para prevenir el envío del formulario si esta incorrecto.
function envioMetodoPago(event) { 
  event.preventDefault();//Previene que se recargue la página.

  //Se mandan llamar los valores de los inputs que seran guardados después.
  const numCard = document.getElementById('inputNumCard').value;
  const nameCard = document.getElementById('inputNameCard').value; 
  const dateCard1 = document.getElementById('inputDate1').value;
  const dateCard2 = document.getElementById('inputDate2').value;
  const cvv = document.getElementById('inputCvv').value; 
  
  //Se manda llamar las funciones y se guarda su valor booleano.
  const numCardValid = validarNumCard();
  const nameCardValid = validarNameCard();
  const dateCardValid = validarDateCard();
  const cvvCardValid = validarCvv()

  //Se realiza validación para enviar los datos solo cuando todos esten correctos.
  if (numCardValid && nameCardValid&&  dateCardValid &&  cvvCardValid){
    console.log("Se enviaron los datos al servidor");
  }else{
    console.log("No se enviaron los datos");
    return
  }
}

//Se añade un evento de tipo submit y se envía formulario si la función envioMetodoPago no lo impide.
document.getElementById('pay').addEventListener('submit', envioMetodoPago);

