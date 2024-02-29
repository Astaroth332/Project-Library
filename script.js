let library = [];
function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.status}.`;
    }
};

let index = 0;

function addBookToLibrary(name, author, pages, status) {
    let newBook = new Book(name, author, pages, status);
    newBook.index = index;
    library.push(newBook);
    index++;
}

const btnToShowDialog = document.getElementById('show-dialog');
const popUpDialog = document.getElementById('add-book-dialog');
const confirmBtn = popUpDialog.querySelector('#confirm-btn');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputStatus = document.querySelector('#status');

btnToShowDialog.addEventListener('click', () => {
popUpDialog.showModal();
});

popUpDialog.addEventListener('close', () => {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputStatus.checked = false;

});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let status = inputStatus.checked ? "Read" : "Not read yet";
    if (inputTitle.value != "" && inputAuthor.value != "" && inputPages.value != "" && status != "" ) {
        addBookToLibrary(inputTitle.value, inputAuthor.value , inputPages.value, status);
        displayBook();
    }
    popUpDialog.close();
});




function displayBook() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = "";
    for(const book of library) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.bookIndex = book.index;
        div.innerHTML = `
        <div class="book-title">
                    <p>Title:</p>
                    <p>${book.name}</p>
                </div>
                <div class="book-author">
                    <p>Author:</p>
                    <p>${book.author}</p>
                </div>
                <div class="book-pages">
                    <p>Pages:</p>
                    <p>${book.pages}</p>
                </div>
                <div class="book-status">
                    <p>Status:</p>
                    <p>${book.status}</p>
                </div>
                <div class="button">
                    <div class="read-button">
                        <button>Read</button>
                    </div>
                    <div class="delete-button">
                        <button>Delete</button>
                    </div>
                </div>
        `
        cardContainer.appendChild(div);
    }

    const deleteButtons = document.querySelectorAll('.delete-button button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const cardIndex = parseInt(card.dataset.bookIndex);
            library.splice(cardIndex,1);
            displayBook();
        });
    });

    
    const readButtons = document.querySelectorAll('.read-button button');
    readButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const cardIndex = parseInt(card.dataset.bookIndex);
            const book = library[cardIndex];
            book.toggleReadStatus(); // Toggle the read status
            displayBook(); // Update the displayed book list

        });
    });

}

displayBook();


Book.prototype.toggleReadStatus = function() {
    this.status = this.status === "Read" ? "Not read yet" : "Read";
}






