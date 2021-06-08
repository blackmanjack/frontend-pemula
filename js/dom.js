const UNCOMPLETED_LIST_TODO_ID = "incomplete";
const COMPLETED_LIST_TODO_ID = "complete";
const TODO_ITEMID = "itemId"; 

function addBook() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const completedTODOList = document.getElementById(COMPLETED_LIST_TODO_ID);

    const bookTitle = document.getElementById("inputTitle").value;
    const bookAuthor = document.getElementById("inputAuthor").value;
    const bookYear = document.getElementById("inputYear").value;
    const bookComplete = document.getElementById("inputComplete").checked == true;
    const completeBook = makeBook(bookTitle, bookAuthor, bookYear, bookComplete);
    const uncompleteBook = makeBook(bookTitle, bookAuthor, bookYear);


    if(bookComplete){
        const todoObject = composeTodoObject(bookTitle, bookAuthor, bookYear, bookComplete);
        completeBook[TODO_ITEMID] = todoObject.id;
        todos.push(todoObject);
        completedTODOList.append(completeBook);
    } else{
        const todoObject = composeTodoObject(bookTitle, bookAuthor, bookYear);
        uncompleteBook[TODO_ITEMID] = todoObject.id;
        todos.push(todoObject);
        uncompletedTODOList.append(uncompleteBook);
    }
    updateDataToStorage(); 
}

function makeBook(data, bookAuthor, bookYear, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = data;

    const textbookAuthor = document.createElement("p");
    textbookAuthor.innerHTML = `Writer: <span id="author">` + bookAuthor + `</span>`;

    const textbookYear = document.createElement("p");
    textbookYear.innerHTML = `Year: <span id="year">` + bookYear + `</span>`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action")

    const textContainer = document.createElement("div");
    textContainer.classList.add("item")
    textContainer.append(bookTitle, textbookAuthor, textbookYear);

    const container = document.createElement("div");
    container.classList.add("book_item")
    container.append(textContainer, buttonContainer);
    
    if(isCompleted){
        buttonContainer.append(
            belumSelesai(),
            hapus()
        );
    } else {
        buttonContainer.append(
            selesai(),
            hapus()
        );
    }

    return container;
}

function createDeleteButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createFinishedButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.innerHTML = "Finished";
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createNotFinishedButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.innerHTML = "Not Finished";
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function hapus() {   
    return createDeleteButton("red", function(event){
        var r = confirm("This item will be remove. Press OK to continue ");
        if (r == true) {
            removeTask(event.target.parentElement.parentElement);
        } 
    })
}

function selesai() {
    return createFinishedButton("green", function(event){
        addTaskToCompleted(event.target.parentElement.parentElement);
    })
}

function belumSelesai(){
    return createNotFinishedButton("green", function(event){
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    })
}

function addTaskToCompleted(taskElement) {
    const bookTitle = taskElement.querySelector("h3").innerText;
    const bookAuthor = taskElement.querySelector("span#author").innerHTML;
    const bookYear = taskElement.querySelector("span#year").innerHTML;

    const newTodo = makeBook(bookTitle, bookAuthor, bookYear, true);
    
    const book = findTodo(taskElement[TODO_ITEMID]);
    book.isCompleted = true;
    newTodo[TODO_ITEMID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTask(taskElement) {
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const bookTitle = taskElement.querySelector("h3").innerText;
    const bookAuthor = taskElement.querySelector("span#author").innerHTML;
    const bookYear = taskElement.querySelector("span#year").innerHTML;

    const newTodo = makeBook(bookTitle, bookAuthor, bookYear, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function search() {
    let input = document.getElementById('searchTitle').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('book_item');
    
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            event.preventDefault();
            x[i].style.display="none";
        }
        else {
            x[i].style.display="book_item";                
        }
    }
}

