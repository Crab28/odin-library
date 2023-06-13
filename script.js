let myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

Book.prototype.getInfo = function() {
    return {
        title: this.title, 
        author: this.author,
        pages: this.pages,
        read: this.read
    }
}

function createBook(info) {
    const book = new Book(info.title, info.author, info.pages, info.read, myLibrary.length);
    addBookToLibrary(book);
}

function createListeners() {
    const bookCreatorBtn = document.getElementById('book-create-btn');
    bookCreatorBtn.addEventListener('click', () => {
        createBookForm();
    })
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const mainContainerEl = document.getElementById('main-container');

    if (document.getElementById('card-container')) {
        document.getElementById('card-container').remove();
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.id = 'card-container';

    myLibrary.forEach(book => {
        const bookInfo = book.getInfo();

        cardContainer.appendChild(createBookElement(bookInfo));
    });

    mainContainerEl.appendChild(cardContainer);
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

    const readContainer = document.createElement('div');
    readContainer.classList.add('read-container')
    const readEl = document.createElement('h6');
    const readInputEl = document.createElement('input');

    readInputEl.type = 'checkbox';
    bookInfo.read === 'Read' ? readInputEl.checked = true : readInputEl.checked = false;
    readEl.textContent = bookInfo.read;
    readContainer.appendChild(readEl);
    readContainer.appendChild(readInputEl);

    const elementsArray = [titleEl, authorEl, pagesEl, readContainer];
    
    elementsArray.forEach(el => {
        newDiv.appendChild(el);
    });

    return newDiv;
}

function createBookForm() {
    const mainContainer = document.getElementById('main-container');
    const containerEl = document.createElement('div');
    const formEl = document.createElement('form');
    containerEl.id = "creator-container";
    formEl.id = "creator-form";

    const fieldsetEl = createFieldset();
    const formButtons = createFormButtons();

    formEl.appendChild(fieldsetEl);
    formEl.appendChild(formButtons);
    containerEl.appendChild(formEl);
    mainContainer.appendChild(containerEl);
}

function createFieldset() {
    const fieldsetEl = document.createElement('fieldset');

    const legendEl = document.createElement('legend');
    legendEl.textContent = 'Create Book';

    fieldsetEl.appendChild(legendEl);

    const formItemNames = ['title', 'author', 'pages', 'read'];

    formItemNames.forEach((element, index) => {
        const formItemEl = document.createElement('div');
        formItemEl.classList.add('form-item');
        
        const labelEl = document.createElement('label');
        labelEl.textContent = element.toUpperCase();


        const inputEl = document.createElement('input');

        labelEl.htmlFor = element;
        inputEl.id = element;
        inputEl.name = element;
        if (index < 2) {
            inputEl.type = 'text';
        } else if (index === 2) {
            inputEl.type = 'number';
        } else {
            inputEl.type = 'checkbox';
            formItemEl.classList.add('form-item-checkbox');
        }

        formItemEl.appendChild(labelEl);
        formItemEl.appendChild(inputEl);

        fieldsetEl.appendChild(formItemEl);
    });

    return fieldsetEl;
}

function createFormButtons() {
    const containerEl = document.createElement('div');
    containerEl.classList.add('form-buttons');

    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    submitBtn.classList.add('btn');

    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('btn');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const formItemNames = ['title', 'author', 'pages', 'read'];
        let formValues = [];

        formItemNames.forEach(element => {
            if (element !== 'read') {
                const fieldValue = document.getElementById(element).value;
                formValues.push(fieldValue);
            } else {
                const fieldValue = document.getElementById(element).checked;
                formValues.push(fieldValue);
            }
        });

        bookInfo = {
            title: formValues[0],
            author: formValues[1],
            pages: formValues[2],
            read: formValues[3] === true ? 'Read' : 'Not Read'
        }

        createBook(bookInfo);
        displayBooks();

        document.getElementById('creator-container').remove();
    })

    cancelBtn.addEventListener('click', () => {
        document.getElementById('creator-container').remove();
    });

    containerEl.appendChild(submitBtn);
    containerEl.appendChild(cancelBtn);

    return containerEl;
}

const theHobbit = new Book('The Hobbit', 'J.K.', '277', 'Not Read', 0);
const theHobbit2 = new Book('The Hobbit2', 'J.K.2', '477', 'Read', 1);
const theHobbit3 = new Book('The Hobbit3', 'J.K.3', '377', 'Not Read', 2);
const theHobbit4 = new Book('The Hobbit3', 'J.K.3', '377', 'Not Read', 3);

addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit3);
addBookToLibrary(theHobbit4);

createListeners();
displayBooks();
