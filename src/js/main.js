
let input = document.createElement("input");
let submit = document.createElement("input");
let taskElment = document.querySelector(".tasks");

//creating the input for html
input.type="text";
input.className="input";
///////
submit.type="submit";
submit.className="add";
submit.value="Add Task";

//putting the input in the form article
const articleElement = document.querySelector(".form");
articleElement.appendChild(input);
articleElement.appendChild(submit);


// array for tasks
let arrayOfTasks = [];

//check if there is tasks in local (putting the data in local storage in the array)
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

//trigger function data from local storage
dataFromLocal();


//add task
submit.onclick = function () {
    if (input.value !== ""){
        addTaskToArray(input.value); //add tasks to the array
        input.value = ""; //empty the value
    
    }
}


//delete button
taskElment.addEventListener("click", (e) =>{
    if (e.target.classList.contains("del")) {
        //removing it from local storage
        deleteTaskLocal(e.target.parentElement.getAttribute("data-id"));
        //removing it from the page
        e.target.parentElement.remove();
    }

    
if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
    }
})



 function addTaskToArray(taskText){

    //task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
        
    };
    // push task to array
    arrayOfTasks.push(task);
    //add tasks to html
    addTasksToHtml(arrayOfTasks)
    //add tasks to localstorage 
    addToLocal(arrayOfTasks)

 };

function addTasksToHtml(arrayOfTasks) {
    //empty tasks article
    taskElment.innerHTML = "";

    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
        //create div for tasks
        let article = document.createElement("article");
        article.className="task";
        //check if task is done
        if (task.completed) {
            article.className= "done"   
        }

        article.setAttribute("data-id", task.id);
        article.appendChild(document.createTextNode(task.title))
        //create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"))
        //appened button to main div
        article.appendChild(span)
        //add task article to section container
        taskElment.appendChild(article)

    });
     
    
}
 

//add array to local sotrage
function addToLocal(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))//change it to a string obj
}


//get the data from localstorage 
function dataFromLocal(){
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)     
        addTasksToHtml(tasks)   
    }
}


function deleteTaskLocal(taskId){
    //telling it to delete the id that the button had when it was pressed
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addToLocal(arrayOfTasks)
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addToLocal(arrayOfTasks);
  }