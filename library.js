console.log('This is ES6 version of Project 2');

const cartContent = document.getElementById('cartContent');

// function addToCart(book) {
//     const cartItem = document.createElement('div');
//     cartItem.classList.add('cart-item');
//     cartItem.innerHTML = `
//         <p><strong>Name:</strong> ${book.name}</p>
//         <p><strong>Author:</strong> ${book.author}</p>
//         <p><strong>Type:</strong> ${book.type}</p>
//         <p><strong>Count:</strong> <span class="cart-count">1</span></p>
//     `;
    
//     cartContent.appendChild(cartItem);
// }

// function updateCart(book) {
//     const cartItems = cartContent.getElementsByClassName('cart-item');
//     let found = false;
//     for (const cartItem of cartItems) {
//         const cartName = cartItem.querySelector('p strong:contains("Name")').nextSibling.textContent.trim();
//         if (cartName === book.name) {
//             const countElement = cartItem.querySelector('.cart-count');
//             const count = parseInt(countElement.textContent, 10);
//             countElement.textContent = count + 1;
//             found = true;
//             break;
//         }
//     }
//     if (!found) {
//         addToCart(book);
//     }
// }

const cartItems = new Map();

function toggleCartItem(button) {
    const row = button.closest('tr');
    const bookName = row.querySelector('td:nth-child(1)').textContent.trim();
    const author = row.querySelector('td:nth-child(2)').textContent.trim();
    const type = row.querySelector('td:nth-child(3)').textContent.trim();
    const book = new Book(bookName, author, type);

    if (cartItems.has(bookName)) {
        // Book is already in the cart, remove it
        cartItems.delete(bookName);
    } else {
        // Book is not in the cart, add it
        cartItems.set(bookName, book);
    }

    updateCart();
}

function updateCart() {
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = ''; // Clear the cart content

    cartItems.forEach(book => {
        addToCart(book);
    });
}

function addToCart(book) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <div class="cart-item-details">
            <p><strong>Book Name:</strong> ${book.name}</p>
            <p><strong>Author:</strong> ${book.author}</p>
        </div>
        <div class="cart-item-actions">
            <button class="btn btn-danger" onclick="removeFromCart(this)">Remove</button>
        </div>
        <div style="clear:both;"></div>
        <hr class="cart-item-divider">
    `;

    cartContent.appendChild(cartItem);
}

function removeFromCart(button) {
    const cartItem = button.closest('.cart-item');
    cartContent.removeChild(cartItem);

    // If there are no cart items left, display the "Empty cart" message
    if (cartContent.children.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.classList.add('empty-cart-message');
        emptyCartMessage.textContent = 'Add books to cart for issue...';
        cartContent.appendChild(emptyCartMessage);
    }
}




class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}


const countElement = document.getElementById('count');

const searchInput = document.getElementById('searchTxt');
searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const books = document.querySelectorAll('#tableBody tr');
    
    let count = 0;
    
    books.forEach(book => {
        const bookName = book.querySelector('td:first-child').textContent.toLowerCase();
        const author = book.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const type = book.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        if (bookName.includes(searchQuery) || author.includes(searchQuery) || type.includes(searchQuery)) {
            book.style.display = '';
            count++;
        } else {
            book.style.display = 'none';
        }
    });

    countElement.textContent = `Total books available: ${count}`;
});




class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td>
                                <button class="btn btn-primary add-to-cart" onclick="toggleCartItem(this)">Add to cart</button>
                            </td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
