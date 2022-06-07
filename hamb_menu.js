let addMessage = document.querySelector('.message'),
addButton = document.querySelector('.add'), 
todo = document.querySelector('.todo')

let arrayList = [];

if (localStorage.getItem('todo')) {
    arrayList = JSON.parse(localStorage.getItem('todo'));
    displayMassages();
};

addButton.addEventListener('click', function() {
    if (!addMessage.value) return;
    
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    
    arrayList.push(newTodo);
    displayMassages();
    localStorage.setItem('todo', JSON.stringify( arrayList));
    addMessage.value = '';
});

function displayMassages() {
    let displayMassage = '';
    if (arrayList.length === 0) todo.innerHTML = '';
    arrayList.forEach(function(item, i) {
        displayMassage += `
        <li>
            <input type = 'checkbox' id = 'item_${i}' ${item.checked ? 'checked' : ''}>
            <label for = 'item_${i}' class = '${item.important ? 'important' : ''}'>${item.todo}</label>
         </li>`;
        todo.innerHTML = displayMassage;
    });
};

todo.addEventListener('change', function(event) {
    let todocheck = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for ='+ todocheck +']');
    let valueLabel = forLabel.innerHTML;
    
    arrayList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(arrayList));
        }
    })
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();    
    arrayList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.meteKey) {
                arrayList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            
            displayMassages();
            localStorage.setItem('todo', JSON.stringify(arrayList));
        }
    })
});
  