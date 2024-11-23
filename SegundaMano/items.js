// Initialize a new TaskManager with currentId set to 0
const itemsController = new ItemsControler(0);


function addItemCard(item){
    const itemHTML = '<div class="card" style="width: 20rem;">\n' +
        '    <img src="'+item.img +'" class="img-fluid circleImg" width="300" height="250"  alt="product image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">'+item.name+'</h5>\n' +
        '        <p class="card-text">'+item.descripcion+'</p>\n' +
        '        <div class="botones">\n' +
        '        <a href="#" class="btn btn-primary">Comprar</a>\n' +
        '        <a href="#" class="btn btn-primary">+1</a>\n' +
        '        <a href="#" class="btn btn-primary" onclick=`deleteItem(${item.id})`>Eliminar</a>\n' +//pendiente el error perla
        '    </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

function loadStorageSampleData(){
    if(!localStorage.getItem("items")){
        const sampleItems = [{'name':'Telefono',
        'img':'./assetsSegundaMano/Telefono1.png',
        'descripcion':'Samsung E5'},
        {'name':'Audifonos',
        'img':'./assetsSegundaMano/Audifonos.png',
        'descripcion':'Inalámbricos'},
        {'name':'Computadora',
            'img':'./assetsSegundaMano/Computadoras1.png',
            'descripcion':'8 GB RAM'},
        {'name':'SmartWatch',
            'img':'./assetsSegundaMano/Smartwatch.png',
            'descripcion':'Watch SE 2'},
        {'name':'Telefono',
            'img':'./assetsSegundaMano/Telefono1.png',
            'descripcion':'Samsung G1'},
        {'name':'Audifonos',
            'img':'./assetsSegundaMano/Audifonos.png',
            'descripcion':'Inalámbricos'},
        {'name':'Computadora',
            'img':'./assetsSegundaMano/Computadoras1.png',
            'descripcion':'8 GB RAM'},
        {'name':'SmartWatch',
            'img':'./assetsSegundaMano/Smartwatch.png',
            'descripcion':'Watch SE 2'},
        {'name':'Computadora',
            'img':'./assetsSegundaMano/Computadoras1.png',
            'descripcion':'8 GB RAM'},
        ];
        localStorage.setItem("items", JSON.stringify(sampleItems));
    }
}

function loadCardsListFromItemsController(){
    for(var i = 0, size = itemsController.items.length; i < size ; i++){
        const item = itemsController.items[i];
        addItemCard(item);
    }
}
//eliminar
function deleteItem(itemId) {
    //Se busca el índice del item a eliminar en el array utilizando un ciclo for.
    let itemIndex = -1;
    for (let i = 0; i < itemsController.items.length; i++) {
        if (itemsController.items[i].id === itemId) {
            itemIndex = i;
            break; 
        }
    }

    // Si se encuentra, itemIndex debería ser diferente a -1
    if (itemIndex !== -1) {
        // Elimina el item del array
        itemsController.items.splice(itemIndex, 1);
        //array.splice(itemIndex:posición en el array donde comenzará a modificar, 1: es el número de elementos que se deben eliminar a partir de la posición )

        //Se elimina del HTMl el item.
        const itemCard = document.getElementById(`item-${itemId}`);
        if (itemCard) {
            itemCard.remove(); // Elimina el elemento del DOM
        }

        console.log(`Item con ID ${itemId} eliminado`); 
    }
}


// Función para eliminar todas las tarjetas
function deleteAllItems() {
    // Elimina todos los elementos del array; se vacía el array.
    itemsController.items = []; 

    // Elimina todas las tarjetas del DOM
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = ''; // Limpia el contenedor de las tarjetas

    console.log('Todas las tarjetas han sido eliminadas.');
}

loadStorageSampleData();
itemsController.loadItemsFromLocalStorage();//en itemscontroler
loadCardsListFromItemsController();
