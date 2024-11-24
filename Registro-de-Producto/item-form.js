
// Initialize a new ItemsController with currentId set to 0
const itemsController = new ItemsController(0);

// Select the New Item Form
const newItemForm = document.querySelector('#newItemForm');

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newItemName = document.querySelector('#newItemName');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemStock = document.querySelector('#newItemStock');   
    const newItemPrice = document.querySelector('#newItemPrice');  
    const newItemImageUrl = document.querySelector('#newItemImageUrl');   
     

    // Get the values of the inputs
    const name = newItemName.value;
    const description = newItemDescription.value;
    const stock = newItemStock.value;
    const price = newItemPrice.value;
    const imageUrl = newItemImageUrl.value;

   
    // Add the item to the ItemsController
    itemsController.addItem(name, description, stock, price,imageUrl);

    // Clear the form
    newItemName.value = '';
    newItemDescription.value = ''; 
    newItemStock.value = '';
    newItemPrice.value = '';


});