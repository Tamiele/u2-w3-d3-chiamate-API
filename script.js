//● Utilizza Bootstrap 5 per creare una pagina responsive con una sezione centrale a 3 o 4 colonne per riga
// ● Ogni colonna avrà al suo interno un elemento Card di Bootstrap, creata a partire da un singolo libro:
//nella “card image” inserisci la copertina del libro, nel “card body” il suo titolo e il suo prezzo.

//● Sempre nel “card body” inserisci un pulsante “Scarta”. Se premuto, dovrà far scomparire la card dalla pagina.
//● EXTRA: crea una lista che rappresenti il carrello del negozio e inseriscila dove vuoi nella pagina.
//Aggiungi un altro pulsante “Compra ora” vicino a “Scarta” nelle card per aggiungere il libro al carrello.
//Il carrello dovrà persistere nello storage del browser.
//● EXTRA: aggiungi vicino ad ogni libro del carrello un pulsante per rimuoverlo dal carrello

const arrayBooks = [];

const getbooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta del server non è ok");
      }
    })
    .then((books) => {
      books.forEach((book) => {
        arrayBooks.push(book);
      });
      cardBooks();
      buttonRemoveCard();
    })
    .catch((error) => {
      console.log(error);
    });
};
console.log(arrayBooks);

getbooks();

const cardBooks = function () {
  const rowCard = document.getElementById("rowCard");

  arrayBooks.forEach((book) => {
    const newCol = document.createElement("div");

    newCol.classList.add("col", "col-12", "col-md-6", "col-lg-3");
    newCol.innerHTML = `
              <div class="card mt-3 shadow ">
                <img
                  src="${book.img}"
                  height ="500"
                  class="card-img-top w-100   "
                  alt="book"
                />
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text"> Price:
                    ${book.price} $
                  </p>
                  <button class="btn btn-success addCarrello">Aggiungi al Carrello</button>
                  <button class="btn btn-danger scarta">Scarta</button>
                </div>
          `;
    rowCard.appendChild(newCol);
  });
  addButtonCard();
};

const buttonRemoveCard = function () {
  let colonnaCard = document.querySelectorAll(".col");

  let btnScarta = document.querySelectorAll(".scarta");

  btnScarta.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      colonnaCard[index].remove();
    });
  });
};

const addButtonCard = function () {
  let btnAddCarrello = document.querySelectorAll(".addCarrello");

  btnAddCarrello.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Utilizza l'indice corrente (index) per ottenere il titolo della card associata. Usa textContent per ottenere il testo del titolo all'interno dell'elemento HTML
      let colCard = btn.closest(".col");
      let title = colCard.querySelector(".card-title").innerText;
      let price = colCard.querySelector(".card-text").innerText;

      class BooksCart {
        constructor(_title, _price) {
          this.title = _title;
          this.price = _price;
        }
      }

      let book = new BooksCart(title, price);
      saveBookLocalStorage(book);
    });
  });
};

const saveBookLocalStorage = function (newBook) {
  let savedBooksCart = JSON.parse(localStorage.getItem("bookShoop")) || [];
  if (newBook) {
    savedBooksCart.push(newBook);
  }
  localStorage.setItem("bookShoop", JSON.stringify(savedBooksCart));

  const listaCarrello = document.getElementById("lista-carrello");
  listaCarrello.innerHTML = "";
  savedBooksCart.forEach((book) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `<p> ${book.title} - ${book.price} <i class="bi bi-trash3-fill deleteBook"></i> </p>`;
    listaCarrello.appendChild(li);
  });
  let deleteBook = document.querySelectorAll(".deleteBook");
  deleteBook.forEach((cestino) => {
    cestino.addEventListener("click", () => {});
  });
};
saveBookLocalStorage();
