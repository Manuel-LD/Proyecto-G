class ItemsControler{
    constructor(currentId = 0){
        this.items=[];
        this.currentId=currentId;
    }
// Create the addItem method -> El motodo añade items a la lista
    // METODO DE AÑADIR
    addItem(id, name, category, img, price, color, description) {
        const item = {
            // Increment the currentId property -> Crea el item y aumenta el ID
            id: id,
            name: name,
            category: category,
            img: img,
            price: price,
            color: color,
            description: description,
        };

        // Push the item to the items property -> Coloca el item en la lista
        this.items.push(item);
    }
   //AQUI TERMINA EL METODO DE AÑADIR

    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("items")
        // console.log(typeof(storageItems));
        if (storageItems) {
            const items = JSON.parse(storageItems)
            // console.log(items);
            for (var i = 0, size = items.length; i < size; i++) {
                const item = items[i];
                // console.log(item);
                this.items.push(item);
            }
        }
    }
}

