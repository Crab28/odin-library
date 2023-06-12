let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getInfo = function() {
    return [this.title, this.author, this.pages, this.read];
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach(book => {
        const bookInfo = book.getInfo();
        console.log(bookInfo);
    });
}

const theHobbit = new Book('The Hobbit', 'J.K.', '277', 'not read');

addBookToLibrary(theHobbit);
displayBooks();