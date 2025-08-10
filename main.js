let items = [];

const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items";
const n = 0;
function createCounter(n) {
    return () => n++;
}

function renderItems() {
    itemsDiv.innerHTML = null; // Очищает содержимое itemsDiv

    for (const [idx, item] of Object.entries(items)) { // it's going to look like this  (0, "item 1") (1, "item 2")
        const container = document.createElement("div") // Создаем контейнер для элемента
        container.style.marginBottom = "10px"

        const text = document.createElement("p") // Создаем параграф
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.textContent = item; // Записываем текст элемента списка

        const button = document.createElement("button") // Создаем кнопку "Delete"
        button.textContent = "Delete"
        button.onclick = () => removeItem(idx) //wrapping the call of this func in another func. We don't call it here

        container.appendChild(text) // Добавляем текст в контейнер
        container.appendChild(button) // Добавляем кнопку в контейнер
        itemsDiv.appendChild(container) // Добавляем контейнер в itemsDiv
    }

    const counter = document.getElementById("counter");
    if (counter) {
        counter.textContent = `Number of elements: ${items.length}`;
    }

}




//local storage (inside your browers, don't store sensetive data)
function loadItems() {
    const oldItems = localStorage.getItem(storageKey) // Получаем данные из localStorage
    if (oldItems) items = JSON.parse(oldItems) // Если данные есть, парсим их в массив
    renderItems() // Отрисовываем список
}

function saveItems() {
    const stringItems = JSON.stringify(items); // Преобразуем массив в строку JSON
    localStorage.setItem(storageKey, stringItems) // Сохраняем в localStorage
}

function addItem() {
    const value = input.value; // Получаем значение из input
    if (!value) {
        alert("You cannot add an empty item")
        return
    }
    items.push(value) // Добавляем в массив
    renderItems() // Перерисовываем список
    input.value = "" // Очищаем input
    saveItems() // Сохраняем список в localStorage
}


function removeItem(idx) {
    items.splice(idx, 1) // Удаляем элемент по индексу
    renderItems() // Обновляем отображение списка
    saveItems() // Сохраняем изменения
}

document.addEventListener("DOMContentLoaded", loadItems) // Когда документ загружается (DOMContentLoaded), вызывается loadItems()

// 1. При загрузке страницы вызывается loadItems(), и список заполняется сохраненными данными.

// 2. Пользователь вводит текст в input и нажимает кнопку (которая должна быть на странице и вызывать addItem()).

// 3. Новый элемент добавляется в items, сохраняется в localStorage и отображается.

// 4. Пользователь может удалить элемент, нажав на кнопку "Delete".

// 5. Удаленный элемент исчезает из items, список обновляется, и изменения сохраняются в localStorage.
