import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);
  
  function addToCart(book) {
    setCart([...cart, {...book, quantity: 1}])
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => 
        item.id === book.id 
          ? {
            ...item,
            quantity: +quantity,
          }
          : item
      )
    );  
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
    console.log('removeItem', item)
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter;
  }

  useEffect (() => {
    console.log(cart)
  }, [cart])


  /* ADDING MULTIPLE QUANTITIES TO CART / ADDING MORE THAN 1 OF THE SAME BOOK TO THE CART */
  // function addToCart(book) {
  //   const dupeItem = cart.find((item) => +item.id === +book.id);

  //   if (dupeItem) {
  //     setCart(
  //       cart.map((item) => {
  //         if (item.id === dupeItem.id) {
  //           return {
  //             ...item,
  //             quantity: item.quantity + 1,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   } else {
  //     setCart([...cart, { ...book, quantity: 1 }]);
  //   }
  // }

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  // function removeFromCart(book) {
  //   setCart(cart.filter((book) => +book.id !== +book));
  // }

  // function updateQuantity(book, quantity) {
  //   setCart(cart.map(item => {
  //     item.id === book.id
  //   }))
  // }  
    // if (quantity <= 0) {
    //   removeFromCart(book);
    //   return;
    // }
  //   setCart(
  //     cart.map((book) => {
  //       if (+book.id === +book) {
  //         return { ...book, quantity: quantity };
  //       }
  //       return book;
  //     })
  //   );
  // }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route 
          path="/books/:id" 
          render={() => <BookInfo books={books} cart={cart} addToCart={addToCart} />} 
        />
        <Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;