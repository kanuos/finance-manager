class EventHandlers{
    constructor(){
        this.type= document.getElementById('type');
        this.detail= document.getElementById('detail');
        this.value= document.getElementById('value');
        this.add= document.getElementById('submit');
        this.incomeUL=document.querySelector('.inc');
        this.expenseUL= document.querySelector('.exp');
    }

    eventListeners=(ui,db)=>{
        // when the add button is clicked
        this.add.addEventListener('click',()=>{
            
            db.setTransaction(this.type.value,this.detail.value,this.value.value);
                         
            ui.displayData(this.type.value,this.detail.value,this.value.value);

            
        this.clearFields();

        });

        // when the list elements are clicked
        // this.incomeUL=document.querySelector('.inc');
        // this.expenseUL= document.querySelector('.exp');

        this.incomeUL.addEventListener('click',(e)=>{
            console.log('Inside the Income UL',e.target);
            this.eventDelegation(e)});
        this.expenseUL.addEventListener('click',e=>{
            console.log('inside the expense UL',e.target);   
            this.eventDelegation(e)});
    }
    clearFields=()=>{
        this.detail.value='';
        this.value.value='';
    }

    eventDelegation=(e)=>{
        console.log(' Inside the delegation emthod');
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
        li.innerHTML = `<strong>${detail}&nbsp;&nbsp;&nbsp;${value}<strong>
                    <button>delete</button><button>edit</button>`;

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