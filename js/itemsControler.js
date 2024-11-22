class ItemsControler{
    constructor(currentId = 0){
        this.items=[];
        this.currentId=currentId;
    }
    addItem(name,descripcion) {
        this.currentId++;
        let producto={
            id:this.currentId,
            name:name,
            descripcion:descripcion,
        };
        this.items.push(producto);
    }
}

