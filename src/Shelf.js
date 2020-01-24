import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
    state = {
        books : [],
        categoryCurrently: [],
        categoryWantRead: [],
        categoryRead: [],
    }

    handleChangeShelf = (book, newShelf) => {
        this.props.handleChangeShelf(book, newShelf)
    }

    render() {
        const { name, books } = this.props

        return (
            <div className="list-shelves">
                <div className="list-books-content">
                    <h1 className="bookshelf-name">{ name }</h1>
                    <div>
                        <div className="bookshelf">
                            <ol className="list-shelves">{ books.map((book) => <Book key={book.id} book={book} handleChangeShelf={this.handleChangeShelf.bind(this)}/>)}</ol>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

export default Shelf