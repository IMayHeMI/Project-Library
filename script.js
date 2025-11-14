const container = document.querySelector('.container');
const form = document.querySelector('form');
const addButton = document.getElementById('addBookButton');
const readButton = document.querySelector('.readButton');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

addButton.addEventListener('click', addBook);

let myLibrary = [];

function Book(title, author, pagesAmount, id, isRead){
    if(!new.target){
        throw new Error("You must use keyword 'new' to create an instant");        
    }
    this.title = title;
    this.author = author;
    this.pagesAmount = pagesAmount;
    this.id = id;
    this.isRead = isRead || false;

    this.info = function info(){
        if(!isRead) {
            return this.title + " by " + this.author + ", " + this.pagesAmount + " pages, not read yet";
        }  
        else if(isRead) {
            return this.title + " by " + this.author + ", " + this.pagesAmount + " pages, already read";
        };      
    };
};

function addBook() {
    const title = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const pagesAmount = document.getElementById('pages').value;
    const isRead = document.getElementById("isRead").checked;
    const id = crypto.randomUUID();

    const newBook = new Book(title, author, pagesAmount, id, isRead);
    myLibrary.push(newBook);

    displayBooks(myLibrary);

    form.reset();
}

function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const displayedBook = document.createElement('div');
        const displayedTitle = document.createElement('div');
        const displayedAuthor = document.createElement('div');
        const displayedPages = document.createElement('div');
        const buttons = document.createElement('div');
        const readState = document.createElement('div');
        const remove = document.createElement('div');

        displayedBook.classList.add('book');
        displayedBook.id = book.id;
        displayedTitle.classList.add('name');
        displayedAuthor.classList.add('author');
        displayedPages.classList.add('pagesAmount');
        buttons.classList.add('buttons');
        readState.classList.add('readButton');
        if (book.isRead) {
            readState.classList.add('isRead');
            readState.textContent = 'Read';
        }
        else {
            readState.classList.add('notRead');
            readState.textContent = 'Not read';
        }
        remove.className = 'removeButton';
        remove.dataset.id = book.id;

        displayedTitle.textContent = book.title;
        displayedAuthor.textContent = book.author;
        displayedPages.textContent = book.pagesAmount;
        remove.textContent = 'Remove book'

        container.appendChild(displayedBook);
        displayedBook.appendChild(displayedTitle);
        displayedBook.appendChild(displayedAuthor);
        displayedBook.appendChild(displayedPages);
        displayedBook.appendChild(buttons);
        buttons.appendChild(readState);
        buttons.appendChild(remove);

        readState.addEventListener('click', () => {
            book.isRead = changeReadButtonState(readState);
        });
        
        remove.addEventListener('click', removeBook);
    });
}

function changeReadButtonState(button){
    let isRead = false;

    if (button.textContent.trim() === 'Read') {
        button.textContent = 'Not read';
        button.style.backgroundColor = 'rgba(116, 109, 108, 1)';
        isRead = false;
    }
    else {
        button.textContent = 'Read';
        button.style.backgroundColor = 'rgb(140, 208, 38)';
        isRead = true;
    }

    return isRead;
}

function removeBook(e){
    const id = e.currentTarget.dataset.id;

    myLibrary = myLibrary.filter(book => book.id !== id);

    displayBooks();
}
