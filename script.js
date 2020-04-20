let myLibrary = [];

loadStorage();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    if (read === "true" || read === true) {
        this.read = true;
    } else {
        this.read = false;
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

render();

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    updateStorage();
}

function updateStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadStorage() {
    if (localStorage.getItem("library")) {
        myLibrary = JSON.parse(localStorage.getItem("library"));

        for (let i = 0; i < myLibrary.length; i++) {
            myLibrary[i] = new Book(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read);
        }
    } else {
        addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);
        addBookToLibrary("Flowers for Algernon", "Daniel Keyes", 311, true);
        addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 200, true);
        addBookToLibrary("1984", "George Orwell", 328, false);
        addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 215, true);
    }
}

const newBookButton = document.querySelector(".new-book");
const form = document.querySelector(".form-page");
newBookButton.addEventListener("click", () => {
    //show form
    form.classList.remove("hidden");
});

const addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {
    let bookTitle = document.forms["BookForm"]["title"];
    let bookAuthor = document.forms["BookForm"]["author"];
    let bookPages = document.forms["BookForm"]["pages"];
    let bookRead = document.forms["BookForm"]["read"];
    if (validateInput(bookTitle, bookAuthor, bookPages)) {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
        render();
        hideForm();
        clearFields();
    }
});

function hideForm() {
    form.classList.add("hidden");
}

function validateInput(title, author, pages) {
    if (title.value === "") {
        title.focus();
        alert("Please enter the title");
        return false; 
    }
    if (author.value === "") {
        author.focus();
        alert("Please enter name of the author");
        return false; 
    }
    if (pages.value === "" || !/\d/.test(pages.value) || pages.value < 1) {
        pages.focus();
        alert("Please enter the number of pages");
        return false;
    }
    return true;
}

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("click", () => {
    hideForm();
    clearFields();
})

function clearFields() {
    document.forms["BookForm"]["title"].value = "";
    document.forms["BookForm"]["author"].value = "";
    document.forms["BookForm"]["pages"].value = "";
}

function render() {
    const shelf = document.querySelector(".library");
    shelf.innerHTML = '';
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
        state.textContent = (book.read === true) ? "I've read it!" : "Not read";
        cardContainer.appendChild(state);

        createToggleButton(cardContainer, myLibrary.indexOf(book), book.read);

        createDeleteButton(cardContainer, myLibrary.indexOf(book));

        bookCard.appendChild(cardContainer);

        bookCard.setAttribute('id', myLibrary.indexOf(book));

        shelf.appendChild(bookCard);
    });
}

function createDeleteButton(card, cardIndex) {
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("data-index", cardIndex);
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    card.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) => {
        let id = e.target.parentNode.getAttribute('data-index');
        deleteBook(id);
    });
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    render();
    updateStorage();
}

function createToggleButton(card, cardIndex, isRead) {
    const toggleButton = document.createElement("div");
    toggleButton.setAttribute("data-index", cardIndex);
    toggleButton.innerHTML = '<i class="fas fa-check"></i>';
     
    if (isRead) {
        toggleButton.classList.add("read");
    } else {
        toggleButton.classList.remove("read");
    }
    card.appendChild(toggleButton);

    toggleButton.addEventListener("click", (e) => {
        let id = e.target.parentNode.getAttribute('data-index');
        myLibrary[id].toggleRead();
        render();
    });
}