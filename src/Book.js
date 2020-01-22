import React, { Component } from 'react';

class Book extends Component {
    state = {
        category: '',
        bookTitle: '',
    }

    handleChangeShelf = newShelf => {
        const { book } = this.props
        console.log(book.id, newShelf, "BOOK SHELF RIGHT NOW", book.shelf)
        this.props.handleChangeShelf(book.id, newShelf, book.shelf)
    }


    render() {
        const { book } = this.props
        return (
            <div className='shelf'>
                <li className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(ev) => this.handleChangeShelf(ev.target.value)}>
                            <option value="move">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.authors }</div>
                </li>
            </div>
        )
    }
}

export default Book;