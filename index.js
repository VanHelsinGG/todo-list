const taskTemplate = document.querySelector(".template");
const container = document.querySelector(".container");
var tasks = []

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        tasks.push(...parsedTasks);
    }
    renderTasks();
}

function renderTasks() {

    tasks.forEach(taskData => {
        const newTask = createTaskElement(taskData.conteudo, taskData.completed);
        container.appendChild(newTask);
    });
}

function createTaskElement(content, completed){
    const newTask = document.createElement("div");
    newTask.classList.add("row", "my-2", "task", "p-3"); 

    const checkboxColumn = document.createElement("div");
    checkboxColumn.classList.add("col-1");

    const checkboxInput = document.createElement("input");
    checkboxInput.classList.add("checkbox");
    checkboxInput.type = "checkbox";

    checkboxColumn.appendChild(checkboxInput);
    newTask.appendChild(checkboxColumn);

    const taskColumn = document.createElement("div");
    taskColumn.classList.add("col-10");

    const taskContent = document.createElement("p");
    taskContent.classList.add("tarefa");
    taskContent.textContent = content;

    taskColumn.appendChild(taskContent);
    newTask.appendChild(taskColumn);

    const taskColumn2 = document.createElement("div");
    taskColumn2.classList.add("col-1");

    const taskContent2 = document.createElement("button");
    taskContent2.classList.add("btn", "btn-danger", "delete"); 
    taskContent2.textContent = "x";

    taskColumn2.appendChild(taskContent2); 
    newTask.appendChild(taskColumn2); 

    if (completed) {
        newTask.classList.add("completed");
        checkboxInput.checked = 1
    }

    return newTask;
}

document.getElementById("adicionar-todo-btn").addEventListener("click", function addTodo() {
    const conteudo = document.getElementById("adicionar-todo").value;

    if (!conteudo) {
        alert("A tarefa não pode estar em branco!");
        return; // Saímos da função quando o conteúdo estiver vazio
    }

    const newTask = createTaskElement(conteudo, false);
    container.appendChild(newTask);

    tasks.push({ conteudo, completed: false });
    saveTasks();

    document.getElementById("adicionar-todo").value = ""; // Limpa o campo de entrada
});

container.addEventListener("click", function(event) {
    if (event.target.classList.contains("checkbox")) {
        const checkbox = event.target;
        const task = checkbox.closest(".task");

        const index = Array.from(container.children).indexOf(task)-2;
        tasks[index]["completed"] = !tasks[index]["completed"];

        saveTasks();
        
        task.classList.toggle("completed");
    }

    if(event.target.classList.contains("delete")){
        const task = event.target.closest(".task");

        const index = Array.from(container.children).indexOf(task)-2;
        tasks.splice(index,1);
        
        saveTasks();
        task.remove();
    }
});

loadTasks();
