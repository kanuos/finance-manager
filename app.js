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
            
            const id = db.setTransaction(this.type.value,this.detail.value,this.value.value);
                         
            ui.displayData(this.type.value,this.detail.value,this.value.value,id);

            
        this.clearFields();

        });

        // when the list elements are clicked
        // this.incomeUL=document.querySelector('.inc');
        // this.expenseUL= document.querySelector('.exp');

        this.incomeUL.addEventListener('click',(e)=>{
            console.log('Inside the Income UL',e.target);
            this.eventDelegation(e,db)});
        this.expenseUL.addEventListener('click',e=>{
            console.log('inside the expense UL',e.target);   
            this.eventDelegation(e,db)});
    }
    clearFields=()=>{
        this.detail.value='';
        this.value.value='';
    }

    eventDelegation=(e,db)=>{
        
        if(e.target.innerText==='delete'){
            console.log(' Inside the delegation emthod');
            console.log(e.target.getAttribute('data-id'));
            db.show();
        }
        else{

            // edit clause 
            const test=e.target.previousElementSibling.previousElementSibling;
            console.log(test);
            this.detail.value=test.children[0];
            this.value.value=test.children[1];

        }
    }
}


class DataBase{
    // global data
    constructor(){
        // this.totalExp=0;
        // this.totalInc=0;
        this.exp = [];
        this.inc= [];
        this.id=0;
    }
    
    setTransaction=(type,detail,value)=>{
        const date= new Date().getMonth();
        let month;
        switch(date){
            case 0: month='jan';break; 
            case 1: month='feb';break; 
            case 2: month='mar';break; 
            case 3: month='apr';break; 
            case 4: month='may';break; 
            case 5: month='jun';break; 
            case 6: month='jul';break; 
            case 7: month='aug';break; 
            case 8: month='sep';break; 
            case 9: month='oct';break; 
            case 10: month='nov';break; 
            case 11: month='dec';break; 
        }
                
        this[type].push({
            id: ++this.id,
            detail,
            value,
            month
        });

        return this.id;
    }

    show=()=>{
        console.log('Expense');
        this.exp.forEach(e=> console.log(e));
        console.log('income');
        this.inc.forEach(e=> console.log(e));
    }

    // deleteTransaction=()
}


class UIPainter{
    
    displayData=(type,detail,value,id)=>{

        const li=document.createElement('li');
        li.innerHTML = `<strong>
                            <div class="text">${detail}&nbsp;</div>
                            <div class="value">&nbsp;${value}</div>
                        </strong>
                            <button data-id=${id}>delete</button><button>edit</button>`;

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