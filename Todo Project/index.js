// fitst select all the elements which are required 

let todoinput = document.querySelector("#todo-input")
let todoform = document.querySelector("#todo-form")
let formbtn = document.querySelector("#form-btn")
let cancelbtn = document.querySelector("#cancel-btn")
let taskcount = document.querySelector("#task-count")
let taskcmplete = document.querySelector("#task-complete")
let todolist = document.querySelector("#todo-list")


let isediiid = null

// let todos = [
//     {
//         id: Date.now() + 1,
//         text: "Goto Gym",
//         iscomplete: false
//     },
//     {
//         id: Date.now() + 2,
//         text: "Learn React",
//         iscomplete: false
//     },
//     {
//         id: Date.now() + 3,
//         text: "Make Projects",
//         iscomplete: false
//     },

// ]
let todos = JSON.parse(localStorage.getItem("todos")) || []
console.log(todos);

// now we make the fucntion of render of all the todos whih are make previously



// now add new todos

todoform.addEventListener("submit", (e) => {
    e.preventDefault()
    let textvalue = todoinput.value.trim()
    console.log(textvalue);



    if (textvalue === "") {
        return
    }

    if (isediiid) {
        todos = todos.map((todo) => {
            if (todo.id === Number(isediiid)) {
                return {
                    ...todo,
                    text: textvalue,
                }
            }
            return todo
        }
        )
        localStorage.setItem("todos", JSON.stringify(todos))
    }



    else {
        let newtodo = {
            id: Date.now(),
            text: textvalue,
            iscomplete: false
        }

        console.log(newtodo);
        localStorage.setItem("todos", JSON.stringify(todos))
        todos.push(newtodo)
    }
    canceledit()
    rendertodo()
}
)

function rendertodo() {
    todolist.innerHTML = ""
    todos.forEach((todo) => {
        let li = document.createElement("li");
        li.dataset.id = `${todo.id}`
        li.classList = "flex gap-2 border border-slate-300 p-4  rounded-xl "
        li.innerHTML = `
                <input data-action="toggle" data-id=${todo.id} ${todo.iscomplete ? "checked" : ""} type="checkbox">
                <p  class="flex-1 ${todo.iscomplete ? "line-through text-red-500" : ""}">${todo.text}</p>
                <div class="flex gap-2">
                    <button data-action="edit" >Edit</button>
                    <button data-action="delete" >Delete</button>
                </div>
               `

        todolist.append(li)
    }
    )

    taskcount.textContent = `Tasks : (${todos.length})`
    taskcmplete.textContent = ` Completed : ${todos.filter((todo) => todo.iscomplete).length}`
}

rendertodo()

// now delete fucnion

todolist.addEventListener("click", (e) => {
    let li = e.target.closest("li");
    console.log(li)
    let id = li.dataset.id
    console.log(id);
    let action = e.target.dataset.action
    console.log(action);

    if (action === "delete") {
        console.log("deleting...");
        deletetodo(id)
    }
    if (action === "edit") {
        console.log("editing...");
        edittodo(id)
    }
    if (action === "toggle") {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    iscomplete: !todo.iscomplete
                }
            }
            return todo



        })
        localStorage.setItem("todos", JSON.stringify(todos))
        rendertodo()
    }
}
)

function deletetodo(id) {
    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    }
    )
    localStorage.setItem("todos", JSON.stringify(todos))
    rendertodo()
}



function edittodo(id) {
    isediiid = id;
    let edit = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }
    }
    )
    todoinput.value = edit.text
    formbtn.textContent = "Update"
    formbtn.classList = "px-5 py-2 bg-red-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
    cancelbtn.classList.remove("hidden")
}

function canceledit(params) {
    isediiid = null
    todoinput.value = ""
    formbtn.textContent = "Add"
    formbtn.classList = "px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
    cancelbtn.classList.add("hidden")
}


cancelbtn.addEventListener("click", (e) => {
    canceledit()
}
)