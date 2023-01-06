window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const newTodoForm = document.querySelector('#newTodoForm');

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // ? Inputlardan girdileri.
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
        // ? Inputlardan girdileri.
        // console.log(todo)

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();
        console.log(todos);

        displayTodos();
    });

    // ? Selamlar kısmı için localStorage kısmı oluşturuldu.
    const nameInput = document.querySelector('#name');
    nameInput.addEventListener('change', (e) => {
        // * Inputtan gelen value alınıyor ve localStorage set ediliyor.
        localStorage.setItem('username', e.target.value);
    });
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    // ? Selamlar kısmı için localStorage kısmı oluşturuldu.

    displayTodos();
});

function displayTodos() {
    const todoList = document.querySelector('#todoList');

    todoList.innerHTML = "";


    todos.forEach(todo => {
        //* DOM'a eklenecek elementler tanımlandı ve eklendi.
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem');
        const todoLabel = document.createElement('label');
        const todoInput = document.createElement('input');
        const todoSpan = document.createElement('span');
        const todoContent = document.createElement('div');
        const todoActions = document.createElement('div');
        const todoEdit = document.createElement('button')
        const todoDelete = document.createElement('button');


        todoInput.type = 'checkbox';
        todoInput.checked = todo.done;
        todoSpan.classList.add('bubble');

        if (todo.category == 'Kişisel') {
            todoSpan.classList.add('personal');
        } else {
            todoSpan.classList.add('business')
        }

        todoContent.classList.add('todoContent');
        todoActions.classList.add('actions');
        todoEdit.classList.add('edit');
        todoDelete.classList.add('delete');

        todoContent.innerHTML = `<input type="text" value="${todo.content}" readonly>`
        // ? value=${todo.content} için content değeri yukarıdaki obj geliyor.

        todoEdit.innerHTML = 'Düzenle';
        todoDelete.innerHTML = 'Sil';

        todoLabel.appendChild(todoInput);
        todoLabel.appendChild(todoSpan);

        todoActions.appendChild(todoEdit);
        todoActions.appendChild(todoDelete);

        todoItem.append(todoLabel);
        todoItem.append(todoContent);
        todoItem.append(todoActions);

        todoList.appendChild(todoItem);
        //* DOM'a eklenecek elementler tanımlandı ve eklendi.


        if (todo.done) {
            todoItem.classList.add('done');
        };

        todoInput.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            displayTodos();
        });

        todoEdit.addEventListener('click', (e) => {
            const input = todoContent.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            })
        });

        todoDelete.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
    });



}

