//Create a ItemsController class

class ItemsController{

    //Set up the items and currentId property in the constructor

    constructor(currentId = 0){
        this.items = [];
    this.currentId = currentId;
    }

    //Create the addItem method

    addItem(name, lastName, stock, precio, imagen){
        const item ={
            id:this.currentId++,
            name: name,
            lastName: lastName,
            stock: stock,
            precio: precio,
            imagen: imagen,
        };

        //push the item to the item property
        this.items.push(item);

        //Save Items to local storage
        localStorage.setItem("items", JSON.stringify(this.items));
    }

}