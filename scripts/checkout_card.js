const nameCard = document.getElementById('titular').value;
const numberCard = document.getElementById('numeroTarjeta').value;
const cvv = document.getElementById('cvv').value;
const expirationDate = document.getElementById('fechaVencimiento').value;
const form = document.querySelector("form");
 
 
//agregar datos bancarios con POST
function addDataAPI(data){
    fetch('http://18.119.124.239:8080/api/cards', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log("Datos enviados correctamente", json))
    .catch(err=> console.log("Error al enviar datos", err));
    alert(data);
};
 
 
function getCardInfo(){
    data = {"name_card" : nameCard,
        "number_card" : numberCard,
        "cvv" : cvv,
        "expirationDate" : expirationDate,
        "user":{
            id_user:1
        }
    }
 
    addDataAPI(data);
}
 
form.addEventListener("submit", function(event) {
    event.preventDefault();
    getCardInfo();
});
 
 