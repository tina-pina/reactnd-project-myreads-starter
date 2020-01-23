import React, { Component } from 'react';
import Modal from './Modal';

class Book extends Component {
    state = {
        category: '',
        bookTitle: '',
        state: { show: false },
    }

    handleChangeShelf = newShelf => {
        const { book } = this.props
        console.log("autor arr ", book.printType)
        // console.log("bookId: ", book.id, "new shelf: ", newShelf, "current shelf: ", book.shelf)
        // if(!book.shelf) {
        //     book.shelf = 'none'
        // }
        this.props.handleChangeShelf(book.id, newShelf, book.shelf, book)
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    render() {
        const { book } = this.props

        return (
            <div className='shelf'>
                <li className="book">
                    <div className="book-top">
                    { book.imageLinks?
                        (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>): <div>no image available</div>
                    }
                    <div className="book-shelf-changer">
                        <select onChange={(ev) => {
                            this.handleChangeShelf(ev.target.value)}}>
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
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p>{book.description.substring(0,400)}...</p>
                    </Modal>
                    <button class="modal-button" type="button" onClick={this.showModal}>more</button>
                </li>
            </div>
        )
    }
}

export default Book;