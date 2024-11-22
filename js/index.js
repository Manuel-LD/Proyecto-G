// Initialize a new TaskManager with currentId set to 0
const itemsController = new ItemsControler(0);//parametro 0

// Select the New Task Form
const newItemForm = document.getElementById('newItemForm');

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newItemNameInput = document.getElementById('newItemNameInput');
    const newItemDescription = document.getElementById('newItemDescription');

    /*
        Validation code here
    */

    // Get the values of the inputs
    const name = newItemNameInput.value;
    const description = newItemDescription.value;
    // const createdAt = new Date();//todavia no le puse date

    // Add the task to the task manager
    itemsController.addItem(name, description);
    console.log(itemsController.items)
    // console.log(itemsController.items[0].name)
    addItemCard(itemsController.items[0],itemsController.items[0]);

    // Clear the form
    newItemNameInput.value = '';
    newItemDescription.value = '';
});


function addItemCard(item){
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">'+item.name+'</h5>\n' +
        '        <p class="card-text">'+item.descripcion+'</p>\n' +
        '        <a href="#" class="btn btn-primary">Add</a>\n' +
        '        <a href="#" class="btn btn-primary">Modificar</a>\n' +
        '        <a href="#" class="btn btn-primary">Borrar</a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

addItemCard({'name':'juice',
    'description':'Orange and Apple juice fresh and delicious'});

addItemCard({'name':'Tayto',
    'description':'Cheese & Onion Chips'})