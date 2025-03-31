import React, { useState } from "react";
import Book from "../components/ui/Book";

const Books = ({ books: initialBooks }) => {
  const [books, setBooks] = useState(initialBooks);

  function filterBooks(filter) {
    console.log(filter)
    if (filter === "LOW__TO__HIGH") {
      setBooks(books.slice().sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)))
    }
    if (filter === "HIGH__TO__LOW") {
      setBooks(books.slice().sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)))
    }
    if (filter === "RATING") {
      setBooks(books.slice().sort((a, b) => b.rating - a.rating));
    }
  }
  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="books__header">
                <h2 className="section__title books__header--title">
                  All Books
                </h2>
                <select id="filter" defaultValue="DEFAULT" onChange={(event) => filterBooks(event.target.value)}>
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="LOW__TO__HIGH">Price, low to high</option>
                  <option value="HIGH__TO__LOW">Price, High to low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
              <div className="books">
                {books.map((book) => (
                  <Book book={book} key={book.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
