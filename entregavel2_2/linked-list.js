

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}



export class linkedList {
    constructor(){
        this.head = null;
        this.size = 0;


    }

    push(value){
        const newNode = new Node(value);

        if(this.head === null){
            this.head = newNode;
            this.size++;
            return;
        }

  
        let currentNode = this.head;
        while(currentNode.next !== null){
            currentNode = currentNode.next;
        }

        currentNode.next = newNode;
        this.size++;
        
    }

    peek(){
        
        if(this.head === null){
            return;
        }

  
        let currentNode = this.head;
        while(currentNode.next !== null){
            currentNode = currentNode.next;
        }

        return currentNode.value;

    }

    pop(){
        if(this.head === null){
            return "Lista vazia";
        }

        let currentNode = this.head;
        while(currentNode.next.next !== null){
            currentNode = currentNode.next;
        }
        currentNode.next = null;
        return;
    }

    print(){
        if(this.head === null){
            return;
        }

        let currentNode = this.head;
        while(currentNode !== null){
            console.log(currentNode.value)
            currentNode = currentNode.next;
        }
    }

    removeAt(value){
        if(this.head === null){
            return "Lista vazia"
        }

        if(value >= this.size || value < 0){
            return "Item não existe na lista";
        }

        
        let currentNode = this.head;

        for(let i = 1; i < value; i++){
            currentNode = currentNode.next;
        }

        if(value === this.size-1){
            currentNode.next = null;
        }else{
            currentNode.next = currentNode.next.next;
        }
        
        return;


    }

    getAt(value){
        
        if(this.head === null){
            return "Lista vazia"
        }

        if(value >= this.size || value < 0){
            return "Item não existe na lista";
        }

        
        let currentNode = this.head;
        for(let i = 1; i <= value; i++){
            currentNode = currentNode.next;
        }

        return currentNode.value;

    }

    insertAt(value, index){
        const newNode = new Node(value);

        if(this.head === null){
            this.head = newNode;
            this.size++;
            return;
        }

  
        let currentNode = this.head;
        while(currentNode.next !== null){
            currentNode = currentNode.next;
        }

        currentNode.next = newNode;
        this.size++;
        
        

    }

    reverse(){
        if(this.head === null){
            return;
        }
        const copia = this.toArray();
        let currentNode = this.head;
        for(let i = this.size - 1; i >= 0; i--){
            currentNode.value = copia[i];
            currentNode = currentNode.next;
        }

    }



    toArray(){
        let array1 = [];

        let currentNode = this.head;

        while(currentNode !== null){
            array1.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return array1;

    }
};

