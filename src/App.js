import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import Search from './Search';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    read: [],
    wantToRead: [],
    currentlyReading: [],
    none: [],
    shelfs: ["read", "wantToRead", "currentlyReading"],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log("books", books)
        let currentlyReading = books.filter(book => book.shelf === "currentlyReading").map(book => book)
        let read = books.filter(book => book.shelf === "read").map(book => book)
        let wantToRead = books.filter(book => book.shelf === "wantToRead").map(book => book)

        this.setState(() => ({
          books: books,
          currentlyReading: currentlyReading,
          read: read,
          wantToRead: wantToRead,
        }))
      })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((books) => {
        //console.log("updated books", books)
        let stateShelf = this.state[shelf]
        let newShelves = {}
        newShelves[stateShelf] = [books]
        console.log("new Shelves", newShelves)
        this.setState(newShelves)
      })
  }

  handleChangeShelf = (bookID, newShelf, currentShelf, book) => {
    console.log("bookid in APP", bookID, "newShelf in APP", newShelf, "currentshelf in APP", currentShelf, "whole book obj", book)
    this.updateBooks(book, newShelf)

    let cShelf = this.state[currentShelf]
    if(!cShelf) {
      cShelf = this.state[newShelf]
    }
    let nShelf = this.state[newShelf]

    if(cShelf !== nShelf) {
      let book = this.state.books.filter(book => book.id === bookID)[0]
      book.shelf = newShelf

      //book.shelf = newShelf
      cShelf = cShelf.filter(book => book.id !== bookID)
      if(!nShelf) {
        let none = this.state.none
        none.push(book)
        this.setState({none: none})
      }
      nShelf.push(book)
    }

    let newShelves = {}
    newShelves[currentShelf] = [...cShelf]
    newShelves[newShelf] = [...nShelf]

    this.setState(newShelves)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {
              this.state.shelfs.map(name =>
                <Shelf
                  key={name}
                  name={name}
                  books={this.state[name]}
                  handleChangeShelf={this.handleChangeShelf.bind(this)}
                />
              )
            }
            <Link to='/search' className="open-search">
              <button type="button">Add a book</button>
            </Link>
          </div>
        )} />
        <Route exact path='/search' render={({history}) => (
          <Search
            changeToMainPage={() => {history.push('/'); window.location.reload()}}
            handleChangeShelf={this.handleChangeShelf.bind(this)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
