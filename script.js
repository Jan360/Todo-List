let addText = document.querySelector('.message') // input
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo') // ul
let todoList = [] // Запись новых значений

if(localStorage.getItem('todo')){ // Если в localStorage есть данные, возвратить его
  todoList = JSON.parse(localStorage.getItem('todo')) // Получаем сохраненный todo JSON и пребразуем обратно в объект
  displayMessages() // Вывести на страницу
}

addButton.addEventListener('click', function(){ // Нажатие на кнопку Добавить создает новый объект, который будет помещаться в todoList
  let newTodo = {
    todo: addText.value, // Значение input
    checked: false
  }
  todoList.push(newTodo) // Внести в todoList объект newTodo
  displayMessages() // Вывести на страницу
  storage() // Запись в localStorage объекта, который пребразуем в JSON; F12 > Application > Local Storage
})

function displayMessages() { // Функция отображения элемента
  let displayMessage = '' // Здесь будут храниться <li></li>, <li></li>
  todoList.forEach(function(item, i){ // Перебираем каждый элемент в todoList и в переменную displayMessage добавлять li input, куда передавать id='item_'индекс' в зависимости от количества элементов
    displayMessage += `
    <li class="li" id="${i}">
      <span class="close">x</span>
      <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
      <label for='item_${i}'>${item.todo}</label>
    </li>
    `; // Добавить li с классом li с чекбоксом; установить связь и добавить текст item.todo при переборе
    todo.innerHTML = displayMessage; // Добавить внутрь ul тег li
    closeBtn(); // Дает возможность закрывать сразу после создания, для этого задается id у li
  })
}
// Сохранение чекбоксов
todo.addEventListener('change', function (event) {
  let checkboxId = event.target.id // <input type="checkbox" id="item_0" checked>
  let index = checkboxId.split('_')[1] // Разделить строку по _; ['item', '0']; 0
  todoList[index].checked = event.target.checked // true, false присваивается в выбранный элемент
  storage()
})
// Кнопка закрытия
function closeBtn() {
  let closes = document.querySelectorAll(".close");
  for (let close of closes) {
    close.addEventListener('click', function() {
      let li = this.closest("li"); // Находим ближайший родительский li у <span class="close">X</span>
      todoList.splice(li.id, 1);
      li.remove();
      storage()
    })
  }
}

function storage(){
  localStorage.setItem('todo', JSON.stringify(todoList))
}