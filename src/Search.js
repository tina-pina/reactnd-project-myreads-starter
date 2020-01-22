import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        query: '',
        allBooks: '',
        filteredBooks: '',
    }

    // updateQuery = (query) => {
    //     this.setState(() => ({
    //         query: query
    //     }))
    // }
    handleQuery(input) {
        // console.log("....", input)
        this.setState({ query: input })
    }

    componentDidMount() {
        // BooksAPI.search()
        //   .then((books) => {
        //     console.log("filtered books", books)
        //     this.setState(() => ({
        //         filteredBooks: books
        //     }))
        //   })
        //const { combinedObj }= this.props.location.state
        //console.log("here now", combinedObj)
    }

    changeToMainPage(ev) {
        // console.log("button clicked", ev)
        this.props.changeToMainPage(ev)
    }




    render() {
        // const { allBooks } = this.props;
        // console.log("all books", allBooks())
        return (
            <div className="search-books">
                <p>query {this.state.query}</p>
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
                    <ol className="books-grid"></ol>
                </div>
          </div>
        )
    }
}

export default Search