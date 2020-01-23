import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    state = {
        query: '',
        filteredBooks: [],
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    handleQuery = (input) => {
        console.log("input", input)
        this.setState({
            query: input
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getInfo()
            }
            this.clearQuery()
        })
    }

    getInfo = () => {
        let searchTerm = this.state.query
        //console.log("term searched", searchTerm)
        BooksAPI.search(searchTerm)
          .then((books) => {
            console.log("filtered books", books)
            this.setState(() => ({
                filteredBooks: books
            }))
          })
    }

    changeToMainPage(ev) {
        this.props.changeToMainPage(ev)
    }

    handleChangeShelf = (bookID, newShelf, bookShelf, book) =>  {
        console.log("finally works")
        console.log(bookID, newShelf, bookShelf=undefined, book)
        this.props.handleChangeShelf(bookID, newShelf, bookShelf=undefined, book)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={(ev) => this.changeToMainPage(ev)}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={(ev) => this.handleQuery(ev.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.filteredBooks.length > 0? this.state.filteredBooks.map(book => <Book key={book.id} book={book} handleChangeShelf={this.handleChangeShelf.bind(this)}/>): ''}
                    </ol>
                </div>
          </div>
        )
    }
}

export default Search