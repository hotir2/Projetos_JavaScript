// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const eraseButton = document.querySelector("#erase-button");

let oldTodoValue = ""; // Para armazenar o valor anterior da tarefa ao editar

// Função para adicionar uma tarefa
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

// Função para alternar os formulários
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
};

// Evento de submit para adicionar uma tarefa
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
        todoInput.value = "";
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");

    // Concluir tarefa
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    // Remover tarefa
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    // Editar tarefa
    if (targetEl.classList.contains("edit-todo")) {
        const todoTitle = parentEl.querySelector("h3").innerText;
        editInput.value = todoTitle;
        oldTodoValue = todoTitle;
        toggleForms();
    }
});

// Cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
    editInput.value = "";
});

// Evento para salvar a edição
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        const todos = document.querySelectorAll(".todo");

        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3");

            if (todoTitle.innerText === oldTodoValue) {
                todoTitle.innerText = editInputValue;
            }
        });

        toggleForms();
        editInput.value = "";
    }
});

// Função para buscar tarefas com base no termo inserido no campo de busca
const searchTodos = (searchTerm) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        // Verifica se o título da tarefa inclui o termo de busca
        if (todoTitle.includes(searchTerm.toLowerCase())) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

// Evento para disparar a busca quando o usuário digita no campo de busca
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    searchTodos(searchTerm);
});

// Função para filtrar as tarefas com base no valor selecionado no seletor de filtro
const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        switch (filterValue) {
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");
                break;
            case "todo":
                // Mostra apenas tarefas não concluídas (sem a classe "done")
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");
                break;
        }
    });
};

// Evento para aplicar o filtro sempre que o usuário selecionar uma opção no seletor de filtro
filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterTodos(filterValue);
});

// Função para limpar o campo de busca e mostrar todas as tarefas
eraseButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchTodos("");
});
