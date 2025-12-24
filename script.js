// DOM要素の取得
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const clearCompletedButton = document.getElementById('clearCompleted');
const todoCount = document.getElementById('todoCount');

// localStorageからデータを読み込む
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 初期化
renderTodos();
updateTodoCount();

// タスクを追加
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        return;
    }
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    updateTodoCount();
    
    todoInput.value = '';
    todoInput.focus();
}

// Enterキーで追加
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

addButton.addEventListener('click', addTodo);

// タスクの完了状態を切り替え
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
    updateTodoCount();
}

// タスクを削除
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateTodoCount();
}

// 完了済みタスクをすべて削除
clearCompletedButton.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
    updateTodoCount();
});

// タスクリストを表示
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'タスクがありません。新しいタスクを追加してください。';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#6c757d';
        emptyMessage.style.padding = '40px 20px';
        todoList.appendChild(emptyMessage);
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
}

// タスク数を更新
function updateTodoCount() {
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    todoCount.textContent = `タスク: ${totalCount} (完了: ${completedCount})`;
}

// localStorageに保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

