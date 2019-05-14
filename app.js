class EventHandlers{
    constructor(){
        this.type= document.getElementById('type');
        this.detail= document.getElementById('detail');
        this.value= document.getElementById('value');
        this.add= document.getElementById('submit');
    }

    eventListeners=(ui,db)=>{
        this.add.addEventListener('click',()=>{
            
            db.setTransaction(this.type.value,this.detail.value,this.value.value);
                         
            ui.displayData(this.type.value,this.detail.value,this.value.value);
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
    
    setTransaction=(type,detail,value)=>{
        console.log('Inside the Database class getTransaction method');
        this[type].push({
            detail,
            value
        });
    }
}


class UIPainter{
    
    displayData=(type,detail,value)=>{

        const li=document.createElement('li');
        li.innerHTML = `<strong>${detail}&nbsp;&nbsp;&nbsp;${value}<strong>`;

        document.querySelector(`.${type}`).insertAdjacentElement('beforeend',li);

    }
}


class Controller{
    constructor(){
        this.db= new DataBase();
        this.event= new EventHandlers();
        this.ui= new UIPainter();
    }

init=()=>{
    this.event.eventListeners(this.ui,this.db);
}

}


const Obj= new Controller();
Obj.init();