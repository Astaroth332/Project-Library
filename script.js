const library = [];

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.status}.`;
    }
};

function addBookToLibrary(name, author, pages, status) {
    let newBook = new Book(name, author, pages, status);
    library.push(newBook);
}




function displayBook(library) {

    const cardContainer = document.querySelector('.card-container');

    for(const book of library) {
        const div = document.createElement('div');
        div.classList.add('card');

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
  
}

displayBook(library);


