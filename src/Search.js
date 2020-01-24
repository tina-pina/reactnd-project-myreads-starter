import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    state = {
        query: '',
        filteredBooks: [],
        search: false,
        noResults: false,
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
        this.setState({
            query: input,
            search: true,
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getInfo()
            }
            else if(this.state.query.length === 0) {
                this.setState(() => ({
                    filteredBooks: []
                }))
                this.clearQuery()
                window.location.reload(false)
            }
        })
    }

    getInfo = () => {
        let searchTerm = this.state.query

        return BooksAPI.search(searchTerm)
          .then((books) => {
            if(books.error === 'empty query') {
                this.setState(() => ({
                    noResults: true
                }))
                this.clearQuery()
            }
            this.setState(() => ({
                filteredBooks: books
            }))
          })
          .catch(err => {console.log(err.error)})
    }

    changeToMainPage = (ev) => {
        this.props.changeToMainPage(ev)
    }

    handleChangeShelf = (book, newShelf) =>  {
        this.props.handleChangeShelf(book, newShelf)
    }

    render() {
        const { books } = this.props;

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
                    <div>{this.state.filteredBooks.length === 0 && this.state.search === true ? <p>loading...</p>: ''}</div>
                    <p>{this.state.search}</p>
                    <div>{this.state.noResults === true && !this.state.filteredBooks.length ? <p>please try again...</p>: ''}</div>
                    <ol className="books-grid">
                        {this.state.filteredBooks.length > 0? this.state.filteredBooks.map(book => <Book key={book.id} allBooks={books} book={book} handleChangeShelf={this.handleChangeShelf.bind(this)}/>): ''}
                    </ol>
                </div>
          </div>
        )
    }
}

export default Search