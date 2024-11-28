
class ItemController {
    constructor() {
        this.items = [];
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

   //MODIFICAR ITEM
   modifyItem() {

   }

   //ELIMINAR ITEM
   removeItem(id) {
    // Usa el método filter para excluir el item con el id proporcionado
    this.items = this.items.filter(item => item.id !== id);

    // Opcional: Devuelve el arreglo actualizado para verificar el resultado
    return this.items;
   }
}

