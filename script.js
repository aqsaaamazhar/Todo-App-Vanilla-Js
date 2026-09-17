const input = document.getElementById("todoin");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", Addtask);

// Add funtion starts
function Addtask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please Enter Task");
    return;
  }

  // Create A task obj
  const task = {
    text: taskText,
    completed: false,
  };
  tasks.push(task);
  input.value = "";
  saveTask();
  renderTasks();
}
// Functions end

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    const butnDiv = document.createElement("div");
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      saveTask();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTask();
      renderTasks();
    });
    butnDiv.appendChild(doneBtn);
    butnDiv.appendChild(deleteBtn);
    li.appendChild(taskText);
    li.appendChild(butnDiv);
    taskList.appendChild(li);
  });
}
function saveTask() {
  const data = JSON.stringify(tasks);
  localStorage.setItem("tasks", data);
}
