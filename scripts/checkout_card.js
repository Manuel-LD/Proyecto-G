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
}
