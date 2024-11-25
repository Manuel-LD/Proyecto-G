//Initialize a new ItemsController with currentId set to 0 
const itemsController = new ItemsController (0);

const newItemForm = document.querySelector
('#formulario');

//Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    //Prevent default action
    event.preventDefault();


    //Select the inputs

    const newItemName = document.querySelector
    ('#nombre');
    const newItemLastName = document.querySelector
    ('#apellido');
    const newItemStock = document.querySelector
    ('#stock');
    const newItemPrice = document.querySelector
    ('#precio');
    const newItemImage = document.querySelector
    ('#imagen');


    //Get the values of the inputs
    const name = newItemName.value;
    const lastName = newItemLastName.value;
    const stock = newItemStock.value;
    const precio = newItemPrice.value;
    const imagen = newItemImage.value;


    //Add the item to the Items Controller
    itemsController.addItem(name, lastName, stock,precio, imagen );

    //Clear the form 
    newItemName.value= "";
    newItemLastName.value= "";
    newItemStock.value= "";
    newItemPrice.value= "";
    


});


