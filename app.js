class EventHandlers{
    constructor(){
        this.type= document.getElementById('type');
        this.detail= document.getElementById('detail');
        this.value= document.getElementById('value');
        this.add= document.getElementById('submit');
    }

    eventListeners=()=>{
        this.add.addEventListener('click',()=>{
            // console.log(`the type of transaction : ${this.type.value}
            //     the detail of transaction : ${this.detail.value}
            //     the value of transaction : ${this.value.value}`);
            
        });
    }
}


class DataBase{
    // global data
    constructor(){
        this.totalExp=0;
        this.totalInc=0;
        this.exp = [];
        this.inc= [];
    }

    getTransaction=()=>{

    }
}


class UIPainter{

}


class Controller{
    constructor(){
        this.db= new DataBase();
        this.event= new EventHandlers();
        this.ui= new UIPainter();
    }

init=()=>{
    this.event.eventListeners();
}

}


const Obj= new Controller();
Obj.eventListeners();