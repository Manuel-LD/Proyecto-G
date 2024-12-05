
const itemsController = new ItemsControler(0);

function filterItems() {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = ''; // Limpiar los elementos actuales

    const filteredItems = itemsController.items.filter(item => 
        item.name.toLowerCase().includes(filterValue) || 
        item.descripcion.toLowerCase().includes(filterValue)
    );

    filteredItems.forEach(item => addItemCard(item));
}

document.getElementById('filterInput').addEventListener('input', filterItems);

function addItemCard(item){
    const quantity = item.quantity || 1;
    const itemHTML = '<div class="col margenbutton">'+
         ' <div class="cardi" style="width: 18rem;">\n' +
        '    <img src="'+item.img +'" class="img-fluid circleImg" width="300" height="250"  alt="product image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="nameProduct text-center">'+item.name+'</h5>\n' +
        '        <p class="card-text text-center">'+item.descripcion+'</p>\n' +
        '       <p class="card-price text-center"><strong>Precio: </strong>' + item.price + '</p>\n' + 
        '        <div class="botones text-center">\n' +
        '        <a href="#" class="boton-nav boton-comprar">Agregar</a>\n' +
        '           <button class="btn btn-dark minus" data-index="' + item.id + '">-</button>\n' +
        '            <span class="cantidad" id="quantity-'+ item.id +'">' + quantity + '</span>\n' +  
        '            <button class="btn btn-dark plus" data-index="' + item.id + '">+</button>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
    // Evento de clic a los botones con la clase "plus". Es para el botón de +
    document.querySelectorAll('.plus').forEach(function(button) {
        button.addEventListener('click', function(event) {
            //Se obtiene valor de data-index del botón clickeado
            const dataIndex = event.target.getAttribute('data-index');
            
            // Muestra el valor de data-index en la consola
            console.log('El valor de data-index es:', dataIndex);
    
            //Se manda llamar la función de incremento.
            incrementItem(dataIndex);
        });
        
    }); 
    
    // Evento de clic a todos los botones con la clase "minus". Es para el botón de -
    document.querySelectorAll('.minus').forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Se obtiene el valor de data-index del botón clickeado
            const dataIndex = event.target.getAttribute('data-index');
            
            //Se manda llamar la función de decremento.
            decrementItem(dataIndex);
        });
        
    });
}

function loadStorageSampleData(){
    
    if(!localStorage.getItem("items")){
        
        const sampleItems = [{'id':1, 'name':'SAMSUNG Galaxy S24','price':'5000 mxn',
        'img':'./assets/Telefono.png',
        'descripcion':'Ultra, Gris, 12GB_512GB', 'quantity':1},
        {'id':2,'name':'Beats Solo 4', 'price':'2000 mxn',
        'img':'./assets/Audifonos.png',
        'descripcion':'On-Ear inalámbricos Bluetooths', 'quantity':1},
        {'id':3,'name':'Acer Laptop Gaming','price':'3500 mxn',
            'img':'./assets/Computadoras.png',
            'descripcion':'Nitro V5 Core i7','quantity':1},
        {'id':4,'name':'Apple SmartWatch','price':'2000 mxn',
            'img':'./assets/Smartwatch.png',
            'descripcion':'Watch SE 2', 'quantity':1},
        {'id':5,'name':'SAMSUNG Galaxy S24','price':'500 mxn',
            'img':'./assets/Telefono.png',
            'descripcion':'Ultra, Gris, 12GB_512GB', 'price':'5000 mxn', 'quantity':1},
        {'id':6,'name':'Beats Solo 4','price':'2000 mxn',
            'img':'./assets/Audifonos.png',
            'descripcion':'On-Ear inalámbricos Bluetooth', 'quantity':1},
        {'id':7,'name':'Acer Laptop Gaming', 'price':'5000 mxn',
            'img':'./assets/Computadoras.png',
            'descripcion':'Nitro V5 Core i7', 'quantity':1},
        {'id':8,'name':'Apple SmartWatch','price':'2000 mxn',
            'img':'./assets/Smartwatch.png',
            'descripcion':'Watch SE 2', 'quantity':1},
        {'id':9,'name':'Acer Laptop Gaming','price':'3500 mxn',
            'img':'./assets/Computadoras.png',
            'descripcion':'Nitro V5 Core i7', 'quantity':1},
        ];
        localStorage.setItem("items", JSON.stringify(sampleItems));
    }
}

function loadCardsListFromItemsController(){
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML = ''; // Limpiar los elementos actuales
    itemsController.items.forEach(item => addItemCard(item));
}



//invocar funciones
loadStorageSampleData();
itemsController.loadItemsFromLocalStorage();//en itemscontroler
loadCardsListFromItemsController();

//Funcion de incremento
function incrementItem(itemId) {
   
    // Encuentra el producto en el array de itemsController 
    let item= null;
    for(let i=0; i < itemsController.items.length; i++ ){
        if(itemsController.items[i].id==itemId){
            console.log(itemsController.items[i])
            item=itemsController.items[i];
            
        }
    }

    if (item) {
        // Incrementa la cantidad del producto
        if (item.quantity) {
            item.quantity += 1;
          } else {
            item.quantity = 1;
          }

        // Actualiza la cantidad en el DOM
        const quantityElement = document.getElementById('quantity-' + itemId);
        if (quantityElement) { //Verifica si quantityElement no es null (si se encontró un elemento con ese id en el DOM).
            quantityElement.textContent = item.quantity; //Se cambia el contenido del elemento quantityElement para que muestre el valor de item.quantity.
        }

        console.log('Cantidad de ' + item.name + ' incrementada a ' + item.quantity);
   }
    // Actualiza itemsController y localStorage
   localStorage.setItem("items", JSON.stringify(itemsController.items));
   
}
//Funcion de decrremento
function decrementItem(itemId) {
    // Encuentra el producto en el array de itemsController
    let item= null;
    for(let i=0; i < itemsController.items.length; i++ ){
        if(itemsController.items[i].id==itemId){
            console.log(itemsController.items[i])
            item=itemsController.items[i];
            
        }
    }

        // La primera parte de la condición (item) verifica si el producto ha sido encontrado en el array. 
        //(item.quantity > 1) asegura que la cantidad del producto sea mayor a 1. Si la cantidad es 1 o menos, la resta.
    if (item && item.quantity > 1) {
        // Decrementa la cantidad del producto
        item.quantity -= 1;

        // Actualiza la cantidad en el DOM
        const quantityElement = document.getElementById('quantity-' + itemId);//Busca un elemento en la página cuyo atributo id coincida con el valor.
        if (quantityElement) { // Para verificar si el elemento con el id quantity-{itemId} fue encontrado en el DOM.
            quantityElement.textContent = item.quantity;// Actualiza el contenido del elemento HTML para reflejar la cantidad actual del producto.
        }

        console.log('Cantidad de ' + item.name + ' decrementada a ' + item.quantity);
    }
    // Actualiza itemsController y localStorage
    localStorage.setItem("items", JSON.stringify(itemsController.items));
}
 