
// Initial query selectors //
const submitForm = document.querySelector(".submitFormContainer");
const booksContainer = document.querySelector(".bookShelf");
const newButton = document.querySelector(".newBook");
const submitButton = document.querySelector(".submitButton");

// The script hides the submit form by default //
submitForm.className += ", hidden";


// Array that holds the book objects //
let myBooks = [];

// Constructor for the book objects //
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Main function that loops through the books and displays them one by one //
function displayBooks(){

    for (let i = 0; i < myBooks.length; i++){

        // Creating a book div and it's contents //
        let book = document.createElement("div");
        book.classList.add("book");

            let bookTitle = document.createElement("h1");
            bookTitle.textContent = myBooks[i].title;

            let bookAuthor = document.createElement("h3");
            bookAuthor.textContent = "by " + myBooks[i].author;

            let bookPages = document.createElement("p");
            bookPages.textContent = myBooks[i].pages + " pages long";

            // The read status changes based on it's value //
            let bookRead = document.createElement("div");
            bookRead.classList.add("readContainer");
            
            let bookInfo = document.createElement("h4")
            bookInfo.textContent = "Read:"

                let readStatus = document.createElement("span");
                readStatus.classList.add("material-icons");
                readStatus.setAttribute('data-rd', i);

                if (myBooks[i].read){
                    readStatus.textContent = "done";
                    readStatus.classList.add("positive");
                }
                else{
                    readStatus.textContent = "close";
                    readStatus.classList.add("negative");
                }
            
            // The remove button is assigned a data attribute with the current index //
            let removeButton = document.createElement("button");
            removeButton.setAttribute("data-rm", i);
            removeButton.textContent = "Remove";

            bookRead.append(bookInfo, readStatus);

        // The sub-values are appended to the book element, which is then appended onto the container //
        book.append(bookTitle, bookAuthor, bookPages, bookRead, removeButton);
        booksContainer.append(book);
        
    }
}


// The new book button displays the submission form and hides everything else //
newButton.addEventListener('click', newButtonFunction);

function newButtonFunction(){
    submitForm.classList.remove("hidden");

    booksContainer.className += ", hidden";
    newButton.className += ", hidden";
}


// This function helps initialize the myBooks array when the page is opened for the first time //
function initializeLocalStorage(){
    let extractedBooks = JSON.parse(localStorage.getItem('booksLocal'));

    myBooks.push(...extractedBooks);
    console.log(extractedBooks, myBooks);
}

// This function takes and loads the contents of myBooks array into the local storage web API //
function refreshLocalStorage(){
    localStorage.clear();
    localStorage.setItem('booksLocal', JSON.stringify(myBooks));
}

// The submit button constructs a new book with the input values, and adds it to the array and localstorage //
submitButton.addEventListener("click", submitBook);

function submitBook(e){

    let title = document.querySelector("#title");
    title = title.value;

    let author = document.querySelector("#author");
    author = author.value;

    let pages = document.querySelector("#pages");
    pages = pages.value;

    // Checks whether the Read : Yes is checked or not //
    let read;

        let radioButton = document.querySelector("input[type=radio]");
        
        if (radioButton.checked){
            read = true;
        }
        else{
            read = false;
        }

    // Calls upon the constructor with the above info if the input boxes are filled with input //
    if (title != "" && author != "" && pages > 0){
        let submittedBook = new Book(title, author, pages, read);

        myBooks.push(submittedBook);
        refreshLocalStorage();
    }
    else{
        e.preventDefault();
        alert("Please fill in the blanks before submitting your entry!");
    }
}

// This function removes the choosen book from the array and calls for new initialization //
function initializeRemove(){

    let removeButtons = document.querySelectorAll("[data-rm]");
    Array.from(removeButtons).forEach(element => element.addEventListener('click', removeBook));

}

function removeBook(e){

    let currentBook = e.target.dataset.rm;
    myBooks.splice(currentBook, 1);

    refreshLocalStorage();

    location.reload();

}



// Load the books from local storage and display them on the screen, adds event listeners to remove buttons //
function initializeApp(){

    initializeLocalStorage();
    displayBooks();
    initializeRemove();

}

initializeApp();


// Toggle read function //
let toggleButtons;

window.onload = function(){
    toggleButtons = document.querySelectorAll('[data-rd]')

    toggleButtons.forEach(element => {element.addEventListener('click', function(e){
        console.log(e)

        if (this.textContent === "close"){
            myBooks[e.target.dataset.rd].read = true;
        }
        else {
            myBooks[e.target.dataset.rd].read = false; 
        }

        refreshLocalStorage();
        location.reload();
    }
    )});

};
