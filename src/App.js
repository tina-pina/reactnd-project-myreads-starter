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
    return BooksAPI.getAll()
      .then((books) => {

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
      .catch(err => {console.log(err.error)})
  }

  updateBooks = (book, shelf) => {
    return BooksAPI.update(book, shelf)
      .then(() => {window.location = '/'})
      .catch(err => {console.log(err.error)})
  }

  handleChangeShelf = (book, newShelf) => {
    this.updateBooks(book, newShelf)
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
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
