class ItemsControler{
    constructor(currentId = 0){
        this.items=[];
        this.currentId=currentId;
    }
    addItem(name,descripcion,imageUrl) {
        this.currentId++;
        let item={
            id:this.currentId,
            name:name,
            descripcion:descripcion,
            imageUrl: imageUrl
        };
        this.items.push(item);
    }
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

