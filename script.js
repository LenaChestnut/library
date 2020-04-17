let myLibrary = [];

addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 311, true);
addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 200, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 215, true);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render() {
    const shelf = document.querySelector(".library");
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = book.title;
        bookCard.appendChild(title);

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;
        bookCard.appendChild(author);

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const state = document.createElement("p");
        state.classList.add("state");
        state.textContent = (book.read) ? "I've read it!" : "Not read";
        cardContainer.appendChild(state);
        const checkmark = document.createElement("div");
        checkmark.innerHTML = '<i class="fas fa-check"></i>';
        cardContainer.appendChild(checkmark);
        const trashcan = document.createElement("div");
        trashcan.innerHTML = '<i class="fas fa-trash"></i>';
        cardContainer.appendChild(trashcan);

        bookCard.appendChild(cardContainer);

        shelf.appendChild(bookCard);
    });
}

render();

const newBookButton = document.querySelector(".new-book");