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
        cardBooks();
        buttonRemoveCard();
        addButtonCard();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
console.log(arrayBooks);

getbooks();

const cardBooks = function () {
  const rowCard = document.getElementById("rowCard");
  const newCol = document.createElement("div");
  arrayBooks.forEach((book) => {
    newCol.classList.add("col", "col-12", "col-md-6", "col-lg-3");
    newCol.innerHTML = `
              <div class="card mt-3 shadow">
                <img
                  src="${book.img}"
                  height ="500"
                  class="card-img-top w-100  object-fit-cover "
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
const arrayCarrello = [];
const addButtonCard = function () {
  let btnAddCarrello = document.querySelectorAll(".addCarrello");
  let card = document.querySelectorAll(".card");
  console.log(card);

  btnAddCarrello.forEach((btn) => {
    btn.addEventListener("click", () => {
      arrayCarrello.push(card);
    });
  });
};

console.log(arrayCarrello);
