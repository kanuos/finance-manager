class EventHandlers{
    constructor(){
        this.type= document.getElementById('type');
        this.detail= document.getElementById('detail');
        this.value= document.getElementById('value');
        this.add= document.getElementById('submit');
        this.incomeUL=document.querySelector('.inc');
        this.expenseUL= document.querySelector('.exp');
    }

    eventListeners=(db)=>{
        // when the add button is clicked
        this.add.addEventListener('click',()=>{
            
            if(this.value.value>0 && this.detail.value.length>0){

                db.setTransaction(this.type.value,this.detail.value,this.value.value);
            }
            else{
                this.inputErrorMessage();
            }
            
        this.clearFields();

        });

        this.incomeUL.addEventListener('click',e=>{
            this.eventDelegation(e.target,db,"inc")});

        this.expenseUL.addEventListener('click',e=>{   
            this.eventDelegation(e.target,db,"exp")});
    }


    clearFields=()=>{
        this.detail.value='';
        this.value.value='';
    }

    eventDelegation=(e,db,type)=>{
        
        const selectedId= e.getAttribute('data-id');

        if(e.innerText==='delete'){
            db.deleteItem(selectedId,type);
        }
        else {
            const editValues=db.editItem(selectedId,type,e);

            this.detail.value= editValues.text;
            this.value.value= editValues.number;
        }
    }

    inputErrorMessage=()=>{
        alert("Enter valid input");
    }
}


class DataBase{
    constructor(){
        this.ui= new UIPainter();
        this.incomeUL=document.querySelector('.inc');
        this.expenseUL= document.querySelector('.exp');
        this.totalExp=0;
        this.totalInc=0;
        this.exp = [];
        this.inc= [];
        this.id=0;
        this.currentMonth=this.getCurrentMonth();
        this.budgetPercentage=0;
    }

    getCurrentMonth=()=>{
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
        return month;
    }
    
    setTransaction=(type,detail,value)=>{
       
        this[type].push({
            id: ++this.id,
            detail,
            value,
            month:this.currentMonth
        });
        this.show();
        this.getBudget();
    }

    deleteItem=(id,type)=>{
        
        this[type]=this[type].filter((el) => el.id!=id);
      
        this.show();  
        this.getBudget();
    }

    editItem=(id,type,e)=>{

        const editOnListItem=e.previousElementSibling.previousElementSibling;
      
        this.deleteItem(id,type);
        
        return {
            text: editOnListItem.children[0].innerText,
            number: parseInt(editOnListItem.children[1].innerText)
        }
        
    }

    show=()=>{
        this.incomeUL.innerHTML='';
        this.expenseUL.innerHTML='';

      
        this.exp.forEach(e=> {
            this.ui.displayData("exp", e.detail, e.value, e.id);
        });

        this.inc.forEach(e=> {
            this.ui.displayData("inc", e.detail, e.value, e.id);
        });
    }

    getBudget=()=>{
        this.totalExp= this.exp.reduce((total,current) => total + parseInt(current.value),0);
        this.totalInc= this.inc.reduce((total,current) => total + parseInt(current.value),0);
        const budgetNow=parseInt(this.totalInc -  this.totalExp);

        if(this.totalInc==0){
            this.budgetPercentage= 0;
        }
        else{
            if(budgetNow===this.totalInc){
                this.budgetPercentage=0;
            }
            else
            this.budgetPercentage = parseFloat((budgetNow/this.totalInc *100).toFixed(2)) ;
        }
        console.log(`inside the getBudget method. value of this.budgetPercentage= ${this.budgetPercentage}`);
        
        
        this.ui.displayBudget(budgetNow,this.currentMonth,this.budgetPercentage,this.totalExp,this.totalInc) ;

        this.setlocalStorageDB(budgetNow,this.budgetPercentage);
    }

    setlocalStorageDB=(budget,percentage)=>{
        const obj = {
            budget,
            percentage,
            id:this.id,
            exp:this.exp,
            inc: this.inc
        };

        localStorage.setItem('budget',JSON.stringify(obj));
    }
}


class UIPainter{
    
    displayData=(type,detail,value,id)=>{

        const li=document.createElement('li');
        li.classList.add('list-item');
        li.innerHTML = `<strong class="list-text">
                            <div class="text">${detail} </div>
                            <div class="value-${type}">${value}</div>
                        </strong>
                            <a class="button-del" data-id=${id}>delete</a><a class="button-edit" data-id=${id}>edit</a>`;

        document.querySelector(`.${type}`).insertAdjacentElement('beforeend',li);

    }

    displayBudget=(budgetAmount,currentMonth,percent,totalExpense,totalIncome) =>{
        const budget= document.getElementById('budget');
        const month= document.getElementById('month');
        const percentage= document.getElementById('percentage');
        const income = document.getElementById('totalIncome');
        const expense= document.getElementById('totalExpense');
        budget.innerText=budgetAmount;
        month.innerText=currentMonth;
        percentage.innerText=`${percent}%`;
        expense.innerHTML=totalExpense;
        income.innerHTML= totalIncome;
    }
}


class Controller{
    constructor(){
        this.db= new DataBase();
        this.event= new EventHandlers();
    }

init=()=>{
    this.event.eventListeners(this.db);
}

loadDB=()=>{
    
    const ls = localStorage.getItem('budget');
    // if it doenst exist ->  create
    if(ls===undefined){
        localStorage.setItem('budget',JSON.stringify({
            id:0,
            exp:[],
            inc:[]
        }));
    }
    const {id,exp,inc} = JSON.parse(ls);
    this.db.id=id;
    this.db.exp=exp;
    this.db.inc=inc;

    this.db.getBudget();
    this.db.show();
}
 }


const Obj= new Controller();
Obj.init();

document.addEventListener('DOMContentLoaded',Obj.loadDB);