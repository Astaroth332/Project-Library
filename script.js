class BookLibrary {
    constructor() {
        this.library = [];
    }

    generateID() {
        return Math.floor(Date.now() % (Math.random() * 1000));
    }

    addBookToLibrary(name, author, pages, status) {
        const newBook = new Book(name, author, pages, status, this.generateID());
        this.library.push(newBook);
    }

    updateTotalBookCount() {
        const totalBook = document.querySelector('.total-book div + span');
        totalBook.textContent = this.library.length;
    }

    updateTotalReadAndUnreadCount() {
        const totalRead = document.querySelector('.total-read-book div + span');
        const totalUnread = document.querySelector('.total-unread-book div + span');
        let readCount = 0;
        let unreadCount = 0;

        this.library.forEach(book => {
            if (book.status === "Read") {
                readCount++;
            }   else if(book.status === "Not read") {
                unreadCount++;
            }
        });

        totalRead.textContent = readCount;
        totalUnread.textContent = unreadCount;
    }

    displayBook() {
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = "";
            let index = 0;
        
            for(const book of this.library) {
                const div = document.createElement('div');
                div.classList.add('card');
                div.setAttribute('data-book-index', index); 
                div.dataset.bookIndex = index++;
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
                                <button id="delete";>Delete</button>
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
                        const bookID = this.library[cardIndex].id;
                        this.library = this.library.filter(book => book.id !== bookID);
                        this.updateTotalBookCount();
                        this.updateTotalReadAndUnreadCount();
                        this.displayBook();
                    });
                });

            const readButtons = document.querySelectorAll('.read-button button');
                readButtons.forEach(button => {
                    button.addEventListener('click',()  => {
                        const card = button.closest('.card');
                        const cardIndex = parseInt(card.dataset.bookIndex);
                        const currentBook = this.library[cardIndex];
                        currentBook.toggleReadStatusButton();
                        this.updateTotalReadAndUnreadCount();
                        this.displayBook();
                    });
                });
    }

}

class Book {
    constructor(name,author,pages,status,id) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = id;
    }

    toggleReadStatusButton() {
        this.status = this.status === "Read" ? "Not read" : "Read";
    }
}

let myLibrary = new BookLibrary();

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
    if (inputTitle.value != "" && inputAuthor.value != "" && inputPages.value != "") {
        myLibrary.addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, status);
        myLibrary.updateTotalBookCount();
        myLibrary.updateTotalReadAndUnreadCount();
        myLibrary.displayBook();
    }
    popUpDialog.close();
});