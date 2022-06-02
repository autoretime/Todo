"use strict";

class Todo {

    id = 0; 
    taskList =  [];  
    htmlTaskList = document.getElementById('taskList'); 
    htmlTaskInput = document.getElementById('taskInput'); 

    constructor() {
        if (JSON.parse(localStorage.getItem('todo'))) this.taskList.push(...(JSON.parse(localStorage.getItem('todo'))))    
    }

    changeStatus(taskElement) { 
        let taskChangeStatusButton = taskElement.getElementsByTagName('button')[0]   

        taskChangeStatusButton.addEventListener('click', ($event) => {
            const targetId = $event.target.parentNode.id
            this.taskList.forEach(element => {
                if (element.id === +targetId) {
                    element.doneStatus = !element.doneStatus
                    
                    console.log(element)    
                               
                    if (element.doneStatus) {
                        $event.target.parentNode.closest('li').style.textDecoration = "line-through";
                      } else {
                        $event.target.parentNode.closest('li').style.textDecoration = "none";
                      }               
                }                                 
            })
            
            
        })
    }

   
    disable() {  
        if(document.getElementById("taskInput").value === " ") { 
            document.getElementById('addTask').disabled = true; 
        } else { 
            document.getElementById('addTask').disabled = false;
        } 
    }

    addTask() {
        let task = {
            id: Date.now(), 
            taskText: this.htmlTaskInput.value, 
            doneStatus: false, 
        }; 
        this.taskList.push(task); 

        this.htmlTaskInput.value = "";
  
        document.getElementById('addTask').disabled = true; 
        this.htmlTaskList.innerHTML = '';
        localStorage.setItem('todo', JSON.stringify(this.taskList))
        this.renderList()
    }    

    renderList() {
        if (this.taskList.length > 0) {
            this.taskList.forEach(element => {
                let taskElement = document.createElement('li'); 
                taskElement.innerHTML = `
                    <div id=${element.id} >
                        <p> ${element.id} : ${element.taskText} </p> <button>Change Status</button> 
                        <button>delete Task</button>
                    </div>`;
                this.changeStatus(taskElement)  
                let taskDeleteButton = taskElement.getElementsByTagName('button')[1]
            

                taskDeleteButton.addEventListener('click', ($event) => { 
                
                    let listItem = $event.target.parentNode.parentElement;                

                    let taskDescriptionElement = $event.target.parentNode.children[0];                

                    let taskID = Number(taskDescriptionElement.textContent.split(':')[0]);
                
                    for (let i= 0; i < this.taskList.length; i++){
                        if (this.taskList[i].id === taskID){
                           this.taskList.splice(i, 1);
                        }
                    }
                    listItem.remove();        
                
                });

                this.htmlTaskList.appendChild(taskElement);
            })
        }
    }
            
}

const todo = new Todo();
const addTaskButton = document.getElementById('addTask'); 
todo.htmlTaskInput.addEventListener('input', () => todo.disable())
addTaskButton.addEventListener('click', () => todo.addTask())
document.addEventListener('DOMContentLoaded', () => todo.renderList())



