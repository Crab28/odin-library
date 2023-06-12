let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getInfo = function() {
    return {
        title: this.title, 
        author: this.author,
        pages: this.pages,
        read: this.read
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const cardContainer = document.getElementById('card-container');

    myLibrary.forEach(book => {
        const bookInfo = book.getInfo();

        cardContainer.appendChild(createBookElement(bookInfo));
    });
}

function createBookElement(bookInfo) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('card');

    const titleEl = document.createElement('h4');
    titleEl.textContent = bookInfo.title;
    const authorEl = document.createElement('h6');
    authorEl.textContent = bookInfo.author;
    const pagesEl = document.createElement('h6');
    pagesEl.textContent = bookInfo.pages;
    const readEl = document.createElement('h6');
    readEl.textContent = bookInfo.read;

    const elementsArray = [titleEl, authorEl, pagesEl, readEl];
    
    elementsArray.forEach(el => {
        newDiv.appendChild(el);
    });

    return newDiv;
}

const theHobbit = new Book('The Hobbit', 'J.K.', '277', 'not read');
const theHobbit2 = new Book('The Hobbit2', 'J.K.2', '477', 'read');
const theHobbit3 = new Book('The Hobbit3', 'J.K.3', '377', 'not read');

addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit3);

displayBooks();