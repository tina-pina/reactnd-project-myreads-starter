import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    category: '',
    read: [],
    wantToRead: [],
    currentlyReading: [],
    none: [],
    shelfs: ["read", "wantToRead", "currentlyReading"]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log(books)
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

  handleChangeShelf = (bookID, newShelf, currentShelf) => {
    console.log("bookid", bookID, "newShelf", newShelf, "currentshelf", currentShelf)
    let cShelf = this.state[currentShelf]
    let nShelf = this.state[newShelf]


    if(cShelf !== nShelf) {
      let book = this.state.books.filter(book => book.id === bookID)[0]
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

    console.log("------------------------")
    console.log("newShelf: ", newShelf, "currentShelf: ", currentShelf, "newShelves: ", newShelves)
    console.log("------------------------")
    this.setState(newShelves)
    currentShelf = this.state[newShelf].map(book => book.shelf = newShelf)[0]
    console.log("_____________")
    console.log("new current shelf", currentShelf)

    // if(currentShelf !== newShelf) {
    //   let removeFromShelf = currShelf.filter(book => book.id !== bookID)
    //   let removedBook = []
    //   for(let book of currShelf) {
    //     if(book.id === bookID) {
    //       removedBook.push(book)
    //     }
    //   }
    //   let obj  = {}
    //   obj[currentShelf] = removeFromShelf
    //   this.setState(obj)
    //   let obj2 = {}
    //   let temp = [...newS]
    //   for(let book of removedBook) {
    //     temp.push(book)
    //   }
    //   console.log("new S", temp)
    //   obj2[newShelf] = temp
    //   this.setState(obj2)

    // }
  }

  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {
          this.state.shelfs.map(name =>
            <Shelf
              name={name}
              books={this.state[name]}
              handleChangeShelf={this.handleChangeShelf.bind(this)}
            />
          )
        }
        <Search />
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksApp
